import React, { useState } from "react";
import { Hand, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";

interface RaiseHandButtonProps {
  onAskQuestion: (question: string) => void;
  isFullscreen?: boolean;
  className?: string;
}

const RaiseHandButton: React.FC<RaiseHandButtonProps> = ({
  onAskQuestion,
  isFullscreen = false,
  className = "",
}) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [question, setQuestion] = useState("");
  const [isRaised, setIsRaised] = useState(false);

  const handleRaiseHand = () => {
    if (isFullscreen) {
      // In fullscreen, we first raise hand to signal we have a question
      setIsRaised(true);
      // After a short delay, open the dialog (simulating tutor acknowledging)
      setTimeout(() => {
        setIsDialogOpen(true);
      }, 1500);
    } else {
      // Outside fullscreen, directly open the dialog
      setIsDialogOpen(true);
    }
  };

  const handleSubmitQuestion = () => {
    if (question.trim()) {
      onAskQuestion(question);
      setQuestion("");
      setIsRaised(false);
      setIsDialogOpen(false);
    }
  };

  const handleCancel = () => {
    setQuestion("");
    setIsRaised(false);
    setIsDialogOpen(false);
  };

  // Render a button in fullscreen mode, or a normal button otherwise
  if (isFullscreen) {
    return (
      <>
        <Button
          variant={isRaised ? "default" : "ghost"}
          size="icon"
          onClick={handleRaiseHand}
          className={`w-12 h-12 rounded-full ${isRaised ? "bg-amber-500 text-white" : "bg-white bg-opacity-10 text-white hover:bg-opacity-20"} ${className}`}
        >
          <Hand className={`h-5 w-5 ${isRaised ? "animate-pulse" : ""}`} />
        </Button>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="bg-white dark:bg-gray-900 max-w-md">
            <DialogHeader>
              <DialogTitle>Ask Your Question</DialogTitle>
            </DialogHeader>
            <Textarea
              placeholder="What would you like to ask about the current topic?"
              className="min-h-[100px]"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
            />
            <DialogFooter>
              <Button variant="outline" onClick={handleCancel}>Cancel</Button>
              <Button onClick={handleSubmitQuestion}>Ask Question</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </>
    );
  }

  return (
    <>
      <Button
        variant="outline"
        onClick={handleRaiseHand}
        className={`flex items-center ${className}`}
      >
        <Hand className="h-4 w-4 mr-2" />
        <span>Raise Hand</span>
      </Button>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="bg-white dark:bg-gray-900 max-w-md">
          <DialogHeader>
            <DialogTitle>Ask Your Question</DialogTitle>
          </DialogHeader>
          <Textarea
            placeholder="What would you like to ask about the current topic?"
            className="min-h-[100px]"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />
          <DialogFooter>
            <Button variant="outline" onClick={handleCancel}>Cancel</Button>
            <Button onClick={handleSubmitQuestion}>Ask Question</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default RaiseHandButton;
