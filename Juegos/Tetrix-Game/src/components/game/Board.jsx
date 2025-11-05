import React from 'react';
import { BOARD_WIDTH, BOARD_HEIGHT } from '../../utils/constants';
import '../../styles/Board.css';

const Board = ({ board, currentPiece, position }) => {
  const renderBoard = () => {
    const displayBoard = JSON.parse(JSON.stringify(board));
    
    if (currentPiece) {
      for (let row = 0; row < currentPiece.shape.length; row++) {
        for (let col = 0; col < currentPiece.shape[row].length; col++) {
          if (currentPiece.shape[row][col] !== 0) {
            const boardY = position.y + row;
            const boardX = position.x + col;
            
            if (boardY >= 0 && boardY < BOARD_HEIGHT && boardX >= 0 && boardX < BOARD_WIDTH) {
              displayBoard[boardY][boardX] = currentPiece.color;
            }
          }
        }
      }
    }
    
    return displayBoard.map((row, rowIndex) => 
      row.map((cell, cellIndex) => (
        <div 
          key={`${rowIndex}-${cellIndex}`}
          className={`cell ${cell === 0 ? 'empty' : 'filled'}`}
          style={{ 
            backgroundColor: cell === 0 ? 'transparent' : `rgb(${cell})`,
            border: cell === 0 ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(255,255,255,0.3)'
          }}
        />
      ))
    );
  };

  return (
    <div 
      className="board"
      style={{
        gridTemplateRows: `repeat(${BOARD_HEIGHT}, 1fr)`,
        gridTemplateColumns: `repeat(${BOARD_WIDTH}, 1fr)`
      }}
    >
      {renderBoard()}
    </div>
  );
};

export default Board;