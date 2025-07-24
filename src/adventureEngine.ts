/**
 * @fileoverview Core adventure engine for the Rubber Ducking Adventure MCP Server.
 * This module contains the main logic for managing debugging quests, classifying bugs,
 * tracking progress, and providing guidance throughout the debugging journey.
 */

import { 
  Quest, 
  QuestType, 
  BugSeverity, 
  QuestPhase, 
  AdventureContext, 
  QuestFinding, 
  QuestMilestone,
  MentorResponse 
} from './questTypes.js';
import { 
  getRandomResponse, 
  getQuestQuestions, 
  getEncouragement, 
  getGreeting, 
  getMilestoneAcknowledgment, 
  getVictoryMessage 
} from './mentorResponses.js';

/**
 * Core engine that manages the debugging adventure experience.
 * Handles quest lifecycle, bug classification, progress tracking, and mentor guidance.
 * Maintains state for the debugging hero's journey and provides contextual responses.
 */
export class AdventureEngine {
  /** The current adventure context containing hero progress and active quest */
  private context: AdventureContext;

  /**
   * Creates a new adventure engine with initial hero state.
   * Initializes with no active quest and level 1 hero status.
   */
  constructor() {
    this.context = {
      completedQuests: [],
      totalExperience: 0,
      heroLevel: 1
    };
  }

  /**
   * Analyzes a bug description to determine its severity level.
   * Uses keyword analysis and urgency indicators to classify bugs as different fantasy creatures.
   * 
   * @param description - The bug description provided by the user
   * @param urgency - Optional urgency level (low, moderate, high, critical)
   * @returns The classified bug severity as a fantasy creature
   */
  public classifyBugSeverity(description: string, urgency?: string): BugSeverity {
    const lowercaseDesc = description.toLowerCase();
    const lowercaseUrgency = urgency?.toLowerCase() || '';

    // Check for critical indicators
    if (lowercaseDesc.includes('crash') || lowercaseDesc.includes('down') || 
        lowercaseDesc.includes('critical') || lowercaseUrgency.includes('critical') ||
        lowercaseDesc.includes('production') || lowercaseDesc.includes('outage')) {
      return BugSeverity.DRAGON;
    }

    // Check for complex/multi-faceted issues
    if (lowercaseDesc.includes('multiple') || lowercaseDesc.includes('several') ||
        lowercaseDesc.includes('various') || lowercaseDesc.includes('complex') ||
        (lowercaseDesc.match(/and/g) || []).length > 2) {
      return BugSeverity.HYDRA;
    }

    // Check for performance or integration issues
    if (lowercaseDesc.includes('slow') || lowercaseDesc.includes('performance') ||
        lowercaseDesc.includes('timeout') || lowercaseDesc.includes('integration') ||
        lowercaseDesc.includes('api') || lowercaseDesc.includes('database')) {
      return BugSeverity.TROLL;
    }

    // Check for moderate issues
    if (lowercaseDesc.includes('feature') || lowercaseDesc.includes('logic') ||
        lowercaseDesc.includes('unexpected') || lowercaseUrgency.includes('moderate')) {
      return BugSeverity.ORC;
    }

    // Default to goblin for simple issues
    return BugSeverity.GOBLIN;
  }

