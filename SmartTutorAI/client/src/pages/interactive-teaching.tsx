import { useState } from "react";
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

  // Simulate sending a message in the right sidebar chat
  const handleSendMessage = (content: string) => {
    setChatMessages((msgs) => [
      ...msgs,
      {
        id: msgs.length + 1,
        role: "user",
        content,
        timestamp: new Date(),
      },
      {
        id: msgs.length + 2,
        role: "assistant",
        content: "This is a hardcoded AI response. (Later, this will be replaced with real AI integration.)",
        timestamp: new Date(),
        audioUrl: null,
      },
    ]);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Left Sidebar with Session Details, Progress, and Notes */}
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
          <div className="bg-gray-100 rounded p-2 h-32 overflow-y-auto">
            <p className="text-sm text-gray-600">Add your notes here...</p>
          </div>
        </div>
      </div>

      {/* Middle Section */}
      <div className="flex-1 flex flex-col items-center justify-between py-8 px-4 relative">
        {/* Avatar and Audio Animation */}
        <div className="flex flex-col items-center w-full">
          <TutorAvatar isActive isPlaying={aiSpeaking} isSpeaking={aiSpeaking} size="lg" showWaveform />
          <div className="mt-4 mb-6 w-full max-w-xl text-center">
            <div className="rounded-lg bg-white shadow p-4 text-lg font-medium text-gray-800 min-h-[60px] flex items-center justify-center">
              {hardcodedAIMessages[0].content}
            </div>
          </div>
          <AudioWave isPlaying={aiSpeaking} height={32} barCount={16} className="mx-auto" />
        </div>
        {/* Sticky Buttons */}
        <div className="sticky bottom-0 w-full bg-white shadow-lg p-4 flex justify-center gap-4">
          <Button variant="default" onClick={() => setIsChatOpen(true)} className="w-full max-w-xs">
            Ask Question
          </Button>
          <Button variant="default" className="w-full max-w-xs">
            Take Quiz
          </Button>
        </div>
      </div>

      {/* Right Sidebar Chat (Sheet) */}
      <Sheet open={isChatOpen} onOpenChange={setIsChatOpen}>
        <SheetContent side="right" className="w-full sm:max-w-md p-0">
          <div className="h-full flex flex-col">
            <div className="p-4 border-b font-semibold text-lg">Ask a Question</div>
            <ChatInterface
              messages={chatMessages}
              isLoading={false}
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