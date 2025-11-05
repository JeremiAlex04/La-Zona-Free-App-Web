import { useState, useRef, useEffect } from 'react';

// Crear un audio sintético en lugar de cargar un archivo
const createTetrisAudio = () => {
  // En un proyecto real, aquí cargarías un archivo MP3
  // Por ahora usamos un elemento de audio vacío
  const audio = new Audio();
  audio.loop = true;
  return audio;
};

export const useAudio = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    audioRef.current = createTetrisAudio();
    
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  const play = () => {
    if (audioRef.current && !isPlaying) {
      // Simular la reproducción (en un proyecto real, aquí cargarías el archivo)
      console.log('Música iniciada');
      setIsPlaying(true);
    }
  };

  const pause = () => {
    if (audioRef.current && isPlaying) {
      console.log('Música pausada');
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      const newMutedState = !isMuted;
      audioRef.current.muted = newMutedState;
      setIsMuted(newMutedState);
      console.log(newMutedState ? 'Audio silenciado' : 'Audio activado');
    }
  };

  return {
    isPlaying,
    isMuted,
    play,
    pause,
    toggleMute
  };
};