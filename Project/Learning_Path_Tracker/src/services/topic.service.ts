// ─────────────────────────────────────────────
// topic.service.ts
// This is the central data service — like an Angular @Injectable service.
// It handles all CRUD operations: Create, Read, Update, Delete.
// Data is stored in localStorage so it persists after page refresh.
// ─────────────────────────────────────────────

import { Topic, ProgressStatus, PriorityLevel } from '../models/topic.model';

// Key used to store data in the browser's localStorage
const STORAGE_KEY = 'learning_path_topics';

// ── Seed / default topics shown on first load ──
const DEFAULT_TOPICS: Topic[] = [
  {
    id: '1',
    title: 'Angular Fundamentals',
    description: 'Learn components, modules, routing, and services in Angular.',
    status: 'In Progress',
    priority: 'High',
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    title: 'TypeScript Basics',
    description: 'Understand types, interfaces, generics, and decorators.',
    status: 'Completed',
    priority: 'High',
    createdAt: new Date().toISOString(),
  },
  {
    id: '3',
    title: 'Cloud Computing (AWS)',
    description: 'Explore EC2, S3, Lambda, and cloud architecture concepts.',
    status: 'Not Started',
    priority: 'Medium',
    createdAt: new Date().toISOString(),
  },
  {
    id: '4',
    title: 'Machine Learning with Python',
    description: 'Study supervised learning, neural networks, and model evaluation.',
    status: 'Not Started',
    priority: 'Low',
    createdAt: new Date().toISOString(),
  },
];

// ── Helper: Load topics from localStorage ──
function loadFromStorage(): Topic[] {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    return JSON.parse(stored) as Topic[];
  }
  // First visit — save defaults and return them
  saveToStorage(DEFAULT_TOPICS);
  return DEFAULT_TOPICS;
}

// ── Helper: Save topics array to localStorage ──
function saveToStorage(topics: Topic[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(topics));
}

// ── Helper: Generate a simple unique ID ──
function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2);
}

// ─────────────────────────────────────────────
// TopicService — exported object (singleton pattern)
// In Angular, this would be a class with @Injectable({ providedIn: 'root' })
// ─────────────────────────────────────────────
export const TopicService = {

  // READ — Get all topics from storage
  getAllTopics(): Topic[] {
    return loadFromStorage();
  },

  // READ — Get a single topic by its ID
  getTopicById(id: string): Topic | undefined {
    const topics = loadFromStorage();
    return topics.find((t) => t.id === id);
  },

  // CREATE — Add a new topic
  addTopic(data: {
    title: string;
    description: string;
    status: ProgressStatus;
    priority: PriorityLevel;
  }): Topic {
    const topics = loadFromStorage();

    // Build the new topic object
    const newTopic: Topic = {
      id: generateId(),
      title: data.title.trim(),
      description: data.description.trim(),
      status: data.status,
      priority: data.priority,
      createdAt: new Date().toISOString(),
    };

    topics.push(newTopic);
    saveToStorage(topics);
    return newTopic;
  },

  // UPDATE — Modify an existing topic by ID
  updateTopic(id: string, data: Partial<Omit<Topic, 'id' | 'createdAt'>>): Topic | null {
    const topics = loadFromStorage();
    const index = topics.findIndex((t) => t.id === id);

    if (index === -1) return null; // Topic not found

    // Merge the old topic with the updated fields
    topics[index] = { ...topics[index], ...data };
    saveToStorage(topics);
    return topics[index];
  },

  // DELETE — Remove a topic by ID
  deleteTopic(id: string): boolean {
    const topics = loadFromStorage();
    const filtered = topics.filter((t) => t.id !== id);

    if (filtered.length === topics.length) return false; // Nothing removed

    saveToStorage(filtered);
    return true;
  },

  // UTILITY — Get counts grouped by status (used on Dashboard)
  getStatusCounts(): Record<ProgressStatus, number> {
    const topics = loadFromStorage();
    return {
      'Not Started': topics.filter((t) => t.status === 'Not Started').length,
      'In Progress': topics.filter((t) => t.status === 'In Progress').length,
      'Completed':   topics.filter((t) => t.status === 'Completed').length,
    };
  },

  // UTILITY — Calculate overall completion percentage
  getCompletionPercentage(): number {
    const topics = loadFromStorage();
    if (topics.length === 0) return 0;
    const done = topics.filter((t) => t.status === 'Completed').length;
    return Math.round((done / topics.length) * 100);
  },
};
