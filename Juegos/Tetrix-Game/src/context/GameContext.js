import React, { createContext, useContext, useReducer } from 'react';

const GameContext = createContext();

const gameReducer = (state, action) => {
  switch (action.type) {
    case 'SET_SCORE':
      return { ...state, score: action.payload };
    case 'SET_LEVEL':
      return { ...state, level: action.payload };
    case 'SET_LIVES':
      return { ...state, lives: action.payload };
    case 'SET_GAME_OVER':
      return { ...state, gameOver: action.payload };
    case 'SET_GAME_WON':
      return { ...state, gameWon: action.payload };
    case 'SET_GAME_STARTED':
      return { ...state, gameStarted: action.payload };
    case 'SET_PAUSED':
      return { ...state, isPaused: action.payload };
    case 'SET_MUTED':
      return { ...state, isMuted: action.payload };
    case 'RESET_GAME':
      return {
        score: 0,
        level: 0,
        lives: 3,
        gameOver: false,
        gameWon: false,
        gameStarted: false,
        isPaused: false,
        isMuted: false
      };
    default:
      return state;
  }
};

const initialState = {
  score: 0,
  level: 0,
  lives: 3,
  gameOver: false,
  gameWon: false,
  gameStarted: false,
  isPaused: false,
  isMuted: false
};

export const GameProvider = ({ children }) => {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  return (
    <GameContext.Provider value={{ state, dispatch }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};