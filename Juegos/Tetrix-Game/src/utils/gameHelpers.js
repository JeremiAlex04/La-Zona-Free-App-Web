import { BOARD_WIDTH, BOARD_HEIGHT, EMPTY_CELL } from './constants';

export const createBoard = () => 
  Array.from(Array(BOARD_HEIGHT), () => 
    Array(BOARD_WIDTH).fill(EMPTY_CELL)
  );

export const checkCollision = (piece, board, { x, y }) => {
  for (let row = 0; row < piece.shape.length; row++) {
    for (let col = 0; col < piece.shape[row].length; col++) {
      if (piece.shape[row][col] !== EMPTY_CELL) {
        const newX = x + col;
        const newY = y + row;
        
        if (
          newX < 0 || 
          newX >= BOARD_WIDTH || 
          newY >= BOARD_HEIGHT ||
          (newY >= 0 && board[newY][newX] !== EMPTY_CELL)
        ) {
          return true;
        }
      }
    }
  }
  return false;
};

export const rotatePiece = (piece) => {
  const rotated = [];
  const shape = piece.shape;
  
  for (let i = 0; i < shape[0].length; i++) {
    const row = [];
    for (let j = shape.length - 1; j >= 0; j--) {
      row.push(shape[j][i]);
    }
    rotated.push(row);
  }
  
  return {
    ...piece,
    shape: rotated
  };
};

export const checkLines = (board) => {
  let linesCleared = 0;
  const newBoard = JSON.parse(JSON.stringify(board));
  
  for (let row = BOARD_HEIGHT - 1; row >= 0; row--) {
    if (newBoard[row].every(cell => cell !== EMPTY_CELL)) {
      newBoard.splice(row, 1);
      newBoard.unshift(Array(BOARD_WIDTH).fill(EMPTY_CELL));
      linesCleared++;
      row++;
    }
  }
  
  return { newBoard, linesCleared };
};