  /**
   * Analyzes a bug description and tech stack to determine the quest type.
   * Categorizes the debugging challenge into specific domains for targeted guidance.
   * 
   * @param description - The bug description provided by the user
   * @param techStack - Optional array of technologies involved
   * @returns The classified quest type based on the technical domain
   */
  public classifyQuestType(description: string, techStack?: string[]): QuestType {
    const lowercaseDesc = description.toLowerCase();
    const stackString = techStack?.join(' ').toLowerCase() || '';

    if (lowercaseDesc.includes('ui') || lowercaseDesc.includes('css') || 
        lowercaseDesc.includes('layout') || lowercaseDesc.includes('styling') ||
        lowercaseDesc.includes('responsive') || lowercaseDesc.includes('display')) {
      return QuestType.UI_QUEST;
    }

    if (lowercaseDesc.includes('performance') || lowercaseDesc.includes('slow') ||
        lowercaseDesc.includes('optimization') || lowercaseDesc.includes('memory') ||
        lowercaseDesc.includes('speed') || lowercaseDesc.includes('timeout')) {
      return QuestType.PERFORMANCE_QUEST;
    }

    if (lowercaseDesc.includes('api') || lowercaseDesc.includes('integration') ||
        lowercaseDesc.includes('service') || lowercaseDesc.includes('external') ||
        lowercaseDesc.includes('webhook') || lowercaseDesc.includes('third-party')) {
      return QuestType.INTEGRATION_QUEST;
    }

    if (lowercaseDesc.includes('database') || lowercaseDesc.includes('data') ||
        lowercaseDesc.includes('query') || lowercaseDesc.includes('storage') ||
        lowercaseDesc.includes('migration') || lowercaseDesc.includes('sql')) {
      return QuestType.DATA_QUEST;
    }

    if (lowercaseDesc.includes('architecture') || lowercaseDesc.includes('design') ||
        lowercaseDesc.includes('structure') || lowercaseDesc.includes('refactor') ||
        lowercaseDesc.includes('scalability') || lowercaseDesc.includes('maintainability')) {
      return QuestType.ARCHITECTURE_QUEST;
    }

    return QuestType.LOGIC_QUEST;
  }

  /**
   * Initiates a new debugging quest based on the provided bug description.
   * Creates a new quest with appropriate classification, title, and initial guidance.
   * 
   * @param description - Description of the bug or issue to debug
   * @param techStack - Optional array of technologies involved in the issue
   * @param urgency - Optional urgency level for prioritization
   * @returns Object containing the created quest and initial mentor response
   */
  public startQuest(
    description: string, 
    techStack?: string[], 
    urgency?: string
  ): { quest: Quest; response: MentorResponse } {
    const bugSeverity = this.classifyBugSeverity(description, urgency);
    const questType = this.classifyQuestType(description, techStack);
    
    const quest: Quest = {
      id: this.generateQuestId(),
      title: this.generateQuestTitle(bugSeverity, questType),
      description,
      bugSeverity,
      questType,
      phase: QuestPhase.PREPARATION,
      startedAt: new Date(),
      techStack,
      findings: [],
      milestones: []
    };

    this.context.currentQuest = quest;

    const questions = getQuestQuestions(questType, QuestPhase.PREPARATION);
    const encouragement = getEncouragement(bugSeverity);
    
    const response: MentorResponse = {
      message: `${getGreeting()}\n\n📜 **${quest.title}**\n\n${description}\n\n${this.getBugDescription(bugSeverity)} awaits your investigation!`,
      questions: questions.slice(0, 3), // Limit to 3 initial questions
      encouragement,
      nextSuggestions: [
        "Gather more information about when and how the issue occurs",
        "Identify what changed recently that might have caused this",
        "Create a minimal reproduction case if possible"
      ]
    };

    return { quest, response };
  }

  /**
   * Continues an active quest by adding a new finding and providing guidance.
   * Updates quest progress and potentially advances to the next phase.
   * 
   * @param finding - Description of what was discovered, tried, or learned
   * @param significance - Importance level of the finding (minor to breakthrough)
   * @returns Mentor response with guidance for the next steps
   */
  public continueQuest(
    finding: string, 
    significance: 'minor' | 'moderate' | 'major' | 'breakthrough' = 'moderate'
  ): MentorResponse {
    if (!this.context.currentQuest) {
      return {
        message: "No active quest found! Use 'start_quest' to begin your debugging adventure.",
        questions: [],
        encouragement: "Ready to embark on a new debugging quest?",
        nextSuggestions: ["Start a new quest to begin your debugging journey"]
      };
    }

    const quest = this.context.currentQuest;
    
    // Add the finding
    const questFinding: QuestFinding = {
      timestamp: new Date(),
      finding,
      significance
    };
    quest.findings.push(questFinding);

    // Check if we should advance the quest phase
    this.updateQuestPhase(quest);

    const questions = getQuestQuestions(quest.questType, quest.phase);
    const acknowledgment = significance === 'breakthrough' ? 
      getMilestoneAcknowledgment() : 
      "Interesting discovery! This information helps build our understanding.";

    const nextSuggestions = this.getNextSuggestions(quest);

    return {
      message: `${acknowledgment}\n\n**Your Finding:** ${finding}\n\n**Current Phase:** ${this.getPhaseDescription(quest.phase)}`,
      questions: questions.slice(0, 3),
      encouragement: getEncouragement(quest.bugSeverity),
      nextSuggestions
    };
  }

