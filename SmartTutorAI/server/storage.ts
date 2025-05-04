import { 
  User, InsertUser, 
  Subject, InsertSubject, 
  Topic, InsertTopic, 
  Session, InsertSession, 
  Message, InsertMessage, 
  Progress, InsertProgress, 
  Highlight, InsertHighlight 
} from "@shared/schema";

export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Subject operations
  getAllSubjects(): Promise<Subject[]>;
  getSubject(id: number): Promise<Subject | undefined>;
  createSubject(subject: InsertSubject): Promise<Subject>;

  // Topic operations
  getTopicsBySubject(subjectId: number): Promise<Topic[]>;
  getTopic(id: number): Promise<Topic | undefined>;
  createTopic(topic: InsertTopic): Promise<Topic>;

  // Session operations
  createSession(session: InsertSession): Promise<Session>;
  getSession(id: number): Promise<Session | undefined>;
  updateSession(id: number, data: Partial<Session>): Promise<Session | undefined>;
  getSessionsByUser(userId: number): Promise<Session[]>;
  getRecentSessions(userId: number, limit: number): Promise<Session[]>;

  // Message operations
  createMessage(message: InsertMessage): Promise<Message>;
  getMessagesBySession(sessionId: number): Promise<Message[]>;

  // Progress operations
  getProgressByUser(userId: number): Promise<Progress[]>;
  getProgressByUserAndSubject(userId: number, subjectId: number): Promise<Progress[]>;
  updateProgress(id: number, data: Partial<Progress>): Promise<Progress | undefined>;
  createOrUpdateProgress(progress: InsertProgress): Promise<Progress>;

  // Highlight operations
  createHighlight(highlight: InsertHighlight): Promise<Highlight>;
  getHighlightsByUser(userId: number): Promise<Highlight[]>;
  getHighlightsBySession(sessionId: number): Promise<Highlight[]>;
}

