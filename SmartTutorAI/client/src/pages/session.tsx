import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { subjects, topics } from "@shared/schema";
import { useRoute, useLocation } from "wouter";
import { 
  Menu, 
  Book, 
  Bookmark, 
  HelpCircle, 
  Maximize, 
  X, 
  Clock, 
  ChevronRight, 
  ChevronDown 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

import Sidebar from "@/components/sidebar";
import ChatInterface from "@/components/chat-interface";
import NotesPanel from "@/components/notes-panel";
import FullscreenMode from "@/components/fullscreen-mode";
import MonitoringOverlay from "@/components/monitoring-overlay";
import RaiseHandButton from "@/components/raise-hand-button";
import SessionSummary from "@/components/session-summary";
import { useSession, Message, SessionData } from "@/hooks/use-session";
import { useFullscreen } from "@/hooks/use-fullscreen";

interface SessionProps {
  demo?: boolean;
}

const Session = ({ demo = false }: SessionProps) => {
  const [match, params] = useRoute("/session/:id");
  const sessionId = params && !demo ? parseInt(params.id) : 1;
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [showNotes, setShowNotes] = useState(true);
  const [showMonitoring, setShowMonitoring] = useState(false);
  const { isFullscreen, enterFullscreen, exitFullscreen } = useFullscreen();
  const { toast } = useToast();
  
  const { 
    session, 
    messages, 
    setMessages, 
    isLoading, 
    sendMessage, 
    isPending, 
    playAudio, 
    pauseAudio, 
    isAudioPlaying, 
    activeAudioId, 
    updateSession 
  } = useSession(sessionId);
  
  // Fetch subject and topic details
  const { data: subject } = useQuery<typeof subjects.$inferSelect>({
    queryKey: [`/api/subjects/${session?.subjectId}`],
    enabled: !!session?.subjectId,
  });
  
  const { data: topic } = useQuery<typeof topics.$inferSelect>({
    queryKey: [`/api/topics/${session?.topicId}`],
    enabled: !!session?.topicId,
  });
  
  // Simulate audio playback progress
  const [playbackProgress, setPlaybackProgress] = useState(45);
  const [playbackDuration] = useState(1710); // 28:30 in seconds
  const [currentTime, setCurrentTime] = useState(765); // 12:45 in seconds
  
  // Mock demo messages if in demo mode
  useEffect(() => {
    if (demo && messages.length === 0) {
      // Add a mock user question
      const userQuestion: Message = {
        id: 1001,
        role: "user",
        content: "Can you explain the freezing point depression in solutions?",
        timestamp: new Date(),
        audioUrl: null
      };
      
      // Add a mock AI response
      const aiResponse: Message = {
        id: 1002,
        role: "assistant",
        content: "The freezing point depression is a colligative property of solutions. When a solute is added to a pure solvent, the freezing point of the solution becomes lower than that of the pure solvent. This happens because the dissolved solute particles disrupt the ability of the solvent particles to form a solid crystal lattice at the normal freezing point.\n\nThe equation that describes this relationship is: ΔTf = Kf × m, where:\n- ΔTf is the freezing point depression\n- Kf is the freezing point depression constant (specific to each solvent)\n- m is the molality of the solution (moles of solute per kg of solvent)\n\nThis property is used in applications like adding salt to ice to melt snow on roads, or in making ice cream where salt is added to ice to lower its freezing point below 0°C, allowing the ice cream mixture to freeze.",
        timestamp: new Date(),
        audioUrl: "/audio/demo_audio.mp3"
      };
      
      setMessages([userQuestion, aiResponse]);
    }
  }, [demo, messages.length]);

  // Slides for the teaching material
  const [slides, setSlides] = useState<Array<{title: string; content: string; imageUrl?: string | null}>>([
    {
      title: "Introduction to Solutions",
      content: "A solution is a homogeneous mixture of two or more substances. The substance present in the largest amount is called the _solvent_, while the substance present in a smaller amount is called the _solute_. Solutions can be solid, liquid, or gas.\n\nCommon examples include:\n- Salt dissolved in water\n- Air (mixture of gases)\n- Brass (solid solution of copper and zinc)",
      imageUrl: "https://images.unsplash.com/photo-1603126857599-f6e157fa2fe6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
    },
    {
      title: "Colligative Properties",
      content: "Colligative properties are properties of solutions that depend on the number of solute particles, not their identity. They include:\n\n- *Vapor pressure lowering*\n- *Boiling point elevation*\n- *Freezing point depression*\n- *Osmotic pressure*\n\nThese properties are directly proportional to the molality of the solution and depend on the number of particles in solution.",
      imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Vapor_Pressure_Solution.svg/440px-Vapor_Pressure_Solution.svg.png"
    },
    {
      title: "Concentration Units",
      content: "Several units are used to express concentration:\n\n- *Molarity (M)*: moles of solute per liter of solution\n- *Molality (m)*: moles of solute per kilogram of solvent\n- *Mole fraction (X)*: ratio of moles of one component to total moles\n- *Weight percentage (w/w %)*: mass of solute per 100 g of solution\n\nFor dilute aqueous solutions, molarity and molality are approximately equal.",
      imageUrl: null
    },
  ]);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  
  useEffect(() => {
    if (isAudioPlaying) {
      const interval = setInterval(() => {
        setCurrentTime(prev => {
          const newTime = prev + 1;
          if (newTime >= playbackDuration) {
            clearInterval(interval);
            return playbackDuration;
          }
          setPlaybackProgress((newTime / playbackDuration) * 100);
          return newTime;
        });
      }, 1000);
      
      return () => clearInterval(interval);
    }
  }, [isAudioPlaying, playbackDuration]);
  
  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };
  
  const toggleNotes = () => {
    setShowNotes(!showNotes);
  };
  
  const toggleMonitoring = () => {
    setShowMonitoring(!showMonitoring);
  };
  
  const handleFullscreen = () => {
    if (isFullscreen) {
      exitFullscreen();
    } else {
      enterFullscreen();
    }
  };
  
  const handleBookmark = () => {
    toast({
      title: "Bookmark added",
      description: "This session has been bookmarked for later reference.",
    });
  };
  
  const handlePlayPause = () => {
    if (isAudioPlaying) {
      pauseAudio();
    } else if (messages.length > 0) {
      // Find the last assistant message with audio
      const assistantMessages = messages.filter(m => m.role === "assistant" && m.audioUrl);
      if (assistantMessages.length > 0) {
        const message = assistantMessages[assistantMessages.length - 1];
        playAudio(message.id || 0, message.audioUrl || "");
      }
    }
  };
  
  const handleNextSlide = () => {
    if (currentSlideIndex < slides.length - 1) {
      setCurrentSlideIndex(prev => prev + 1);
      toast({
        title: "Next slide",
        description: `Viewing slide ${currentSlideIndex + 2} of ${slides.length}`,
      });
    }
  };
  
  const handlePreviousSlide = () => {
    if (currentSlideIndex > 0) {
      setCurrentSlideIndex(prev => prev - 1);
      toast({
        title: "Previous slide",
        description: `Viewing slide ${currentSlideIndex} of ${slides.length}`,
      });
    }
  };
  
  const handleAskQuestion = (question?: string) => {
    if (question) {
      // If a question was provided, send it directly
      sendMessage(question);
    } else {
      // Otherwise just exit fullscreen
      exitFullscreen();
      toast({
        title: "Ask a question",
        description: "You can now ask your question in the chat.",
      });
    }
  };
  
  // Get current assistant message for fullscreen mode
  const currentAssistantMessage = messages.find(m => m.id === activeAudioId) || 
    (messages.length > 0 ? messages.filter(m => m.role === "assistant").pop() : null);

  return (
    <div className="flex h-screen bg-gray-100 transition-all duration-300">
      {/* Sidebar */}
      {!isFullscreen && (
        <Sidebar 
          collapsed={sidebarCollapsed} 
          toggleSidebar={toggleSidebar}
          showStudentProgress={true}
        />
      )}
      
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-full bg-gray-50 overflow-hidden">
        {/* Header */}
        {!isFullscreen && (
          <header className="bg-white shadow-sm px-6 py-3 flex items-center justify-between z-10">
            <div className="flex items-center">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={toggleSidebar}
                className="text-gray-500 hover:text-primary focus:outline-none mr-4"
              >
                <Menu className="h-5 w-5" />
              </Button>
              <div>
                <h1 className="text-lg font-semibold text-gray-800">
                  {subject?.name || "Loading..."} - {topic?.name || "Loading..."}
                </h1>
                <div className="text-sm text-gray-500 flex items-center">
                  <span>CBSE Class 12 • Chapter 2</span>
                  <span className="mx-2">•</span>
                  <span className="flex items-center">
                    <Clock className="h-3.5 w-3.5 mr-1" />
                    <span>Est. {topic?.estimatedDuration || 45} mins</span>
                  </span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-5">
              <Button 
                variant="ghost" 
                size="icon" 
                className="text-gray-500 hover:text-primary focus:outline-none relative"
              >
                <Book className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 bg-amber-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">3</span>
              </Button>
              
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={handleBookmark}
                className="text-gray-500 hover:text-primary focus:outline-none"
              >
                <Bookmark className="h-5 w-5" />
              </Button>
              
              <RaiseHandButton 
                onAskQuestion={(question) => sendMessage(question)}
                className="mr-2"
              />
              
              <Button
                variant="outline"
                size="icon"
                onClick={toggleMonitoring}
                className="flex items-center justify-center text-primary bg-indigo-50 hover:bg-indigo-100 focus:outline-none rounded-full w-8 h-8"
              >
                <HelpCircle className="h-5 w-5" />
              </Button>
              
              <Button
                variant="default"
                onClick={handleFullscreen}
                className="flex items-center justify-center"
              >
                <Maximize className="h-4 w-4 mr-2" />
                <span>Fullscreen Mode</span>
              </Button>
            </div>
          </header>
        )}
        
        {/* Main Learning Interface */}
        <div className="flex-1 overflow-auto">
          {/* Session Summary */}
          <SessionSummary
            subjectName={subject?.name}
            topicName={topic?.name}
            lastSessionDate="2 days ago"
            completion={65}
            onResumeSession={handleFullscreen}
            onTakeTest={() => {
              toast({
                title: "Test mode",
                description: "Starting test mode for this topic",
              });
            }}
            onPracticeExercises={() => {
              toast({
                title: "Practice mode",
                description: "Starting practice exercises for this topic",
              });
            }}
            onReviewNotes={() => {
              setShowNotes(true);
              toast({
                title: "Notes view",
                description: "Showing your notes for this topic",
              });
            }}
          />
        </div>
      </div>
      
      {/* Fullscreen Mode */}
      <FullscreenMode 
        isActive={isFullscreen}
        onExit={exitFullscreen}
        subject={subject?.name}
        topic={topic?.name}
        currentMessage={currentAssistantMessage}
        onPlayPause={handlePlayPause}
        onNext={handleNextSlide}
        onPrevious={handlePreviousSlide}
        onAskQuestion={handleAskQuestion}
        isPlaying={isAudioPlaying}
        progress={playbackProgress}
        duration={playbackDuration}
        currentTime={currentTime}
        slides={slides}
        currentSlideIndex={currentSlideIndex}
      />
      
      {/* Monitoring Overlay */}
      <MonitoringOverlay 
        isOpen={showMonitoring}
        onClose={() => setShowMonitoring(false)}
        sessionData={{
          duration: "32:15",
          engagementScore: 87,
          questionsAsked: 8,
          conceptMastery: 72
        }}
      />
    </div>
  );
};

export default Session;