  /**
   * Retrieves comprehensive status information about the current quest and hero progress.
   * Provides detailed information about quest progress, findings, and hero statistics.
   * 
   * @returns Formatted string containing current quest status and hero information
   */
  public getQuestStatus(): string {
    if (!this.context.currentQuest) {
      return "🏰 No active quest. Ready to face a new debugging challenge?";
    }

    const quest = this.context.currentQuest;
    const timeElapsed = Math.floor((Date.now() - quest.startedAt.getTime()) / (1000 * 60));
    
    return `🗡️ **${quest.title}**
    
**Beast Type:** ${this.getBugDescription(quest.bugSeverity)}
**Quest Type:** ${this.getQuestTypeDescription(quest.questType)}  
**Phase:** ${this.getPhaseDescription(quest.phase)}
**Time Elapsed:** ${timeElapsed} minutes
**Findings Collected:** ${quest.findings.length}
**Milestones Achieved:** ${quest.milestones.length}

**Recent Findings:**
${quest.findings.slice(-3).map(f => `• ${f.finding}`).join('\n')}

**Hero Level:** ${this.context.heroLevel} 
**Total Experience:** ${this.context.totalExperience} XP
**Completed Quests:** ${this.context.completedQuests.length}`;
  }

  /**
   * Provides specific guidance and wisdom based on the type of help requested.
   * Offers targeted advice for different aspects of the debugging process.
   * 
   * @param helpType - Type of guidance needed (approach, testing, investigation, etc.)
   * @returns Mentor response with specific guidance for the requested help type
   */
  public seekWisdom(helpType: string): MentorResponse {
    if (!this.context.currentQuest) {
      return {
        message: "Start a quest first, brave hero! I can only provide guidance when you have an active debugging challenge.",
        questions: [],
        encouragement: "Every great adventure begins with a single step!",
        nextSuggestions: ["Begin a new debugging quest"]
      };
    }

    const quest = this.context.currentQuest;
    const helpTypeLower = helpType.toLowerCase();

    let questions: string[] = [];
    let message = "";

    if (helpTypeLower.includes('approach') || helpTypeLower.includes('strategy')) {
      message = "🧙‍♂️ **Strategic Wisdom**\n\nWhen facing complex bugs, remember the hero's methodology:";
      questions = [
        "Have you clearly defined what 'success' looks like for solving this issue?",
        "What's the simplest way you could reproduce this problem?",
        "If you had to explain this bug to someone else, what would you say?",
        "What assumptions are you making that might not be true?"
      ];
    } else if (helpTypeLower.includes('test') || helpTypeLower.includes('verify')) {
      message = "🔍 **Testing Wisdom**\n\nEvery good hero tests their theories before charging into battle:";
      questions = [
        "What's the smallest change you could make to test your hypothesis?",
        "How can you isolate this issue from other potential problems?",
        "What would happen if you removed or simplified the problematic code?",
        "How can you verify that your solution actually fixes the root cause?"
      ];
    } else if (helpTypeLower.includes('investigate') || helpTypeLower.includes('explore')) {
      message = "🔎 **Investigation Wisdom**\n\nTrue heroes gather intelligence before striking:";
      questions = [
        "What clues does your development environment provide (logs, debugger, etc.)?",
        "When did this problem first appear? What changed around that time?",
        "Are there similar patterns elsewhere in your codebase?",
        "What would someone unfamiliar with this code need to understand the issue?"
      ];
    } else {
      message = "🎯 **General Wisdom**\n\nRemember the fundamental principles of debugging:";
      questions = getQuestQuestions(quest.questType, quest.phase).slice(0, 3);
    }

    return {
      message,
      questions,
      encouragement: getEncouragement(quest.bugSeverity),
      nextSuggestions: this.getNextSuggestions(quest)
    };
  }

