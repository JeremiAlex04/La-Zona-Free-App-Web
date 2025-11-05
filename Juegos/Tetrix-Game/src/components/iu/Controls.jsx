import React from 'react';
import { useGame } from '../../context/GameContext';
import { useAudio } from '../../hooks/useAudio';
import '../../styles/Controls.css';

const Controls = () => {
  const { state, dispatch } = useGame();
  const { isPaused, isMuted, gameStarted } = state;
  
  const audio = useAudio();

  const handlePause = () => {
    if (!gameStarted) return;
    
    const newPausedState = !isPaused;
    dispatch({ type: 'SET_PAUSED', payload: newPausedState });
    
    if (newPausedState) {
      audio.pause();
    } else {
      audio.play();
    }
  };

  const handleMute = () => {
    audio.toggleMute();
    dispatch({ type: 'SET_MUTED', payload: !isMuted });
  };

  const handleRestart = () => {
    dispatch({ type: 'RESET_GAME' });
    audio.pause();
  };

  React.useEffect(() => {
    if (gameStarted && !isPaused) {
      audio.play();
    }
  }, [gameStarted, isPaused, audio]);

  return (
    <div className="controls">
      <button 
        onClick={handlePause} 
        disabled={!gameStarted}
        className="control-button"
      >
        {isPaused ? '▶️ Reanudar' : '⏸️ Pausar'}
      </button>
      
      <button 
        onClick={handleMute}
        className="control-button"
      >
        {isMuted ? '🔇 Sonido' : '🔊 Sonido'}
      </button>
      
      <button 
        onClick={handleRestart}
        className="control-button restart"
      >
        🔄 Reiniciar
      </button>
      
      <div className="mobile-controls">
        <h4>Controles Móviles:</h4>
        <div className="mobile-buttons">
          <button className="mobile-btn">←</button>
          <button className="mobile-btn">→</button>
          <button className="mobile-btn">↑</button>
          <button className="mobile-btn">↓</button>
          <button className="mobile-btn">⏬</button>
        </div>
      </div>
    </div>
  );
};

export default Controls;