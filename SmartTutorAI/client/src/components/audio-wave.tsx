import React, { useEffect, useRef } from "react";

interface AudioWaveProps {
  audioData?: Uint8Array | null;
  isPlaying: boolean;
  color?: string;
  height?: number;
  barWidth?: number;
  barGap?: number;
  barCount?: number;
  className?: string;
}

const AudioWave: React.FC<AudioWaveProps> = ({
  audioData,
  isPlaying,
  color = "hsl(var(--primary))",
  height = 40,
  barWidth = 3,
  barGap = 2,
  barCount = 20,
  className
}) => {
  // If we don't have audio data, create static bars for animation
  const staticBars = useRef<number[]>(Array.from({ length: barCount }, () => Math
    .floor(Math.random() * (height - 8)) + 8));

  // Update random static bars periodically when playing without data
  useEffect(() => {
    if (isPlaying && !audioData) {
      const interval = setInterval(() => {
        staticBars.current = Array.from(
          { length: barCount },
          () => Math.floor(Math.random() * (height - 8)) + 8
        );
      }, 100);
      
      return () => clearInterval(interval);
    }
  }, [isPlaying, audioData, barCount, height]);
  
  // Render a static wave visualization
  if (!audioData) {
    return (
      <div 
        className={`audio-wave flex items-center ${className}`} 
        style={{ height: `${height}px` }}
      >
        {staticBars.current.map((height, i) => (
          <div
            key={i}
            className={`bar ${isPlaying ? 'animate-[wave_1s_ease-in-out_infinite]' : ''}`}
            style={{
              width: `${barWidth}px`,
              height: `${isPlaying ? height : 8}px`,
              backgroundColor: color,
              marginRight: `${barGap}px`,
              animationDelay: `${(i % 4) * 0.1}s`
            }}
          />
        ))}
      </div>
    );
  }
  
  // Calculate visualization from audio data
  const normalizedData = Array.from({ length: barCount }, (_, i) => {
    const index = Math.floor(i * (audioData.length / barCount));
    const value = audioData[index] || 0;
    // Map audio data (0-255) to bar height (8-maxHeight)
    return 8 + ((value / 255) * (height - 8));
  });
  
  return (
    <div 
      className={`audio-wave flex items-center ${className}`} 
      style={{ height: `${height}px` }}
    >
      {normalizedData.map((barHeight, i) => (
        <div
          key={i}
          className="bar"
          style={{
            width: `${barWidth}px`,
            height: `${barHeight}px`,
            backgroundColor: color,
            marginRight: `${barGap}px`,
            transition: 'height 0.1s ease-in-out'
          }}
        />
      ))}
    </div>
  );
};

export default AudioWave;
