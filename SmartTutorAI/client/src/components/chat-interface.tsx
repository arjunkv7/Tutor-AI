import { useState, useRef, useEffect } from "react";
import { Paperclip, Send, Image, FileText, PenTool, Pause, Play, Bookmark, RefreshCw } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import AudioWave from "@/components/audio-wave";
import { useAudioAnalyser } from "@/hooks/use-audio";
import { Message } from "@/hooks/use-session";

interface ChatInterfaceProps {
  messages: Message[];
  isLoading: boolean;
  onSendMessage: (content: string) => void;
  onPlayAudio: (messageId: number, audioUrl: string) => void;
  onPauseAudio: () => void;
  activeAudioId: number | null;
}

const formatMessageTime = (timestamp?: Date) => {
  if (!timestamp) return "";
  
  const date = new Date(timestamp);
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

const ChatInterface: React.FC<ChatInterfaceProps> = ({
  messages,
  isLoading,
  onSendMessage,
  onPlayAudio,
  onPauseAudio,
  activeAudioId
}) => {
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const audioAnalyser = useAudioAnalyser();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (inputValue.trim() === "") return;
    
    onSendMessage(inputValue);
    setInputValue("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handlePlayAudio = (messageId: number, audioUrl?: string | null) => {
    if (!audioUrl) {
      toast({
        title: "Audio unavailable",
        description: "This message doesn't have audio content.",
        variant: "destructive"
      });
      return;
    }

    if (activeAudioId === messageId) {
      onPauseAudio();
    } else {
      onPlayAudio(messageId, audioUrl);
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-white overflow-hidden">
      {/* Chat Messages Area */}
      <div className="flex-1 overflow-y-auto p-6" id="chat-messages">
        {/* Welcome message */}
        {messages.length === 0 && !isLoading && (
          <div className="flex justify-center mb-6">
            <div className="bg-gray-100 rounded-lg px-4 py-2 text-sm text-gray-600 max-w-md text-center">
              <p>Your session has begun. Ask questions anytime!</p>
            </div>
          </div>
        )}
        
        {/* Loading indicator */}
        {isLoading && (
          <div className="flex justify-center my-4">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
          </div>
        )}
        
        {/* Actual messages */}
        {messages.map((message, index) => (
          message.role === "assistant" ? (
            <div className="flex mb-6" key={message.id || index}>
              <div className="w-10 h-10 rounded-full bg-indigo-100 flex-shrink-0 flex items-center justify-center text-primary mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 8V4H8"></path>
                  <rect width="16" height="12" x="4" y="8" rx="2"></rect>
                  <path d="M2 14h2"></path>
                  <path d="M20 14h2"></path>
                  <path d="M15 13v2"></path>
                  <path d="M9 13v2"></path>
                </svg>
              </div>
              <div className="max-w-3xl">
                {message.audioUrl && (
                  <div className="bg-gray-100 rounded-lg rounded-tl-none p-4 mb-2">
                    {/* Audio visualization */}
                    <div className="flex items-center mb-3 bg-white rounded-lg p-2">
                      <Button
                        onClick={() => handlePlayAudio(message.id || 0, message.audioUrl)}
                        variant="default"
                        size="icon"
                        className="w-8 h-8 rounded-full mr-3 flex-shrink-0"
                      >
                        {activeAudioId === message.id ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                      </Button>
                      
                      <AudioWave 
                        isPlaying={activeAudioId === message.id}
                        className="flex-1"
                      />
                      
                      <span className="text-gray-500 text-sm ml-3">01:24 / 02:37</span>
                    </div>
                  </div>
                )}
                
                <div className="bg-gray-100 rounded-lg rounded-tl-none p-4">
                  <div className="prose prose-sm" dangerouslySetInnerHTML={{ __html: message.content.replace(/\n/g, '<br>') }}></div>
                  
                  <div className="mt-3 flex items-center text-xs text-gray-500">
                    <button className="flex items-center mr-4 text-primary hover:text-indigo-700" onClick={() => handlePlayAudio(message.id || 0, message.audioUrl)}>
                      {activeAudioId === message.id ? (
                        <>
                          <Pause className="h-3 w-3 mr-1" />
                          <span>Pause</span>
                        </>
                      ) : (
                        <>
                          <Play className="h-3 w-3 mr-1" />
                          <span>Listen</span>
                        </>
                      )}
                    </button>
                    <button className="mr-4 hover:text-gray-700">
                      <RefreshCw className="h-3 w-3 mr-1 inline" />
                      <span>Rephrase</span>
                    </button>
                    <button className="hover:text-gray-700">
                      <Bookmark className="h-3 w-3 mr-1 inline" />
                      <span>Save</span>
                    </button>
                  </div>
                </div>
                
                <div className="text-xs text-gray-500 mt-1 ml-1">
                  {formatMessageTime(message.timestamp)}
                  {activeAudioId === message.id && " • Speaking"}
                </div>
              </div>
            </div>
          ) : (
            <div className="flex justify-end mb-6" key={message.id || index}>
              <div className="max-w-md">
                <div className="bg-primary text-white rounded-lg rounded-tr-none p-4">
                  <p>{message.content}</p>
                </div>
                <div className="text-xs text-gray-500 mt-1 mr-1 text-right">
                  {formatMessageTime(message.timestamp)}
                </div>
              </div>
              <div className="w-10 h-10 rounded-full bg-gray-200 flex-shrink-0 ml-3 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=120&q=80" 
                  alt="Student" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          )
        ))}
        
        {/* Invisible element to scroll to */}
        <div ref={messagesEndRef} />
      </div>
      
      {/* Input Area */}
      <div className="border-t border-gray-200 bg-white p-4 sticky bottom-0 z-20">
        <div className="flex items-center">
          <Button variant="ghost" size="icon" className="w-10 h-10 rounded-full mr-3">
            <Paperclip className="h-5 w-5 text-gray-500" />
          </Button>
          
          <div className="flex-1 relative">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask a question or type '/' for commands..."
              className="w-full px-4 py-3 pr-10"
            />
            <Button 
              variant="ghost" 
              size="icon" 
              className="absolute right-3 top-3 h-5 w-5 text-gray-400 hover:text-primary"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"></path>
                <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
                <line x1="12" x2="12" y1="19" y2="22"></line>
              </svg>
            </Button>
          </div>
          
          <Button 
            onClick={handleSendMessage} 
            className="ml-3"
          >
            <Send className="h-4 w-4 mr-1" />
            <span>Send</span>
          </Button>
        </div>
        
        <div className="flex items-center justify-between mt-3 px-2">
          <div className="flex text-xs text-gray-500">
            <button className="mr-4 hover:text-primary flex items-center">
              <Image className="h-3 w-3 mr-1" />
              <span>Image</span>
            </button>
            <button className="mr-4 hover:text-primary flex items-center">
              <FileText className="h-3 w-3 mr-1" />
              <span>Document</span>
            </button>
            <button className="hover:text-primary flex items-center">
              <PenTool className="h-3 w-3 mr-1" />
              <span>Draw</span>
            </button>
          </div>
          
          <div className="text-xs text-gray-500">
            <span>AI Tutor is ready to assist</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
