import { useState, useEffect, useRef } from "react";

interface AudioAnalyserOptions {
  fftSize?: number;
  smoothingTimeConstant?: number;
}

export function useAudioAnalyser(options: AudioAnalyserOptions = {}) {
  const { 
    fftSize = 2048, 
    smoothingTimeConstant = 0.8 
  } = options;
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioData, setAudioData] = useState<Uint8Array | null>(null);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  
  const audioElement = useRef<HTMLAudioElement | null>(null);
  const audioContext = useRef<AudioContext | null>(null);
  const analyser = useRef<AnalyserNode | null>(null);
  const dataArray = useRef<Uint8Array | null>(null);
  const source = useRef<MediaElementAudioSourceNode | null>(null);
  const animationFrameId = useRef<number | null>(null);

  // Setup audio context and analyser
  useEffect(() => {
    return () => {
      // Cleanup on unmount
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
      
      if (audioContext.current) {
        audioContext.current.close();
      }
    };
  }, []);

  // Initialize with audio URL
  const initAudio = (audioUrl: string) => {
    // Cleanup previous audio
    if (animationFrameId.current) {
      cancelAnimationFrame(animationFrameId.current);
    }
    
    if (audioElement.current) {
      audioElement.current.pause();
      audioElement.current.src = '';
    }

    // Create new audio element
    const audio = new Audio(audioUrl);
    audioElement.current = audio;
    
    audio.addEventListener('loadedmetadata', () => {
      setDuration(audio.duration);
    });
    
    audio.addEventListener('timeupdate', () => {
      setCurrentTime(audio.currentTime);
    });
    
    audio.addEventListener('ended', () => {
      setIsPlaying(false);
    });
    
    // Initialize audio context when needed (must be from user interaction)
    if (!audioContext.current) {
      audioContext.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      analyser.current = audioContext.current.createAnalyser();
      analyser.current.fftSize = fftSize;
      analyser.current.smoothingTimeConstant = smoothingTimeConstant;
      
      const bufferLength = analyser.current.frequencyBinCount;
      dataArray.current = new Uint8Array(bufferLength);
    }
  };

  // Play audio function
  const play = () => {
    if (!audioElement.current) return;
    
    // Resume audio context if suspended
    if (audioContext.current?.state === 'suspended') {
      audioContext.current.resume();
    }
    
    // Connect audio to analyser on first play
    if (!source.current && audioContext.current && analyser.current) {
      source.current = audioContext.current.createMediaElementSource(audioElement.current);
      source.current.connect(analyser.current);
      analyser.current.connect(audioContext.current.destination);
    }
    
    // Start visualization
    const updateAudioData = () => {
      if (!analyser.current || !dataArray.current) return;
      
      analyser.current.getByteFrequencyData(dataArray.current);
      setAudioData(new Uint8Array(dataArray.current));
      
      animationFrameId.current = requestAnimationFrame(updateAudioData);
    };
    
    audioElement.current.play().then(() => {
      setIsPlaying(true);
      updateAudioData();
    }).catch(err => {
      console.error("Error playing audio:", err);
    });
  };

  // Pause audio function
  const pause = () => {
    if (!audioElement.current) return;
    
    audioElement.current.pause();
    setIsPlaying(false);
    
    if (animationFrameId.current) {
      cancelAnimationFrame(animationFrameId.current);
      animationFrameId.current = null;
    }
  };

  // Seek to a specific time
  const seek = (time: number) => {
    if (!audioElement.current) return;
    
    audioElement.current.currentTime = time;
    setCurrentTime(time);
  };

  // Format time (seconds) to mm:ss
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  return {
    initAudio,
    play,
    pause,
    seek,
    isPlaying,
    audioData,
    duration,
    currentTime,
    formatTime,
    percentage: duration ? (currentTime / duration) * 100 : 0
  };
}
