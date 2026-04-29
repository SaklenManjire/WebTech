// ─────────────────────────────────────────────
// topic.model.ts
// Defines the shape of a "Topic" object.
// In Angular, this would be a TypeScript interface used across the app.
// ─────────────────────────────────────────────

// Allowed values for progress status
export type ProgressStatus = 'Not Started' | 'In Progress' | 'Completed';

// Allowed values for priority
export type PriorityLevel = 'Low' | 'Medium' | 'High';

// Main Topic interface — every topic object must follow this structure
export interface Topic {
  id: string;              // Unique identifier (generated automatically)
  title: string;           // Name of the learning topic (e.g., "Angular")
  description: string;     // Short description of what it covers
  status: ProgressStatus;  // Current progress status
  priority: PriorityLevel; // How urgent/important this topic is
  createdAt: string;       // Date when the topic was added
}
