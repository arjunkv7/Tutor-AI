import { useState, useEffect } from "react";

export function useFullscreen() {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const enterFullscreen = () => {
    setIsFullscreen(true);
    
    // Request browser fullscreen if supported
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen().catch(err => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`);
      });
    }
  };

  const exitFullscreen = () => {
    setIsFullscreen(false);
    
    // Exit browser fullscreen if active
    if (document.fullscreenElement && document.exitFullscreen) {
      document.exitFullscreen().catch(err => {
        console.error(`Error attempting to exit fullscreen: ${err.message}`);
      });
    }
  };

  // Listen for escape key to exit fullscreen
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isFullscreen) {
        exitFullscreen();
      }
    };

    // Listen for browser fullscreen change
    const handleFullscreenChange = () => {
      if (!document.fullscreenElement && isFullscreen) {
        setIsFullscreen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("fullscreenchange", handleFullscreenChange);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, [isFullscreen]);

  return { isFullscreen, enterFullscreen, exitFullscreen };
}