  /**
   * Completes the current quest and celebrates the victory.
   * Awards experience points, checks for level ups, and provides reflection opportunities.
   * 
   * @param solutionSummary - Optional summary of how the bug was solved
   * @returns Mentor response celebrating the victory and providing reflection questions
   */
  public completeQuest(solutionSummary?: string): MentorResponse {
    if (!this.context.currentQuest) {
      return {
        message: "No active quest to complete! Start a new adventure when you're ready.",
        questions: [],
        encouragement: "Every master was once a beginner!",
        nextSuggestions: ["Begin a new debugging quest"]
      };
    }

    const quest = this.context.currentQuest;
    quest.phase = QuestPhase.VICTORY;
    
    // Add completion milestone
    const victoryMilestone: QuestMilestone = {
      timestamp: new Date(),
      title: "Quest Completed!",
      description: solutionSummary || "Hero successfully vanquished the bug!",
      phase: QuestPhase.VICTORY
    };
    quest.milestones.push(victoryMilestone);

    // Calculate experience points
    const experienceGained = this.calculateExperience(quest);
    this.context.totalExperience += experienceGained;
    
    // Check for level up
    const newLevel = Math.floor(this.context.totalExperience / 100) + 1;
    const leveledUp = newLevel > this.context.heroLevel;
    this.context.heroLevel = newLevel;

    // Move quest to completed
    this.context.completedQuests.push(quest);
    this.context.currentQuest = undefined;

    const victoryMessage = getVictoryMessage();
    const levelUpMessage = leveledUp ? `\n\n🌟 **LEVEL UP!** You are now a Level ${this.context.heroLevel} Debug Hero!` : '';

    return {
      message: `${victoryMessage}${levelUpMessage}\n\n**Quest Summary:** ${quest.title}\n**Solution:** ${solutionSummary || 'Bug successfully eliminated!'}\n**Experience Gained:** ${experienceGained} XP\n**Time Taken:** ${Math.floor((Date.now() - quest.startedAt.getTime()) / (1000 * 60))} minutes`,
      questions: [
        "What did you learn from this quest that you'll apply to future challenges?",
        "How might you prevent similar bugs from appearing in the future?",
        "What debugging techniques proved most effective for this type of issue?"
      ],
      encouragement: "Your growing expertise makes the digital realm safer for all!",
      nextSuggestions: [
        "Document your solution for future reference",
        "Share your knowledge with fellow developers",
        "Stay vigilant for new debugging challenges"
      ]
    };
  }

