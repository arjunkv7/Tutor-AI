import { useState, useEffect } from "react";
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
    content:
      "The freezing point depression is a colligative property of solutions. When a solute is added to a pure solvent, the freezing point of the solution becomes lower than that of the pure solvent.",
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
    content:
      "Sure! Adding salt to ice to melt snow on roads is a real-life example of freezing point depression.",
    timestamp: new Date(),
    audioUrl: null,
  },
];

export default function InteractiveTeaching() {
  const [chatMessages, setChatMessages] = useState(hardcodedChat);
  const [aiSpeaking, setAISpeaking] = useState(true);
  const [aiTyping, setAITyping] = useState(false);
  const [notes, setNotes] = useState("");
  const [sessionTime, setSessionTime] = useState(0);
  const [showVideo, setShowVideo] = useState(false); // Toggle for avatar image/video

  // Hardcoded points (make dynamic later)
  const topicPoints = [
    "Definition: Freezing point depression is a colligative property.",
    "Occurs when a solute is added to a solvent.",
    "Lowers the freezing point of the solution.",
    "Example: Salt on icy roads.",
  ];

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
          content:
            "This is a hardcoded AI response. (Later, this will be replaced with real AI integration.)",
          timestamp: new Date(),
          audioUrl: null,
        },
      ]);
      setAITyping(false);
    }, 2000);
  };

  const handleExportChat = () => {
    const exportText = chatMessages
      .map((msg) => `${msg.role}: ${msg.content}`)
      .join("\n");
    const blob = new Blob([exportText], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "chat.txt";
    link.click();
  };

  return (
    <div className="flex h-screen bg-gray-50 min-h-0">
      {/* Left Column: Avatar and Chat */}
      <div className="w-96 bg-white shadow-lg p-6 flex flex-col items-center border-r">
        {/* Large Avatar (fixed, not scrollable) */}
        <div className="mb-6 w-full flex flex-col items-center flex-shrink-0">
          <div className="relative w-64 h-64 mb-4">
            {showVideo ? (
              <video
               
                src="/videos/tutor.mp4"
                controls
                autoPlay
                loop
                className="w-full h-full rounded-full object-cover border-4 border-gray-300 shadow-lg"
              />
            ) : (
              <img
                src="/images/tutor.png"
                alt="AI Tutor"
                className="w-full h-full rounded-full object-cover border-4 border-gray-300 shadow-lg"
              />
            )}
            <button
              className="absolute bottom-2 right-2 bg-white rounded-full shadow px-2 py-1 text-xs border hover:bg-gray-100"
              onClick={() => setShowVideo((v) => !v)}
            >
              {showVideo ? "Show Image" : "Show Video"}
            </button>
          </div>
        </div>
        {/* Chat Section (scrollable) */}
        <div className="w-full flex-1 flex flex-col min-h-0 overflow-hidden">
          <div className="p-2 border-b font-semibold text-lg text-center flex-shrink-0">Chat</div>
          <div className="flex-1 overflow-y-auto min-h-0 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100" style={{ scrollbarWidth: 'thin' }}>
            <ChatInterface
              messages={chatMessages}
              isLoading={aiTyping}
              onSendMessage={handleSendMessage}
              onPlayAudio={() => {}}
              onPauseAudio={() => {}}
              activeAudioId={null}
            />
          </div>
        </div>
      </div>

      {/* Middle Column: AI Speaking Text (scrollable) */}
      <div className="flex-1 flex flex-col items-center py-8 px-8 min-h-0">
        <div className="flex-1 flex flex-col items-center w-full overflow-y-auto min-h-0 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100" style={{ scrollbarWidth: 'thin' }}>
          {/* AI Speaking Message */}
          <div className="mt-4 mb-6 w-full max-w-2xl text-center">
            <div className="rounded-lg bg-white shadow p-6 text-lg font-medium text-gray-800 min-h-[60px] flex flex-col items-center justify-center gap-4">
              <p>{hardcodedAIMessages[0].content}</p>
              <div className="flex gap-2 mt-2">
                <Button size="sm">Explain Again</Button>
                <Button size="sm">Simplify</Button>
              </div>
            </div>
          </div>
        </div>
        {/* Bottom Buttons (sticky at bottom) */}
        <div className="w-full bg-white shadow-lg p-4 flex justify-center gap-4 mt-8 flex-shrink-0 sticky bottom-0 z-10">
          <Button variant="default" className="w-full max-w-xs">
            Take Quiz
          </Button>
          <Button variant="outline" className="w-full max-w-xs">
            Mark Complete
          </Button>
          <div className="text-xs text-gray-400 flex items-center">
            Time: {sessionTime} min
          </div>
        </div>
      </div>

      {/* Right Column: Key Points, Details, Notes (scrollable) */}
      <div className="w-[420px] max-w-full bg-white border-l shadow-lg flex flex-col p-6 min-h-0">
        <div className="flex-1 flex flex-col overflow-y-auto min-h-0 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100" style={{ scrollbarWidth: 'thin' }}>
          <div className="mb-4">
            <div className="font-semibold text-primary text-center">
              {hardcodedSession.subject}
            </div>
            <div className="text-lg font-bold text-center">{hardcodedSession.topic}</div>
            <div className="text-gray-500 text-center">{hardcodedSession.details}</div>
            <div className="text-xs text-gray-400 mt-2 text-center">
              Duration: {hardcodedSession.duration}
            </div>
          </div>
          <div className="mb-6 w-full">
            <div className="text-sm font-medium text-gray-700 mb-2">Key Points</div>
            <ul className="list-disc pl-5 text-gray-700 text-sm space-y-1">
              {topicPoints.map((point, idx) => (
                <li key={idx}>{point}</li>
              ))}
            </ul>
          </div>
          <div className="w-full mt-auto">
            <div className="text-sm font-medium text-gray-700 mb-2">Notes</div>
            <textarea
              className="w-full bg-gray-100 rounded p-2 h-24 text-sm text-gray-600"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add your notes here..."
            />
          </div>
        </div>
      </div>
    </div>
  );
}
