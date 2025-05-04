import React, { useState, useEffect } from "react";
import { MicOff, Mic } from "lucide-react";
import { useAudioAnalyser } from "@/hooks/use-audio";
import AudioWave from "@/components/audio-wave";

interface TutorAvatarProps {
  isActive: boolean;
  isPlaying: boolean;
  isSpeaking?: boolean;
  expression?: "neutral" | "smiling" | "thinking" | "listening";
  size?: "sm" | "md" | "lg" | "xl";
  showWaveform?: boolean;
  className?: string;
}

export const avatarColors = {
  primary: "bg-primary text-white",
  secondary: "bg-white text-primary",
  dark: "bg-slate-800 text-white",
  light: "bg-gray-100 text-slate-900"
};

const TutorAvatar: React.FC<TutorAvatarProps> = ({
  isActive,
  isPlaying,
  isSpeaking = false,
  expression = "neutral",
  size = "md",
  showWaveform = true,
  className = "",
}) => {
  const [animState, setAnimState] = useState<string>("idle");
  const audioAnalyser = useAudioAnalyser();
  
  // Size mapping
  const sizeClasses = {
    sm: "w-12 h-12",
    md: "w-20 h-20",
    lg: "w-32 h-32",
    xl: "w-40 h-40"
  };
  
  // Handle animations based on activity and expression
  useEffect(() => {
    if (!isActive) {
      setAnimState("idle");
      return;
    }
    
    if (isSpeaking) {
      setAnimState("speaking");
    } else if (expression === "thinking") {
      setAnimState("thinking");
    } else if (expression === "listening") {
      setAnimState("listening");
    } else {
      setAnimState("idle");
    }
  }, [isActive, isSpeaking, expression]);

  // Render the tutor avatar
  return (
    <div className={`flex flex-col items-center ${className}`}>
      {/* Tutor Avatar Circle */}
      <div className={`${sizeClasses[size]} rounded-full bg-white flex items-center justify-center mb-3 relative overflow-hidden`}>
        {/* Animation effects around avatar */}
        {animState === "speaking" && (
          <div className="absolute inset-0 bg-primary opacity-20 animate-pulse"></div>
        )}
        
        {/* Tutor icon with appropriate expression */}
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          className={`text-primary ${size === "sm" ? "w-6 h-6" : size === "md" ? "w-10 h-10" : "w-16 h-16"} transition-all duration-300`}
        >
          {/* Default tutor icon - modify based on expression */}
          <path d="M12 8V4H8"></path>
          <rect width="16" height="12" x="4" y="8" rx="2"></rect>
          <path d="M2 14h2"></path>
          <path d="M20 14h2"></path>
          {expression === "smiling" ? (
            <>
              <path d="M9 13c.6.6 1.4 1 2 1.1 1.5 0 2.5-1.1 3-2" />
            </>
          ) : expression === "thinking" ? (
            <>
              <path d="M9 15v1" />
              <path d="M12 13v-1" />
              <path d="M15 15v1" />
            </>
          ) : expression === "listening" ? (
            <>
              <path d="M9 14h6" />
            </>
          ) : (
            <>
              <path d="M9 13v2"></path>
              <path d="M15 13v2"></path>
            </>
          )}
        </svg>
        
        {/* Status indicator */}
        <div className={`absolute bottom-1 right-1 w-3 h-3 rounded-full ${isSpeaking ? "bg-green-500" : "bg-gray-300"}`}></div>
      </div>
      
      {/* Audio Waveform under avatar */}
      {showWaveform && (
        <div className="mt-2">
          <AudioWave 
            isPlaying={isPlaying}
            height={20}
            barCount={12}
            barWidth={2}
            barGap={2}
            color="currentColor"
            className="text-primary dark:text-white"
          />
        </div>
      )}
      
      {/* Speaking status badge */}
      {isSpeaking && (
        <div className="mt-2 text-xs flex items-center bg-primary bg-opacity-10 text-primary px-2 py-1 rounded-full">
          <Mic className="h-3 w-3 mr-1" />
          <span>Speaking</span>
        </div>
      )}
    </div>
  );
};

export default TutorAvatar;
