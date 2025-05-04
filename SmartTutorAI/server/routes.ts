import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  insertUserSchema, 
  insertSubjectSchema, 
  insertTopicSchema, 
  insertSessionSchema, 
  insertMessageSchema, 
  insertProgressSchema, 
  insertHighlightSchema 
} from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Users routes
  app.post("/api/users", async (req, res) => {
    try {
      const data = insertUserSchema.parse(req.body);
      const existingUser = await storage.getUserByUsername(data.username);
      
      if (existingUser) {
        return res.status(409).json({ message: "Username already taken" });
      }
      
      const user = await storage.createUser(data);
      res.status(201).json(user);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: error.errors });
      }
      res.status(500).json({ message: "Failed to create user" });
    }
  });

  app.get("/api/users/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const user = await storage.getUser(id);
      
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });

  // Subjects routes
  app.get("/api/subjects", async (req, res) => {
    try {
      const subjects = await storage.getAllSubjects();
      res.json(subjects);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch subjects" });
    }
  });

  app.get("/api/subjects/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const subject = await storage.getSubject(id);
      
      if (!subject) {
        return res.status(404).json({ message: "Subject not found" });
      }
      
      res.json(subject);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch subject" });
    }
  });

  app.post("/api/subjects", async (req, res) => {
    try {
      const data = insertSubjectSchema.parse(req.body);
      const subject = await storage.createSubject(data);
      res.status(201).json(subject);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: error.errors });
      }
      res.status(500).json({ message: "Failed to create subject" });
    }
  });

  // Topics routes
  app.get("/api/subjects/:subjectId/topics", async (req, res) => {
    try {
      const subjectId = parseInt(req.params.subjectId);
      const topics = await storage.getTopicsBySubject(subjectId);
      res.json(topics);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch topics" });
    }
  });

  app.get("/api/topics/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const topic = await storage.getTopic(id);
      
      if (!topic) {
        return res.status(404).json({ message: "Topic not found" });
      }
      
      res.json(topic);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch topic" });
    }
  });

  app.post("/api/topics", async (req, res) => {
    try {
      const data = insertTopicSchema.parse(req.body);
      const topic = await storage.createTopic(data);
      res.status(201).json(topic);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: error.errors });
      }
      res.status(500).json({ message: "Failed to create topic" });
    }
  });

  // Sessions routes
  app.post("/api/sessions", async (req, res) => {
    try {
      const data = insertSessionSchema.parse(req.body);
      const session = await storage.createSession(data);
      res.status(201).json(session);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: error.errors });
      }
      res.status(500).json({ message: "Failed to create session" });
    }
  });

  app.get("/api/sessions/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const session = await storage.getSession(id);
      
      if (!session) {
        return res.status(404).json({ message: "Session not found" });
      }
      
      res.json(session);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch session" });
    }
  });

  app.patch("/api/messages/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const { audioUrl } = req.body;
      
      // Get the message first
      const message = await storage.getMessage(id);
      
      if (!message) {
        return res.status(404).json({ message: "Message not found" });
      }
      
      // Update the message with audio URL
      const updatedMessage = {
        ...message,
        audioUrl
      };
      
      // Save the updated message
      const result = await storage.updateMessage(id, updatedMessage);
      res.json(result);
    } catch (error) {
      console.error("Error updating message:", error);
      res.status(500).json({ message: "Failed to update message" });
    }
  });

  app.patch("/api/sessions/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const session = await storage.updateSession(id, req.body);
      
      if (!session) {
        return res.status(404).json({ message: "Session not found" });
      }
      
      res.json(session);
    } catch (error) {
      res.status(500).json({ message: "Failed to update session" });
    }
  });

  app.get("/api/users/:userId/sessions", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const sessions = await storage.getSessionsByUser(userId);
      res.json(sessions);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch sessions" });
    }
  });

  app.get("/api/users/:userId/sessions/recent", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const limit = req.query.limit ? parseInt(req.query.limit as string) : 5;
      const sessions = await storage.getRecentSessions(userId, limit);
      res.json(sessions);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch recent sessions" });
    }
  });

  // Messages routes
  app.post("/api/messages", async (req, res) => {
    try {
      const data = insertMessageSchema.parse(req.body);
      const message = await storage.createMessage(data);
      res.status(201).json(message);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: error.errors });
      }
      res.status(500).json({ message: "Failed to create message" });
    }
  });

  app.get("/api/sessions/:sessionId/messages", async (req, res) => {
    try {
      const sessionId = parseInt(req.params.sessionId);
      const messages = await storage.getMessagesBySession(sessionId);
      res.json(messages);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch messages" });
    }
  });

  // Progress routes
  app.get("/api/users/:userId/progress", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const progress = await storage.getProgressByUser(userId);
      res.json(progress);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch progress" });
    }
  });

  app.get("/api/users/:userId/subjects/:subjectId/progress", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const subjectId = parseInt(req.params.subjectId);
      const progress = await storage.getProgressByUserAndSubject(userId, subjectId);
      res.json(progress);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch progress" });
    }
  });

  app.post("/api/progress", async (req, res) => {
    try {
      const data = insertProgressSchema.parse(req.body);
      const progress = await storage.createOrUpdateProgress(data);
      res.status(201).json(progress);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: error.errors });
      }
      res.status(500).json({ message: "Failed to create/update progress" });
    }
  });

  // Highlights routes
  app.post("/api/highlights", async (req, res) => {
    try {
      const data = insertHighlightSchema.parse(req.body);
      const highlight = await storage.createHighlight(data);
      res.status(201).json(highlight);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: error.errors });
      }
      res.status(500).json({ message: "Failed to create highlight" });
    }
  });

  app.get("/api/users/:userId/highlights", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const highlights = await storage.getHighlightsByUser(userId);
      res.json(highlights);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch highlights" });
    }
  });

  app.get("/api/sessions/:sessionId/highlights", async (req, res) => {
    try {
      const sessionId = parseInt(req.params.sessionId);
      const highlights = await storage.getHighlightsBySession(sessionId);
      res.json(highlights);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch highlights" });
    }
  });

  // OpenAI API proxy to avoid exposing keys on client side
  app.post("/api/ai/chat", async (req, res) => {
    try {
      const { messages, sessionId, userId, isQuestion } = req.body;
      
      if (!messages || !Array.isArray(messages)) {
        return res.status(400).json({ message: "Messages are required and must be an array" });
      }

      let assistantResponse;
      const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

      if (OPENAI_API_KEY) {
        const OpenAI = require("openai");
        const openai = new OpenAI({ apiKey: OPENAI_API_KEY });

        // Add appropriate system message for context
        let systemMessage;
        if (isQuestion) {
          systemMessage = {
            role: "system",
            content: "You are a helpful AI tutor for CBSE Class 12 students. A student has raised their hand to ask a question. Give a clear, concise, and accurate answer to help them understand the concept. Be friendly and encouraging."
          };
        } else {
          systemMessage = {
            role: "system",
            content: "You are a helpful AI tutor for CBSE Class 12 students. Explain concepts in a clear, engaging way using simple language and relevant examples. Break down complex topics into smaller parts. Use a friendly, encouraging tone."
          };
        }

        // Prepare the messages array with the system message
        const apiMessages = [systemMessage, ...messages];

        // Get response from OpenAI
        const response = await openai.chat.completions.create({
          model: "gpt-4o", // the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
          messages: apiMessages,
          temperature: 0.7,
          max_tokens: 800,
        });

        assistantResponse = {
          role: "assistant",
          content: response.choices[0].message.content,
        };
      } else {
        // Fallback if no API key is available
        assistantResponse = {
          role: "assistant",
          content: "I'm your AI tutor for CBSE Class 12. To enable my full capabilities, please provide an OpenAI API key in the environment variables.",
        };
      }

      // Store message in the database
      let savedMessage;
      if (sessionId) {
        savedMessage = await storage.createMessage({
          sessionId,
          role: "assistant",
          content: assistantResponse.content,
          audioUrl: null,
          attachmentUrl: null
        });
      }

      res.json({ message: assistantResponse, id: savedMessage?.id });
    } catch (error) {
      console.error("Error in /api/ai/chat:", error);
      res.status(500).json({ message: "Failed to get AI response" });
    }
  });

  // Text-to-speech API proxy
  app.post("/api/ai/tts", async (req, res) => {
    try {
      const { text } = req.body;
      
      if (!text) {
        return res.status(400).json({ message: "Text is required" });
      }

      const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

      if (OPENAI_API_KEY) {
        const OpenAI = require("openai");
        const openai = new OpenAI({ apiKey: OPENAI_API_KEY });
        const fs = require('fs');
        const path = require('path');

        // Create a directory for audio files if it doesn't exist
        const audioDir = path.join(process.cwd(), 'public', 'audio');
        if (!fs.existsSync(audioDir)) {
          fs.mkdirSync(audioDir, { recursive: true });
        }

        // Generate a unique filename
        const timestamp = Date.now();
        const filename = `speech_${timestamp}.mp3`;
        const filepath = path.join(audioDir, filename);

        // Request speech from OpenAI
        const mp3 = await openai.audio.speech.create({
          model: "tts-1",
          voice: "alloy", // or echo, fable, onyx, nova, shimmer
          input: text.substring(0, 4096), // Limit to 4096 characters (API limit)
        });

        // Convert the response to a Buffer
        const buffer = Buffer.from(await mp3.arrayBuffer());
        
        // Save the audio file
        fs.writeFileSync(filepath, buffer);

        // Return the URL to the audio file
        const audioUrl = `/audio/${filename}`;
        res.json({ success: true, audioUrl });
      } else {
        // Return a placeholder response if no API key
        res.json({ success: false, message: "OpenAI API key not provided", audioUrl: null });
      }
    } catch (error) {
      console.error("Error in /api/ai/tts:", error);
      res.status(500).json({ message: "Failed to convert text to speech" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