  /**
   * Generates a unique identifier for a new quest.
   * Combines timestamp and random string for uniqueness.
   * 
   * @returns A unique quest identifier string
   */
  private generateQuestId(): string {
    return `quest_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Generates an adventure-themed title for a quest based on bug severity and quest type.
   * Combines fantasy creature names with domain-specific adventure themes.
   * 
   * @param severity - The severity level of the bug (determines creature type)
   * @param type - The quest type (determines adventure domain)
   * @returns A formatted quest title in adventure theme
   */
  private generateQuestTitle(severity: BugSeverity, type: QuestType): string {
    const severityTitles = {
      [BugSeverity.GOBLIN]: "The Goblin Incident",
      [BugSeverity.ORC]: "The Orc Uprising", 
      [BugSeverity.TROLL]: "The Troll's Challenge",
      [BugSeverity.DRAGON]: "The Dragon's Curse",
      [BugSeverity.HYDRA]: "The Hydra's Many Heads"
    };

    const typeTitles = {
      [QuestType.LOGIC_QUEST]: "Logic Labyrinth",
      [QuestType.PERFORMANCE_QUEST]: "Performance Peril",
      [QuestType.INTEGRATION_QUEST]: "Integration Invasion",
      [QuestType.UI_QUEST]: "Interface Intrigue", 
      [QuestType.DATA_QUEST]: "Data Dungeon",
      [QuestType.ARCHITECTURE_QUEST]: "Architecture Awakening"
    };

    return `${severityTitles[severity]} in the ${typeTitles[type]}`;
  }

  private getBugDescription(severity: BugSeverity): string {
    const descriptions = {
      [BugSeverity.GOBLIN]: "A mischievous goblin 🧌",
      [BugSeverity.ORC]: "A cunning orc warrior ⚔️",
      [BugSeverity.TROLL]: "A formidable troll 👹", 
      [BugSeverity.DRAGON]: "A mighty dragon 🐉",
      [BugSeverity.HYDRA]: "The dreaded multi-headed hydra 🐍"
    };
    return descriptions[severity];
  }

  private getQuestTypeDescription(type: QuestType): string {
    const descriptions = {
      [QuestType.LOGIC_QUEST]: "Logic & Algorithms",
      [QuestType.PERFORMANCE_QUEST]: "Performance & Optimization",
      [QuestType.INTEGRATION_QUEST]: "API & Integration", 
      [QuestType.UI_QUEST]: "User Interface",
      [QuestType.DATA_QUEST]: "Data & Storage",
      [QuestType.ARCHITECTURE_QUEST]: "System Architecture"
    };
    return descriptions[type];
  }

  private getPhaseDescription(phase: QuestPhase): string {
    const descriptions = {
      [QuestPhase.PREPARATION]: "🛡️ Preparation - Gathering intelligence and understanding the challenge",
      [QuestPhase.INVESTIGATION]: "🔍 Investigation - Exploring theories and testing hypotheses", 
      [QuestPhase.BATTLE]: "⚔️ Battle - Implementing and refining solutions",
      [QuestPhase.VICTORY]: "🏆 Victory - Challenge conquered!"
    };
    return descriptions[phase];
  }

  private updateQuestPhase(quest: Quest): void {
    const findingCount = quest.findings.length;
    const hasBreakthrough = quest.findings.some(f => f.significance === 'breakthrough');

    if (quest.phase === QuestPhase.PREPARATION && findingCount >= 3) {
      quest.phase = QuestPhase.INVESTIGATION;
      this.addMilestone(quest, "Investigation Phase", "Gathered enough information to begin deeper investigation");
    } else if (quest.phase === QuestPhase.INVESTIGATION && (hasBreakthrough || findingCount >= 6)) {
      quest.phase = QuestPhase.BATTLE;
      this.addMilestone(quest, "Battle Phase", "Ready to implement and test solutions");
    }
  }

  private addMilestone(quest: Quest, title: string, description: string): void {
    const milestone: QuestMilestone = {
      timestamp: new Date(),
      title,
      description,
      phase: quest.phase
    };
    quest.milestones.push(milestone);
  }

  private getNextSuggestions(quest: Quest): string[] {
    const baseSuggestions = {
      [QuestPhase.PREPARATION]: [
        "Gather more details about the problem",
        "Create a minimal reproduction case",
        "Check what changed recently"
      ],
      [QuestPhase.INVESTIGATION]: [
        "Test your hypotheses systematically", 
        "Add debugging information to see what's happening",
        "Try isolating the problem area"
      ],
      [QuestPhase.BATTLE]: [
        "Implement a focused solution",
        "Test your fix thoroughly",
        "Consider edge cases and potential side effects"
      ],
      [QuestPhase.VICTORY]: [
        "Document your solution",
        "Add tests to prevent regression", 
        "Share your learnings with the team"
      ]
    };

    return baseSuggestions[quest.phase] || [];
  }

  private calculateExperience(quest: Quest): number {
    const baseXP = {
      [BugSeverity.GOBLIN]: 10,
      [BugSeverity.ORC]: 25,
      [BugSeverity.TROLL]: 50,
      [BugSeverity.DRAGON]: 100,
      [BugSeverity.HYDRA]: 150
    };

    const findingsBonus = quest.findings.length * 2;
    const milestonesBonus = quest.milestones.length * 5;
    
    return baseXP[quest.bugSeverity] + findingsBonus + milestonesBonus;
  }
}
