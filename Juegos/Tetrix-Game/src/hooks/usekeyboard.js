import { useEffect } from 'react';

export const useKeyboard = (onKeyPress) => {
  useEffect(() => {
    const handleKeyDown = (event) => {
      onKeyPress(event.key);
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onKeyPress]);
};