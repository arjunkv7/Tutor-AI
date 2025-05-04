import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { sendChatMessage, generateSpeech } from "@/lib/openai";

export type Message = {
  id?: number;
  role: "user" | "assistant" | "system";
  content: string;
  timestamp?: Date;
  audioUrl?: string | null;
  attachmentUrl?: string | null;
  isPlaying?: boolean;
};

export type SessionData = {
  id: number;
  userId: number;
  subjectId: number;
  topicId: number;
  subject?: string;
  topic?: string;
  startTime?: Date;
  endTime?: Date | null;
  duration?: number | null;
  completionPercentage?: number;
  notes?: string | null;
};

export function useSession(sessionId: number, mockData?: boolean) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [activeSpeech, setActiveSpeech] = useState<HTMLAudioElement | null>(null);
  const [audioPlayingId, setAudioPlayingId] = useState<number | null>(null);

  // Fetch session data
  const { data: session, isLoading: isSessionLoading } = useQuery({
    queryKey: [`/api/sessions/${sessionId}`],
    enabled: !!sessionId,
  });

  // Fetch messages
  const { data: fetchedMessages, isLoading: isMessagesLoading } = useQuery({
    queryKey: [`/api/sessions/${sessionId}/messages`],
    enabled: !!sessionId,
  });

  // Update messages when fetched
  useEffect(() => {
    if (fetchedMessages && Array.isArray(fetchedMessages)) {
      setMessages(fetchedMessages);
    }
  }, [fetchedMessages]);

  // Send message mutation
  const sendMessageMutation = useMutation({
    mutationFn: async (newMessage: Omit<Message, "id" | "timestamp">) => {
      // Check if this is a question from the student
      const isQuestion = newMessage.role === "user";
      
      // Add message to local state
      const tempMessage = { ...newMessage, id: Date.now() };
      setMessages(prev => [...prev, tempMessage]);

      // Save user message to database if it's from the user
      if (isQuestion) {
        await apiRequest("POST", "/api/messages", {
          sessionId,
          role: newMessage.role,
          content: newMessage.content,
        });
      }

      // Get AI response
      const aiResponse = await sendChatMessage(
        [...messages, tempMessage].map(m => ({ role: m.role, content: m.content })),
        sessionId,
        (session as SessionData)?.userId || undefined,
        isQuestion
      );

      // Generate speech for AI response
      let audioUrl = null;
      try {
        audioUrl = await generateSpeech(aiResponse.content);
      } catch (error) {
        console.error("Failed to generate speech:", error);
      }

      // If the AI response already has an ID from the server, use it
      // otherwise save the AI response to database
      let responseData;
      if (aiResponse.id) {
        // Update the message with the audio URL
        responseData = await apiRequest("PATCH", `/api/messages/${aiResponse.id}`, {
          audioUrl,
        }).then(res => res.json());
      } else {
        // Save AI response to database
        const savedResponse = await apiRequest("POST", "/api/messages", {
          sessionId,
          role: aiResponse.role,
          content: aiResponse.content,
          audioUrl,
        });
        responseData = await savedResponse.json();
      }

      // Add AI response to local state
      return responseData;
    },
    onSuccess: (responseData) => {
      // Update messages with the saved AI response
      queryClient.invalidateQueries({ queryKey: [`/api/sessions/${sessionId}/messages`] });
      
      // Auto-play the latest response if we're in fullscreen mode
      if (document.fullscreenElement && responseData?.audioUrl) {
        playAudio(responseData.id, responseData.audioUrl);
      }
    },
  });

  // Play audio function
  const playAudio = (messageId: number, audioUrl: string) => {
    // Stop any currently playing audio
    if (activeSpeech) {
      activeSpeech.pause();
      activeSpeech.currentTime = 0;
      setActiveSpeech(null);
      setAudioPlayingId(null);
    }

    // Play the new audio
    const audio = new Audio(audioUrl);
    
    audio.onended = () => {
      setActiveSpeech(null);
      setAudioPlayingId(null);
      
      // Update message state to reflect that audio is no longer playing
      setMessages(prev => 
        prev.map(msg => 
          msg.id === messageId ? { ...msg, isPlaying: false } : msg
        )
      );
    };

    audio.play().then(() => {
      setActiveSpeech(audio);
      setAudioPlayingId(messageId);
      
      // Update message state to reflect that audio is playing
      setMessages(prev => 
        prev.map(msg => 
          msg.id === messageId ? { ...msg, isPlaying: true } : msg
        )
      );
    }).catch(error => {
      console.error("Failed to play audio:", error);
    });
  };

  // Pause audio function
  const pauseAudio = () => {
    if (activeSpeech) {
      activeSpeech.pause();
      
      // Update message state to reflect that audio is paused
      if (audioPlayingId) {
        setMessages(prev => 
          prev.map(msg => 
            msg.id === audioPlayingId ? { ...msg, isPlaying: false } : msg
          )
        );
      }
      
      setActiveSpeech(null);
      setAudioPlayingId(null);
    }
  };

  // Update session
  const updateSessionMutation = useMutation({
    mutationFn: (data: Partial<SessionData>) => 
      apiRequest("PATCH", `/api/sessions/${sessionId}`, data).then(res => res.json()),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`/api/sessions/${sessionId}`] });
    },
  });

  return {
    session: session as SessionData | undefined,
    messages,
    setMessages,
    isLoading: isSessionLoading || isMessagesLoading,
    sendMessage: (content: string) => 
      sendMessageMutation.mutate({ role: "user", content }),
    isPending: sendMessageMutation.isPending,
    playAudio,
    pauseAudio,
    isAudioPlaying: !!activeSpeech,
    activeAudioId: audioPlayingId,
    updateSession: updateSessionMutation.mutate,
  };
}
