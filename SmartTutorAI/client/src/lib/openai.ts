// the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user

// This file handles interactions with the OpenAI API via our backend

import { apiRequest } from "@/lib/queryClient";

export type Message = {
  role: "system" | "user" | "assistant";
  content: string;
  id?: number;
};

export type AIResponse = {
  message: Message;
  id?: number;
};

export async function sendChatMessage(
  messages: Message[],
  sessionId?: number,
  userId?: number,
  isQuestion: boolean = false
): Promise<Message> {
  const response = await apiRequest("POST", "/api/ai/chat", {
    messages,
    sessionId,
    userId,
    isQuestion
  });

  const data: AIResponse = await response.json();
  return { ...data.message, id: data.id };
}

// Function to generate text-to-speech
export async function generateSpeech(text: string): Promise<string> {
  const response = await apiRequest("POST", "/api/ai/tts", { text });
  const data = await response.json();
  return data.audioUrl;
}

// Generate content based on a topic
export async function generateTopicContent(
  subject: string,
  topic: string
): Promise<string> {
  const systemMessage: Message = {
    role: "system",
    content: 
      "You are an expert AI tutor for CBSE Class 12 students. Provide comprehensive, accurate, and engaging educational content. " +
      "Break down complex concepts into understandable parts. Include relevant formulas, diagrams, and real-world examples. " +
      "Your explanations should follow the CBSE curriculum structure and address common misconceptions."
  };
  
  const userMessage: Message = {
    role: "user",
    content: `Please provide an introduction to the ${topic} topic from the ${subject} subject in the CBSE Class 12 curriculum. Include key concepts, definitions, and the significance of this topic.`
  };
  
  const response = await sendChatMessage([systemMessage, userMessage]);
  return response.content;
}

// Answering student questions about a topic
export async function answerQuestion(
  subject: string,
  topic: string,
  question: string,
  previousMessages: Message[] = []
): Promise<string> {
  const systemMessage: Message = {
    role: "system",
    content: 
      `You are an expert AI tutor for CBSE Class 12 ${subject}, specializing in ${topic}. ` +
      "Answer student questions clearly and accurately. Provide step-by-step explanations " +
      "when needed. If the student's question is unclear, ask for clarification. " +
      "If the question is outside your knowledge area, acknowledge this and suggest related topics you can help with."
  };
  
  // Combine previous messages with the new question
  const messages = [
    systemMessage,
    ...previousMessages,
    { role: "user" as const, content: question }
  ];
  
  const response = await sendChatMessage(messages);
  return response.content;
}

// Generate a quiz or practice questions for a topic
export async function generateQuiz(
  subject: string,
  topic: string,
  difficulty: "basic" | "intermediate" | "advanced" = "intermediate",
  numberOfQuestions: number = 5
): Promise<string> {
  const systemMessage: Message = {
    role: "system",
    content: "You are an expert question creator for CBSE Class 12 curriculum. Generate challenging but fair questions that test understanding of key concepts. Include a mix of conceptual and application-based questions."
  };
  
  const userMessage: Message = {
    role: "user",
    content: `Create ${numberOfQuestions} ${difficulty} level questions about ${topic} in ${subject} for CBSE Class 12 students. Include answers and explanations for each question.`
  };
  
  const response = await sendChatMessage([systemMessage, userMessage]);
  return response.content;
}
