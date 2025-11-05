import React from 'react';
import { useGame } from '../../context/GameContext';
import { useGameLogic } from '../../hooks/useGameLogic';
import { useKeyboard } from '../../hooks/useKeyboard';
import Board from './Board';
import '../../styles/GameArea.css';

const GameArea = () => {
  const { state } = useGame();
  const { gameStarted, gameOver, gameWon, isPaused } = state;
  
  const {
    board,
    currentPiece,
    position,
    startGame,
    moveSideways,
    rotate,
    hardDrop,
    moveDown
  } = useGameLogic();

  useKeyboard((key) => {
    if (!gameStarted || gameOver || gameWon) return;
    
    switch (key) {
      case 'ArrowLeft':
        moveSideways(-1);
        break;
      case 'ArrowRight':
        moveSideways(1);
        break;
      case 'ArrowDown':
        moveDown();
        break;
      case 'ArrowUp':
        rotate();
        break;
      case ' ':
        hardDrop();
        break;
      default:
        break;
    }
  });

  return (
    <div className="game-area">
      <Board 
        board={board} 
        currentPiece={currentPiece}
        position={position}
      />
      
      {!gameStarted && (
        <div className="overlay start-overlay">
          <h2>Bienvenido a Tetrix</h2>
          <p>Completa 5 niveles para ganar</p>
          <button className="start-button" onClick={startGame}>
            Iniciar Juego
          </button>
          <div className="instructions">
            <h3>Controles:</h3>
            <p>← → : Mover pieza</p>
            <p>↑ : Rotar pieza</p>
            <p>↓ : Bajar más rápido</p>
            <p>Espacio : Caída rápida</p>
          </div>
        </div>
      )}
      
      {gameOver && (
        <div className="overlay game-over-overlay">
          <h2>Game Over</h2>
          <p>¡No te rindas! Inténtalo de nuevo.</p>
          <button className="restart-button" onClick={startGame}>
            Reintentar
          </button>
        </div>
      )}
      
      {gameWon && (
        <div className="overlay win-overlay">
          <h2>¡Felicidades!</h2>
          <p>Has completado todos los niveles</p>
          <button className="restart-button" onClick={startGame}>
            Jugar de nuevo
          </button>
        </div>
      )}
      
      {isPaused && gameStarted && !gameOver && !gameWon && (
        <div className="overlay pause-overlay">
          <h2>Juego en Pausa</h2>
          <p>Presiona P para continuar</p>
        </div>
      )}
    </div>
  );
};

export default GameArea;