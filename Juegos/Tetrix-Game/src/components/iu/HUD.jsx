import React from 'react';
import { useGame } from '../../context/GameContext';
import { LEVELS } from '../../utils/constants';
import '../../styles/HUD.css';

const HUD = () => {
  const { state } = useGame();
  const { score, level, lives, gameStarted } = state;

  return (
    <div className="hud">
      <div className="info-box">
        <h3>Puntuación</h3>
        <div className="value">{score}</div>
      </div>
      
      <div className="info-box">
        <h3>Nivel</h3>
        <div className="value">{LEVELS[level]?.name || 'N/A'}</div>
        <div className="sub-value">{level + 1}/5</div>
      </div>
      
      <div className="info-box">
        <h3>Vidas</h3>
        <div className="value">{lives}</div>
      </div>
      
      <div className="level-progress">
        <h3>Progreso</h3>
        <div className="progress-bar">
          {LEVELS.map((lvl, index) => (
            <div 
              key={lvl.level}
              className={`level-indicator ${index <= level ? 'active' : ''} ${index === level ? 'current' : ''}`}
            >
              {lvl.level}
            </div>
          ))}
        </div>
      </div>

      {gameStarted && (
        <div className="game-tips">
          <h4>Controles Rápidos:</h4>
          <p>←→ Mover</p>
          <p>↑ Rotar</p>
          <p>↓ Bajar</p>
          <p>ESPACIO Caída rápida</p>
          <p>P Pausar</p>
        </div>
      )}
    </div>
  );
};

export default HUD;