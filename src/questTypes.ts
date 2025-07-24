/**
 * @fileoverview Type definitions for the Rubber Ducking Adventure MCP Server.
 * This module contains all the core interfaces, enums, and type definitions
 * used throughout the adventure engine for quest management, bug classification,
 * and debugging progress tracking.
 */

/**
 * Enumeration of bug severity levels represented as fantasy creatures.
 * Each level represents different complexity and impact of debugging challenges.
 */
export enum BugSeverity {
  /** Minor bugs, typos, simple logic errors - quick to fix once spotted */
  GOBLIN = "goblin",
  /** Moderate bugs, integration issues - require some investigation */
  ORC = "orc",
  /** Complex bugs, performance issues - need systematic approach */
  TROLL = "troll",
  /** Critical bugs, system-breaking issues - highest priority and impact */
  DRAGON = "dragon",
  /** Multi-faceted bugs with multiple root causes - require holistic solutions */
  HYDRA = "hydra"
}

/**
 * Enumeration of quest types categorizing different kinds of debugging challenges.
 * Each type focuses on specific areas of software development and debugging.
 */
export enum QuestType {
  /** Logic and algorithmic bugs - problems with code flow and calculations */
  LOGIC_QUEST = "logic_quest",
  /** Performance and optimization issues - slow code, memory leaks, inefficiencies */
  PERFORMANCE_QUEST = "performance_quest",
  /** API and service integration problems - external service communication issues */
  INTEGRATION_QUEST = "integration_quest",
  /** User interface and styling challenges - visual and interaction problems */
  UI_QUEST = "ui_quest",
  /** Database and data handling issues - data corruption, query problems */
  DATA_QUEST = "data_quest",
  /** System design and architecture problems - structural and scalability issues */
  ARCHITECTURE_QUEST = "architecture_quest"
}

/**
 * Enumeration of quest phases representing the debugging journey progression.
 * Each phase has specific activities and guidance approaches.
 */
export enum QuestPhase {
  /** Gathering information and understanding the problem */
  PREPARATION = "preparation",
  /** Exploring and testing theories about the bug */
  INVESTIGATION = "investigation",
  /** Implementing and testing solutions */
  BATTLE = "battle",
  /** Solution found and verified - quest completed successfully */
  VICTORY = "victory"
}

/**
 * Represents a debugging quest with all its associated metadata and progress.
 * A quest tracks the entire debugging journey from start to completion.
 */
export interface Quest {
  /** Unique identifier for the quest */
  id: string;
  /** Human-readable title describing the quest adventure */
  title: string;
  /** Original description of the bug or issue */
  description: string;
  /** Severity level of the bug (goblin to hydra) */
  bugSeverity: BugSeverity;
  /** Type of quest based on the technical domain */
  questType: QuestType;
  /** Current phase of the debugging journey */
  phase: QuestPhase;
  /** Timestamp when the quest was initiated */
  startedAt: Date;
  /** Optional list of technologies involved in the bug */
  techStack?: string[];
  /** Collection of findings and discoveries made during debugging */
  findings: QuestFinding[];
  /** Major milestones achieved during the quest */
  milestones: QuestMilestone[];
}

/**
 * Represents a single finding or discovery made during a debugging quest.
 * Findings track progress and insights gathered throughout the debugging process.
 */
export interface QuestFinding {
  /** When this finding was discovered */
  timestamp: Date;
  /** Description of what was discovered, tried, or learned */
  finding: string;
  /** Importance level of this finding to the overall quest */
  significance: "minor" | "moderate" | "major" | "breakthrough";
}

/**
 * Represents a significant milestone achieved during a debugging quest.
 * Milestones mark important progress points and phase transitions.
 */
export interface QuestMilestone {
  /** When this milestone was achieved */
  timestamp: Date;
  /** Short title describing the milestone */
  title: string;
  /** Detailed description of what was accomplished */
  description: string;
  /** Quest phase when this milestone was reached */
  phase: QuestPhase;
}

/**
 * Represents the overall context and state of a debugging hero's adventure.
 * Tracks current quest, historical achievements, and progression metrics.
 */
export interface AdventureContext {
  /** Currently active debugging quest, if any */
  currentQuest?: Quest;
  /** History of all completed quests for progression tracking */
  completedQuests: Quest[];
  /** Total experience points earned from completed quests */
  totalExperience: number;
  /** Current hero level based on accumulated experience */
  heroLevel: number;
}

/**
 * Represents a response from the debugging mentor with guidance and encouragement.
 * Provides structured feedback to help guide the debugging process.
 */
export interface MentorResponse {
  /** Main message or feedback from the mentor */
  message: string;
  /** List of guiding questions to help with next steps */
  questions: string[];
  /** Encouraging message to maintain motivation */
  encouragement: string;
  /** Concrete suggestions for next actions to take */
  nextSuggestions: string[];
}
