import React from 'react';
import { useGame } from '../../context/GameContext';
import '../../styles/Modal.css';

const Modal = () => {
  const { state } = useGame();
  const { gameOver, gameWon } = state;

  if (!gameOver && !gameWon) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        {gameWon ? (
          <>
            <h2>¡Victoria!</h2>
            <p>Has completado todos los niveles del Tetrix</p>
            <div className="celebration">🎉🎊</div>
          </>
        ) : (
          <>
            <h2>Game Over</h2>
            <p>Mejor suerte la próxima vez</p>
          </>
        )}
      </div>
    </div>
  );
};

export default Modal;