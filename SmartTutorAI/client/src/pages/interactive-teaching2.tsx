import { useState, useEffect } from "react";
import TutorAvatar from "@/components/tutor-avatar";
import AudioWave from "@/components/audio-wave";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import ChatInterface from "@/components/chat-interface";
import { Progress } from "@/components/ui/progress";

const hardcodedSession = {
  topic: "Freezing Point Depression",
  subject: "Chemistry",
  details: "Understanding colligative properties in solutions.",
  duration: "45 min",
  progress: 60,
};

const hardcodedAIMessages = [
  {
    id: 1,
    role: "assistant",
    content: "The freezing point depression is a colligative property of solutions. When a solute is added to a pure solvent, the freezing point of the solution becomes lower than that of the pure solvent.",
    timestamp: new Date(),
    audioUrl: null,
  },
];

const hardcodedChat = [
  {
    id: 1,
    role: "user",
    content: "Can you give a real-life example?",
    timestamp: new Date(),
  },
  {
    id: 2,
    role: "assistant",
    content: "Sure! Adding salt to ice to melt snow on roads is a real-life example of freezing point depression.",
    timestamp: new Date(),
    audioUrl: null,
  },
];

export default function InteractiveTeaching() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState(hardcodedChat);
  const [aiSpeaking, setAISpeaking] = useState(true);
  const [aiTyping, setAITyping] = useState(false);
  const [notes, setNotes] = useState("");
  const [sessionTime, setSessionTime] = useState(0);

  // Timer for session time
  useEffect(() => {
    const timer = setInterval(() => setSessionTime((t) => t + 1), 60000);
    return () => clearInterval(timer);
  }, []);

  const handleSendMessage = (content: string) => {
    setAITyping(true);
    setChatMessages((msgs) => [
      ...msgs,
      {
        id: msgs.length + 1,
        role: "user",
        content,
        timestamp: new Date(),
      },
    ]);

    setTimeout(() => {
      setChatMessages((msgs) => [
        ...msgs,
        {
          id: msgs.length + 2,
          role: "assistant",
          content: "This is a hardcoded AI response. (Later, this will be replaced with real AI integration.)",
          timestamp: new Date(),
          audioUrl: null,
        },
      ]);
      setAITyping(false);
    }, 2000);
  };

  const handleExportChat = () => {
    const exportText = chatMessages.map(msg => `${msg.role}: ${msg.content}`).join("\n");
    const blob = new Blob([exportText], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "chat.txt";
    link.click();
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      
      {/* Left Sidebar */}
      <div className="w-64 bg-white shadow-lg p-4 flex flex-col">
        <div className="mb-4">
          <div className="font-semibold text-primary">{hardcodedSession.subject}</div>
          <div className="text-lg font-bold">{hardcodedSession.topic}</div>
          <div className="text-gray-500">{hardcodedSession.details}</div>
          <div className="text-xs text-gray-400 mt-2">Duration: {hardcodedSession.duration}</div>
        </div>

        <div className="mb-4">
          <div className="text-sm font-medium text-gray-700">Progress</div>
          <Progress value={hardcodedSession.progress} className="h-2 mt-1" />
        </div>

        <div className="flex-1">
          <div className="text-sm font-medium text-gray-700 mb-2">Notes</div>
          <textarea 
            className="w-full bg-gray-100 rounded p-2 h-32 text-sm text-gray-600"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Add your notes here..."
          />
        </div>
      </div>

      {/* Center */}
      <div className="flex-1 flex flex-col items-center justify-between py-8 px-4 relative">
        
        <div className="flex flex-col items-center w-full">
          <TutorAvatar isActive isPlaying={aiSpeaking} isSpeaking={aiSpeaking} size="lg" showWaveform />

          <div className="mt-4 mb-6 w-full max-w-xl text-center">
            <div className="rounded-lg bg-white shadow p-4 text-lg font-medium text-gray-800 min-h-[60px] flex flex-col items-center justify-center gap-4">
              <p>{hardcodedAIMessages[0].content}</p>
              <div className="flex gap-2 mt-2">
                <Button size="sm">Explain Again</Button>
                <Button size="sm">Simplify</Button>
              </div>
            </div>
          </div>

          <AudioWave isPlaying={aiSpeaking} height={32} barCount={16} className="mx-auto" />
        </div>

        <div className="sticky bottom-0 w-full bg-white shadow-lg p-4 flex justify-center gap-4">
          <Button variant="default" onClick={() => setIsChatOpen(true)} className="w-full max-w-xs">
            Ask Question
          </Button>
          <Button variant="default" className="w-full max-w-xs">
            Take Quiz
          </Button>
          <Button variant="outline" className="w-full max-w-xs">
            Mark Complete
          </Button>
          <div className="text-xs text-gray-400 flex items-center">Time: {sessionTime} min</div>
        </div>
      </div>

      {/* Right Sidebar */}
      <Sheet open={isChatOpen} onOpenChange={setIsChatOpen}>
        <SheetContent side="right" className="w-full sm:max-w-md p-0">
          <div className="h-full flex flex-col">
            <div className="p-4 border-b font-semibold text-lg flex justify-between">
              Ask a Question
              <Button size="sm" variant="outline" onClick={handleExportChat}>Export Chat</Button>
            </div>
            <ChatInterface
              messages={chatMessages}
              isLoading={aiTyping}
              onSendMessage={handleSendMessage}
              onPlayAudio={() => {}}
              onPauseAudio={() => {}}
              activeAudioId={null}
            />
            <div className="p-4 border-t">
              <Button variant="default" className="w-full" onClick={() => setIsChatOpen(false)}>
                Continue Session
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