export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Subject operations
  getAllSubjects(): Promise<Subject[]>;
  getSubject(id: number): Promise<Subject | undefined>;
  createSubject(subject: InsertSubject): Promise<Subject>;

  // Topic operations
  getTopicsBySubject(subjectId: number): Promise<Topic[]>;
  getTopic(id: number): Promise<Topic | undefined>;
  createTopic(topic: InsertTopic): Promise<Topic>;

  // Session operations
  createSession(session: InsertSession): Promise<Session>;
  getSession(id: number): Promise<Session | undefined>;
  updateSession(id: number, data: Partial<Session>): Promise<Session | undefined>;
  getSessionsByUser(userId: number): Promise<Session[]>;
  getRecentSessions(userId: number, limit: number): Promise<Session[]>;

  // Message operations
  createMessage(message: InsertMessage): Promise<Message>;
  getMessage(id: number): Promise<Message | undefined>;
  updateMessage(id: number, data: Partial<Message>): Promise<Message | undefined>;
  getMessagesBySession(sessionId: number): Promise<Message[]>;

  // Progress operations
  getProgressByUser(userId: number): Promise<Progress[]>;
  getProgressByUserAndSubject(userId: number, subjectId: number): Promise<Progress[]>;
  updateProgress(id: number, data: Partial<Progress>): Promise<Progress | undefined>;
  createOrUpdateProgress(progress: InsertProgress): Promise<Progress>;

  // Highlight operations
  createHighlight(highlight: InsertHighlight): Promise<Highlight>;
  getHighlightsByUser(userId: number): Promise<Highlight[]>;
  getHighlightsBySession(sessionId: number): Promise<Highlight[]>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private subjects: Map<number, Subject>;
  private topics: Map<number, Topic>;
  private sessions: Map<number, Session>;
  private messages: Map<number, Message>;
  private progresses: Map<number, Progress>;
  private highlights: Map<number, Highlight>;

  private currentUserId: number;
  private currentSubjectId: number;
  private currentTopicId: number;
  private currentSessionId: number;
  private currentMessageId: number;
  private currentProgressId: number;
  private currentHighlightId: number;

  constructor() {
    this.users = new Map();
    this.subjects = new Map();
    this.topics = new Map();
    this.sessions = new Map();
    this.messages = new Map();
    this.progresses = new Map();
    this.highlights = new Map();

    this.currentUserId = 1;
    this.currentSubjectId = 1;
    this.currentTopicId = 1;
    this.currentSessionId = 1;
    this.currentMessageId = 1;
    this.currentProgressId = 1;
    this.currentHighlightId = 1;

    // Initialize with demo data
    this.initializeDemoData();
  }

  private initializeDemoData() {
    // Create a demo user
    const demoUser: InsertUser = {
      username: "demo_student",
      password: "password123", // In a real app, this would be hashed
      name: "Priya Sharma",
      grade: "12",
      section: "Science"
    };
    const user = this.createUser(demoUser);

    // Create subjects
    const subjects: InsertSubject[] = [
      { name: "Physics", icon: "flask", description: "Study of matter, energy, and the interaction between them", syllabus: "CBSE 12" },
      { name: "Chemistry", icon: "vial", description: "Study of substances, their properties, structure, and transformations", syllabus: "CBSE 12" },
      { name: "Mathematics", icon: "calculator", description: "Study of numbers, quantities, and shapes", syllabus: "CBSE 12" },
      { name: "Biology", icon: "dna", description: "Study of living organisms and their interactions", syllabus: "CBSE 12" },
      { name: "English", icon: "book", description: "Study of language and literature", syllabus: "CBSE 12" }
    ];

    const createdSubjects: Subject[] = [];
    for (const subject of subjects) {
      createdSubjects.push(this.createSubject(subject));
    }

    // Create topics for each subject
    const physicsTopics: InsertTopic[] = [
      { subjectId: 1, name: "Electrostatics", description: "Study of electric charges at rest", estimatedDuration: 45 },
      { subjectId: 1, name: "Current Electricity", description: "Study of electric charges in motion", estimatedDuration: 60 },
      { subjectId: 1, name: "Magnetic Effects", description: "Study of magnetic fields and their effects", estimatedDuration: 45 }
    ];

    const chemistryTopics: InsertTopic[] = [
      { subjectId: 2, name: "Solid State", description: "Study of solid crystalline forms", estimatedDuration: 40 },
      { subjectId: 2, name: "Solutions", description: "Study of homogeneous mixtures", estimatedDuration: 45 },
      { subjectId: 2, name: "Electrochemistry", description: "Study of electricity and chemical reactions", estimatedDuration: 50 },
      { subjectId: 2, name: "Chemical Kinetics", description: "Study of rates of chemical reactions", estimatedDuration: 55 }
    ];

    for (const topic of [...physicsTopics, ...chemistryTopics]) {
      this.createTopic(topic);
    }

    // Create some initial progress records
    const progress1: InsertProgress = {
      userId: user.id,
      subjectId: 1,
      topicId: 2,
      completionPercentage: 100,
      metrics: {
        questionsAsked: 5,
        timeSpent: 35,
        engagementScore: 85
      }
    };

    const progress2: InsertProgress = {
      userId: user.id,
      subjectId: 2,
      topicId: 2,
      completionPercentage: 75,
      metrics: {
        questionsAsked: 3,
        timeSpent: 25,
        engagementScore: 80
      }
    };

    this.createOrUpdateProgress(progress1);
    this.createOrUpdateProgress(progress2);

    // Create some sessions
    const session1: InsertSession = {
      userId: user.id,
      subjectId: 2,
      topicId: 2,
    };

    const session2: InsertSession = {
      userId: user.id,
      subjectId: 1,
      topicId: 2,
    };

    const createdSession1 = this.createSession(session1);
    const createdSession2 = this.createSession(session2);

    // Update session properties
    if (createdSession1) {
      this.updateSession(createdSession1.id, {
        duration: 35 * 60, // 35 minutes in seconds
        completionPercentage: 75,
        notes: "Notes about Solutions - Colligative Properties"
      });
    }

    if (createdSession2) {
      this.updateSession(createdSession2.id, {
        duration: 45 * 60, // 45 minutes in seconds
        completionPercentage: 100,
        notes: "Notes about Current Electricity - Ohm's Law"
      });
    }
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const createdAt = new Date();
    const user: User = { ...insertUser, id, createdAt };
    this.users.set(id, user);
    return user;
  }

  async getAllSubjects(): Promise<Subject[]> {
    return Array.from(this.subjects.values());
  }

  async getSubject(id: number): Promise<Subject | undefined> {
    return this.subjects.get(id);
  }

  async createSubject(insertSubject: InsertSubject): Promise<Subject> {
    const id = this.currentSubjectId++;
    const subject: Subject = { ...insertSubject, id };
    this.subjects.set(id, subject);
    return subject;
  }

  async getTopicsBySubject(subjectId: number): Promise<Topic[]> {
    return Array.from(this.topics.values()).filter(
      (topic) => topic.subjectId === subjectId
    );
  }

  async getTopic(id: number): Promise<Topic | undefined> {
    return this.topics.get(id);
  }

  async createTopic(insertTopic: InsertTopic): Promise<Topic> {
    const id = this.currentTopicId++;
    const topic: Topic = { ...insertTopic, id };
    this.topics.set(id, topic);
    return topic;
  }

  async createSession(insertSession: InsertSession): Promise<Session> {
    const id = this.currentSessionId++;
    const startTime = new Date();
    const session: Session = { 
      ...insertSession, 
      id, 
      startTime, 
      endTime: null, 
      duration: null, 
      completionPercentage: 0, 
      notes: null 
    };
    this.sessions.set(id, session);
    return session;
  }

  async getSession(id: number): Promise<Session | undefined> {
    return this.sessions.get(id);
  }

  async updateSession(id: number, data: Partial<Session>): Promise<Session | undefined> {
    const session = this.sessions.get(id);
    if (!session) return undefined;
    
    const updatedSession = { ...session, ...data };
    this.sessions.set(id, updatedSession);
    return updatedSession;
  }

  async getSessionsByUser(userId: number): Promise<Session[]> {
    return Array.from(this.sessions.values()).filter(
      (session) => session.userId === userId
    );
  }

  async getRecentSessions(userId: number, limit: number): Promise<Session[]> {
    return Array.from(this.sessions.values())
      .filter((session) => session.userId === userId)
      .sort((a, b) => {
        const aDate = a.startTime ? new Date(a.startTime).getTime() : 0;
        const bDate = b.startTime ? new Date(b.startTime).getTime() : 0;
        return bDate - aDate; // Descending order (most recent first)
      })
      .slice(0, limit);
  }

  async createMessage(insertMessage: InsertMessage): Promise<Message> {
    const id = this.currentMessageId++;
    const timestamp = new Date();
    const message: Message = { ...insertMessage, id, timestamp };
    this.messages.set(id, message);
    return message;
  }

  async getMessage(id: number): Promise<Message | undefined> {
    return this.messages.get(id);
  }

  async updateMessage(id: number, data: Partial<Message>): Promise<Message | undefined> {
    const message = this.messages.get(id);
    if (!message) return undefined;

    const updatedMessage = { ...message, ...data };
    this.messages.set(id, updatedMessage);
    
    return updatedMessage;
  }

  async getMessagesBySession(sessionId: number): Promise<Message[]> {
    return Array.from(this.messages.values())
      .filter((message) => message.sessionId === sessionId)
      .sort((a, b) => {
        const aDate = a.timestamp ? new Date(a.timestamp).getTime() : 0;
        const bDate = b.timestamp ? new Date(b.timestamp).getTime() : 0;
        return aDate - bDate; // Ascending order (oldest first)
      });
  }

  async getProgressByUser(userId: number): Promise<Progress[]> {
    return Array.from(this.progresses.values()).filter(
      (progress) => progress.userId === userId
    );
  }

  async getProgressByUserAndSubject(userId: number, subjectId: number): Promise<Progress[]> {
    return Array.from(this.progresses.values()).filter(
      (progress) => progress.userId === userId && progress.subjectId === subjectId
    );
  }

  async updateProgress(id: number, data: Partial<Progress>): Promise<Progress | undefined> {
    const progress = this.progresses.get(id);
    if (!progress) return undefined;
    
    const updatedProgress = { ...progress, ...data };
    this.progresses.set(id, updatedProgress);
    return updatedProgress;
  }

  async createOrUpdateProgress(insertProgress: InsertProgress): Promise<Progress> {
    // Check if progress for this user, subject, and topic already exists
    const existingProgress = Array.from(this.progresses.values()).find(
      (p) => 
        p.userId === insertProgress.userId && 
        p.subjectId === insertProgress.subjectId && 
        p.topicId === insertProgress.topicId
    );

    if (existingProgress) {
      const lastStudied = new Date();
      const updatedProgress: Progress = { 
        ...existingProgress, 
        ...insertProgress, 
        lastStudied 
      };
      this.progresses.set(existingProgress.id, updatedProgress);
      return updatedProgress;
    } else {
      const id = this.currentProgressId++;
      const lastStudied = new Date();
      const progress: Progress = { ...insertProgress, id, lastStudied };
      this.progresses.set(id, progress);
      return progress;
    }
  }

  async createHighlight(insertHighlight: InsertHighlight): Promise<Highlight> {
    const id = this.currentHighlightId++;
    const timestamp = new Date();
    const highlight: Highlight = { ...insertHighlight, id, timestamp };
    this.highlights.set(id, highlight);
    return highlight;
  }

  async getHighlightsByUser(userId: number): Promise<Highlight[]> {
    return Array.from(this.highlights.values()).filter(
      (highlight) => highlight.userId === userId
    );
  }

  async getHighlightsBySession(sessionId: number): Promise<Highlight[]> {
    return Array.from(this.highlights.values()).filter(
      (highlight) => highlight.sessionId === sessionId
    );
  }
}

export const storage = new MemStorage();
