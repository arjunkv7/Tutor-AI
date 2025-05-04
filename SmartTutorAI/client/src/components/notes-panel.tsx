import { useState, useEffect } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Download, Printer, Pencil, Highlighter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Message } from "@/hooks/use-session";

interface NotesPanelProps {
  subject?: string;
  topic?: string;
  messages: Message[];
  isLoading?: boolean;
}

const NotesPanel: React.FC<NotesPanelProps> = ({
  subject = "Chemistry",
  topic = "Solutions",
  messages,
  isLoading = false
}) => {
  const [notes, setNotes] = useState<string[]>([]);
  const [highlights, setHighlights] = useState<string[]>([]);

  // Generate notes from assistant messages
  useEffect(() => {
    if (messages.length > 0) {
      const assistantMessages = messages
        .filter(msg => msg.role === "assistant")
        .map(msg => msg.content);
        
      setNotes(assistantMessages);
      
      // Extract key points as highlights (this is a simplified implementation)
      // In a real app, we'd use a more sophisticated algorithm or allow users to highlight
      const extractedHighlights = assistantMessages
        .join(" ")
        .split(".")
        .filter(sentence => 
          sentence.includes("key") || 
          sentence.includes("important") || 
          sentence.includes("formula") ||
          sentence.includes("remember")
        )
        .filter(s => s.trim().length > 20)
        .map(s => s.trim())
        .slice(0, 3);
        
      setHighlights(extractedHighlights);
    }
  }, [messages]);

  // Format notes content from raw text
  const formatNotesContent = (content: string) => {
    // This is a simplified implementation
    // In a real app, we'd use a more sophisticated parser for formatting
    
    // Handle headers
    let formatted = content.replace(/#{1,6}\s+([^\n]+)/g, '<h4 class="text-md font-medium text-gray-800 mt-4">$1</h4>');
    
    // Handle lists
    formatted = formatted.replace(/^\s*[\-*]\s+(.+)$/gm, '<li>$1</li>');
    formatted = formatted.replace(/<li>(.+?)(?=<li>|$)/gs, '<ul class="list-disc pl-5 mt-1 text-sm text-gray-700 space-y-1">$&</ul>');
    
    // Handle numbered lists
    formatted = formatted.replace(/^\s*\d+\.\s+(.+)$/gm, '<li>$1</li>');
    formatted = formatted.replace(/<li>(.+?)(?=<li>|$)/gs, '<ol class="list-decimal pl-5 mt-1 text-sm text-gray-700 space-y-1">$&</ol>');
    
    // Handle bold text
    formatted = formatted.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
    
    // Handle paragraphs
    formatted = formatted.replace(/([^\n<>]+)(?!\n|<)/g, '<p class="text-sm text-gray-700 mt-1">$1</p>');
    
    return formatted;
  };

  return (
    <div className="w-80 border-l border-gray-200 bg-white overflow-hidden">
      <div className="p-4 border-b border-gray-200 flex justify-between items-center">
        <h2 className="font-semibold text-gray-800">Notes & Highlights</h2>
        <div className="flex space-x-2">
          <Button variant="ghost" size="icon">
            <Download className="h-4 w-4 text-gray-500" />
          </Button>
          <Button variant="ghost" size="icon">
            <Printer className="h-4 w-4 text-gray-500" />
          </Button>
          <Button variant="ghost" size="icon">
            <Pencil className="h-4 w-4 text-gray-500" />
          </Button>
        </div>
      </div>
      
      <ScrollArea className="h-[calc(100vh-8rem)]">
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-800">{topic} - Chapter 2</h3>
          <p className="text-sm text-gray-500">{subject} • CBSE Class 12</p>
          
          {isLoading ? (
            <div className="mt-4 text-center py-10">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary mx-auto"></div>
              <p className="mt-2 text-sm text-gray-500">Generating notes...</p>
            </div>
          ) : notes.length === 0 ? (
            <div className="mt-4 text-center py-10">
              <p className="text-sm text-gray-500">No notes available yet. Start your lesson to generate notes.</p>
            </div>
          ) : (
            <div className="mt-4">
              {/* Here we could process the AI messages to generate structured notes */}
              {/* For this example, we'll just display the AI messages as notes */}
              {notes.map((note, index) => (
                <div key={index} dangerouslySetInnerHTML={{ __html: formatNotesContent(note) }} />
              ))}
            </div>
          )}
          
          {highlights.length > 0 && (
            <div className="mt-6 border-t border-gray-200 pt-4">
              <h4 className="text-md font-medium text-gray-800 flex items-center">
                <Highlighter className="text-amber-500 h-4 w-4 mr-2" />
                <span>Highlights</span>
              </h4>
              
              {highlights.map((highlight, index) => (
                <div key={index} className="mt-3 bg-yellow-50 p-2 rounded border-l-2 border-amber-500 text-sm text-gray-700">
                  "{highlight}"
                </div>
              ))}
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
};

export default NotesPanel;
