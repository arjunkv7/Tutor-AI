import { pgTable, text, serial, integer, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Users table
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  name: text("name").notNull(),
  grade: text("grade"),
  section: text("section"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  name: true,
  grade: true,
  section: true,
});

// Subjects table
export const subjects = pgTable("subjects", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  icon: text("icon").notNull(),
  description: text("description"),
  syllabus: text("syllabus").notNull(), // CBSE 12
});

export const insertSubjectSchema = createInsertSchema(subjects).pick({
  name: true,
  icon: true,
  description: true,
  syllabus: true,
});

// Topics table
export const topics = pgTable("topics", {
  id: serial("id").primaryKey(),
  subjectId: integer("subject_id").notNull(),
  name: text("name").notNull(),
  description: text("description"),
  estimatedDuration: integer("estimated_duration"), // in minutes
});

export const insertTopicSchema = createInsertSchema(topics).pick({
  subjectId: true,
  name: true,
  description: true,
  estimatedDuration: true,
});

// Sessions table (tutoring sessions)
export const sessions = pgTable("sessions", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  subjectId: integer("subject_id").notNull(),
  topicId: integer("topic_id").notNull(),
  startTime: timestamp("start_time").defaultNow(),
  endTime: timestamp("end_time"),
  duration: integer("duration"), // in seconds
  completionPercentage: integer("completion_percentage").default(0),
  notes: text("notes"),
});

export const insertSessionSchema = createInsertSchema(sessions).pick({
  userId: true,
  subjectId: true,
  topicId: true,
});

// Messages table (conversation between student and AI tutor)
export const messages = pgTable("messages", {
  id: serial("id").primaryKey(),
  sessionId: integer("session_id").notNull(),
  role: text("role").notNull(), // 'user' or 'assistant'
  content: text("content").notNull(),
  timestamp: timestamp("timestamp").defaultNow(),
  audioUrl: text("audio_url"),
  attachmentUrl: text("attachment_url"),
});

export const insertMessageSchema = createInsertSchema(messages).pick({
  sessionId: true,
  role: true,
  content: true,
  audioUrl: true,
  attachmentUrl: true,
});

// Progress table (student progress tracking)
export const progress = pgTable("progress", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  subjectId: integer("subject_id").notNull(),
  topicId: integer("topic_id").notNull(),
  completionPercentage: integer("completion_percentage").default(0),
  lastStudied: timestamp("last_studied").defaultNow(),
  metrics: jsonb("metrics"), // store engagement metrics, understanding scores, etc.
});

export const insertProgressSchema = createInsertSchema(progress).pick({
  userId: true,
  subjectId: true,
  topicId: true,
  completionPercentage: true,
  metrics: true,
});

// Highlights/Bookmarks table
export const highlights = pgTable("highlights", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  sessionId: integer("session_id").notNull(),
  messageId: integer("message_id").notNull(),
  content: text("content").notNull(),
  timestamp: timestamp("timestamp").defaultNow(),
});

export const insertHighlightSchema = createInsertSchema(highlights).pick({
  userId: true,
  sessionId: true,
  messageId: true,
  content: true,
});

// Export types
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

export type Subject = typeof subjects.$inferSelect;
export type InsertSubject = z.infer<typeof insertSubjectSchema>;

export type Topic = typeof topics.$inferSelect;
export type InsertTopic = z.infer<typeof insertTopicSchema>;

export type Session = typeof sessions.$inferSelect;
export type InsertSession = z.infer<typeof insertSessionSchema>;

export type Message = typeof messages.$inferSelect;
export type InsertMessage = z.infer<typeof insertMessageSchema>;

export type Progress = typeof progress.$inferSelect;
export type InsertProgress = z.infer<typeof insertProgressSchema>;

export type Highlight = typeof highlights.$inferSelect;
export type InsertHighlight = z.infer<typeof insertHighlightSchema>;
