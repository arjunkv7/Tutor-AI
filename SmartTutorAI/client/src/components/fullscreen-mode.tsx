import { useState, useEffect } from "react";
import { X, MoveUp, Subtitles, Settings, StepBack, StepForward, Pause, Play, BookmarkIcon, Mic, HelpCircle, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import AudioWave from "@/components/audio-wave";
import { useAudioAnalyser } from "@/hooks/use-audio";
import { Message } from "@/hooks/use-session";
import TutorAvatar from "@/components/tutor-avatar";
import RaiseHandButton from "@/components/raise-hand-button";
import TeachingSlide from "@/components/teaching-slide";

interface FullscreenModeProps {
  isActive: boolean;
  onExit: () => void;
  subject?: string;
  topic?: string;
  currentMessage?: Message | null;
  onPlayPause: () => void;
  onNext: () => void;
  onPrevious: () => void;
  onAskQuestion: (question?: string) => void;
  isPlaying: boolean;
  progress: number;
  duration: number;
  currentTime: number;
  tutorExpression?: "neutral" | "smiling" | "thinking" | "listening";
  // These new fields support the teaching slides feature
  slides?: Array<{
    title: string;
    content: string;
    imageUrl?: string | null;
  }>;
  currentSlideIndex?: number;
}

const FullscreenMode: React.FC<FullscreenModeProps> = ({
  isActive,
  onExit,
  subject = "Chemistry",
  topic = "Solutions",
  currentMessage,
  onPlayPause,
  onNext,
  onPrevious,
  onAskQuestion,
  isPlaying,
  progress = 45,
  duration = 1710, // 28:30 in seconds
  currentTime = 765, // 12:45 in seconds
  tutorExpression = "neutral",
  slides = [],
  currentSlideIndex = 0
}) => {
  const [visibilityTimeout, setVisibilityTimeout] = useState<NodeJS.Timeout | null>(null);
  const [controlsVisible, setControlsVisible] = useState(true);
  const audioAnalyser = useAudioAnalyser();

  // Format time (seconds) to mm:ss
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Show controls temporarily when user moves
  const showControls = () => {
    setControlsVisible(true);
    
    if (visibilityTimeout) {
      clearTimeout(visibilityTimeout);
    }
    
    setVisibilityTimeout(
      setTimeout(() => setControlsVisible(false), 3000)
    );
  };

  // Set up mouse movement detection
  useEffect(() => {
    if (isActive) {
      window.addEventListener('mousemove', showControls);
      showControls(); // Show controls initially
      
      return () => {
        window.removeEventListener('mousemove', showControls);
        if (visibilityTimeout) {
          clearTimeout(visibilityTimeout);
        }
      };
    }
  }, [isActive]);

  if (!isActive) {
    return null;
  }

  return (
    <div 
      className="fixed inset-0 bg-indigo-900 bg-opacity-95 z-50 flex flex-col items-center justify-center transition-opacity duration-300"
      onMouseMove={showControls}
    >
      {/* Top Controls */}
      <div className={`absolute top-0 left-0 right-0 flex justify-between items-center p-4 transition-opacity duration-300 ${controlsVisible ? 'opacity-100' : 'opacity-0'}`}>
        <div className="flex items-center">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onExit} 
            className="text-white hover:text-indigo-200 hover:bg-indigo-800 rounded-full"
          >
            <X className="h-6 w-6" />
          </Button>
          <div className="ml-4 text-white">
            <h2 className="font-semibold">{subject} - {topic}</h2>
            <p className="text-sm text-indigo-200">Colligative Properties</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-white hover:text-indigo-200 hover:bg-indigo-800 rounded-full"
          >
            <MoveUp className="h-5 w-5" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-white hover:text-indigo-200 hover:bg-indigo-800 rounded-full"
          >
            <Subtitles className="h-5 w-5" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-white hover:text-indigo-200 hover:bg-indigo-800 rounded-full"
          >
            <Settings className="h-5 w-5" />
          </Button>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="max-w-4xl w-full p-8 flex flex-col items-center">
        {/* AI Tutor Avatar */}
        <TutorAvatar 
          isActive={isActive}
          isPlaying={isPlaying}
          isSpeaking={isPlaying}
          expression={tutorExpression}
          size="lg"
          showWaveform={true}
          className="mb-6"
        />
        
        {/* Current Speech Text */}
        <div className="bg-white bg-opacity-10 rounded-lg p-6 mb-8 max-w-3xl">
          <p className="text-white text-xl leading-relaxed">
            {currentMessage?.content || 
              `"The depression of freezing point is directly proportional to the molality of the solution. This means that the more solute particles you add, the lower the freezing point becomes. This property is used in everyday applications like adding salt to ice to lower its freezing point, which is useful in making ice cream or de-icing roads in winter."`
            }
          </p>
        </div>
        
        {/* Teaching Slides */}
        <TeachingSlide
          title={slides[currentSlideIndex]?.title || "Introduction to Solutions"}
          content={slides[currentSlideIndex]?.content || "A solution is a homogeneous mixture of two or more substances. The substance present in the largest amount is called the _solvent_, while the substance present in a smaller amount is called the _solute_. Solutions can be solid, liquid, or gas.\n\nCommon examples include:\n- Salt dissolved in water\n- Air (mixture of gases)\n- Brass (solid solution of copper and zinc)"}
          imageUrl={slides[currentSlideIndex]?.imageUrl || "https://images.unsplash.com/photo-1603126857599-f6e157fa2fe6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"}
          slideNumber={currentSlideIndex + 1}
          totalSlides={slides.length || 3}
          onNext={onNext}
          onPrevious={onPrevious}
          className="w-full max-w-3xl mb-8"
        />
      </div>
      
      {/* Bottom Controls */}
      <div className={`absolute bottom-0 left-0 right-0 p-6 flex justify-center transition-opacity duration-300 ${controlsVisible ? 'opacity-100' : 'opacity-0'}`}>
        <div className="bg-white bg-opacity-10 rounded-full p-2 flex items-center">
          <Button
            variant="default"
            size="icon"
            onClick={onPrevious}
            className="w-12 h-12 rounded-full bg-white text-primary hover:bg-indigo-100 mx-2"
          >
            <StepBack className="h-5 w-5" />
          </Button>
          
          <Button
            variant="default"
            size="icon"
            onClick={onPlayPause}
            className="w-16 h-16 rounded-full bg-white text-primary hover:bg-indigo-100 mx-2"
          >
            {isPlaying ? (
              <Pause className="h-6 w-6" />
            ) : (
              <Play className="h-6 w-6" />
            )}
          </Button>
          
          <Button
            variant="default"
            size="icon"
            onClick={onNext}
            className="w-12 h-12 rounded-full bg-white text-primary hover:bg-indigo-100 mx-2"
          >
            <StepForward className="h-5 w-5" />
          </Button>
        </div>
      </div>
      
      {/* Progress Indicator */}
      <div className={`absolute bottom-24 left-0 right-0 flex justify-center transition-opacity duration-300 ${controlsVisible ? 'opacity-100' : 'opacity-0'}`}>
        <div className="flex items-center">
          <span className="text-white mr-3">{formatTime(currentTime)}</span>
          <div className="w-64 h-1 bg-white bg-opacity-30 rounded-full">
            <div 
              className="h-1 bg-white rounded-full" 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <span className="text-white ml-3">{formatTime(duration)}</span>
        </div>
      </div>
      
      {/* Quick Actions */}
      <div className={`absolute bottom-28 right-6 transition-opacity duration-300 ${controlsVisible ? 'opacity-100' : 'opacity-0'}`}>
        <div className="flex flex-col space-y-3">
          <RaiseHandButton 
            onAskQuestion={onAskQuestion}
            isFullscreen={true}
          />
          <Button
            variant="ghost"
            size="icon"
            className="w-12 h-12 rounded-full bg-white bg-opacity-10 text-white hover:bg-opacity-20"
          >
            <Mic className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="w-12 h-12 rounded-full bg-white bg-opacity-10 text-white hover:bg-opacity-20"
          >
            <BookmarkIcon className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FullscreenMode;
