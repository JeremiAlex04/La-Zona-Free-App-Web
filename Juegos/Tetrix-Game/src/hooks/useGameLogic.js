import { useState, useCallback, useEffect, useRef } from 'react';
import { useGame } from '../context/GameContext';
import { createBoard, checkCollision, rotatePiece, checkLines } from '../utils/gameHelpers';
import { randomTetromino } from '../utils/tetrominos';
import { LEVELS, SCORE_VALUES } from '../utils/constants';
import { audioManager } from '../utils/audioManager';

export const useGameLogic = () => {
  const { state, dispatch } = useGame();
  const { level, lives, gameOver, gameWon, gameStarted, isPaused } = state;
  
  const [board, setBoard] = useState(createBoard());
  const [currentPiece, setCurrentPiece] = useState(null);
  const [nextPiece, setNextPiece] = useState(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  
  const gameLoopRef = useRef();

  // Inicializar el audio manager
  useEffect(() => {
    audioManager.init();
  }, []);

  const startGame = useCallback(() => {
    const newBoard = createBoard();
    const firstPiece = randomTetromino();
    const secondPiece = randomTetromino();
    
    setBoard(newBoard);
    setCurrentPiece(firstPiece);
    setNextPiece(secondPiece);
    setPosition({ x: Math.floor(4), y: 0 });
    
    dispatch({ type: 'RESET_GAME' });
    dispatch({ type: 'SET_GAME_STARTED', payload: true });
    
    // Efecto de sonido al iniciar
    audioManager.playBeep(523, 0.2);
  }, [dispatch]);

  const move = useCallback((x, y) => {
    if (!currentPiece || isPaused || gameOver || gameWon || !gameStarted) return false;
    
    if (checkCollision(currentPiece, board, { x: position.x + x, y: position.y + y })) {
      if (y > 0) {
        placePiece();
      }
      return false;
    }
    
    setPosition(prev => ({ x: prev.x + x, y: prev.y + y }));
    
    // Efecto de sonido al mover
    if (x !== 0 || y !== 0) {
      audioManager.playBeep(220, 0.05);
    }
    
    return true;
  }, [currentPiece, board, position, isPaused, gameOver, gameWon, gameStarted, placePiece]);

  const placePiece = useCallback(() => {
    if (!currentPiece) return;

    const newBoard = JSON.parse(JSON.stringify(board));
    let piecePlaced = false;

    for (let row = 0; row < currentPiece.shape.length; row++) {
      for (let col = 0; col < currentPiece.shape[row].length; col++) {
        if (currentPiece.shape[row][col] !== 0) {
          const boardY = position.y + row;
          const boardX = position.x + col;
          
          if (boardY < 0) {
            handleLifeLost();
            return;
          }
          
          newBoard[boardY][boardX] = currentPiece.color;
          piecePlaced = true;
        }
      }
    }

    if (piecePlaced) {
      setBoard(newBoard);
      audioManager.playBeep(349, 0.1); // Sonido al colocar pieza
      
      const { newBoard: clearedBoard, linesCleared } = checkLines(newBoard);
      if (linesCleared > 0) {
        setBoard(clearedBoard);
        const points = [SCORE_VALUES.SINGLE, SCORE_VALUES.DOUBLE, SCORE_VALUES.TRIPLE, SCORE_VALUES.TETRIS][linesCleared - 1] * (level + 1);
        dispatch({ type: 'SET_SCORE', payload: state.score + points });
        
        // Efecto de sonido al limpiar líneas
        audioManager.playBeep(523 * (linesCleared + 1), 0.3);
        
        if (state.score + points >= (level + 1) * 1000 && level < LEVELS.length - 1) {
          dispatch({ type: 'SET_LEVEL', payload: level + 1 });
          audioManager.playBeep(659, 0.5); // Sonido al subir de nivel
        }
        
        if (level === LEVELS.length - 1 && state.score + points >= LEVELS.length * 1000) {
          dispatch({ type: 'SET_GAME_WON', payload: true });
          audioManager.playBeep(880, 1.0); // Sonido de victoria
        }
      }
      
      setCurrentPiece(nextPiece);
      setNextPiece(randomTetromino());
      setPosition({ x: Math.floor(4), y: 0 });
      
      if (checkCollision(nextPiece, clearedBoard, { x: Math.floor(4), y: 0 })) {
        handleLifeLost();
      }
    }
  }, [currentPiece, board, position, nextPiece, level, state.score, dispatch, handleLifeLost]);

  const handleLifeLost = useCallback(() => {
    if (lives > 1) {
      dispatch({ type: 'SET_LIVES', payload: lives - 1 });
      setCurrentPiece(nextPiece || randomTetromino());
      setNextPiece(randomTetromino());
      setPosition({ x: Math.floor(4), y: 0 });
      audioManager.playBeep(110, 0.5); // Sonido de perder vida
    } else {
      dispatch({ type: 'SET_GAME_OVER', payload: true });
      audioManager.playBeep(73, 1.0); // Sonido de game over
    }
  }, [lives, nextPiece, dispatch]);

  const rotate = useCallback(() => {
    if (!currentPiece || isPaused || gameOver || gameWon || !gameStarted) return;
    
    const rotated = rotatePiece(currentPiece);
    if (!checkCollision(rotated, board, position)) {
      setCurrentPiece(rotated);
      audioManager.playBeep(330, 0.1); // Sonido al rotar
    }
  }, [currentPiece, board, position, isPaused, gameOver, gameWon, gameStarted]);

  const moveDown = useCallback(() => {
    move(0, 1);
  }, [move]);

  const moveSideways = useCallback((direction) => {
    move(direction, 0);
  }, [move]);

  const hardDrop = useCallback(() => {
    if (!currentPiece || isPaused || gameOver || gameWon || !gameStarted) return;
    
    while (move(0, 1)) {
      // Continue dropping the piece until it hits the bottom
    }
    audioManager.playBeep(440, 0.2); // Sonido de caída rápida
  }, [move, currentPiece, isPaused, gameOver, gameWon, gameStarted]);

  useEffect(() => {
    if (gameStarted && !gameOver && !gameWon && !isPaused) {
      gameLoopRef.current = setInterval(moveDown, LEVELS[level].speed);
    } else {
      clearInterval(gameLoopRef.current);
    }
    
    return () => {
      clearInterval(gameLoopRef.current);
    };
  }, [gameStarted, gameOver, gameWon, isPaused, level, moveDown]);

  return {
    board,
    currentPiece,
    nextPiece,
    position,
    startGame,
    moveSideways,
    rotate,
    hardDrop,
    moveDown
  };
};