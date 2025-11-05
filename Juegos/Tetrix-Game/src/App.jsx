import React from 'react';
import { GameProvider } from './context/GameContext';
import Header from './components/layout/Header';
import GameArea from './components/game/GameArea';
import HUD from './components/ui/HUD';
import Controls from './components/ui/Controls';
import Modal from './components/ui/Modal';
import './styles/App.css';

const Tetrix = () => {
  return (
    <GameProvider>
      <div className="tetrix">
        <Header />
        <div className="game-container">
          <div className="game-content">
            <HUD />
            <GameArea />
          </div>
          <Controls />
        </div>
        <Modal />
      </div>
    </GameProvider>
  );
};

export default Tetrix;