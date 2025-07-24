/**
 * @fileoverview Mentor response templates and generators for the Rubber Ducking Adventure MCP Server.
 * This module contains all the pre-written responses, questions, and encouragements
 * that the debugging mentor uses to guide heroes through their quests.
 */

import { BugSeverity, QuestType, QuestPhase } from './questTypes.js';

/**
 * Template structure for organizing all mentor responses by category.
 * Provides a comprehensive collection of responses for different situations.
 */
interface ResponseTemplate {
  /** Opening greetings for starting conversations */
  greetings: string[];
  /** Phase-specific questions organized by quest type and phase */
  questions: {
    [key in QuestType]: {
      [key in QuestPhase]: string[];
    };
  };
  /** Encouraging messages tailored to different bug severities */
  encouragements: {
    [key in BugSeverity]: string[];
  };
  /** Acknowledgments for significant discoveries and milestones */
  milestoneAcknowledgments: string[];
  /** Victory celebration messages for completed quests */
  victoryMessages: string[];
}

/**
 * Comprehensive collection of mentor responses, questions, and encouragements.
 * Organized by bug severity, quest type, and quest phase to provide contextually
 * appropriate guidance throughout the debugging adventure.
 */
export const MENTOR_RESPONSES: ResponseTemplate = {
  greetings: [
    "Greetings, brave code warrior! I sense a disturbance in the digital realm...",
    "Welcome back, noble developer! What villainous bug dares to challenge you today?",
    "Ah, another hero seeks wisdom in the art of bug slaying! Tell me of your quest...",
    "The ancient scrolls whisper of your coding prowess. What mystery brings you here?",
    "Hail and well met! I see the determination in your eyes. What beast shall we hunt?"
  ],
  
  questions: {
    [QuestType.LOGIC_QUEST]: {
      [QuestPhase.PREPARATION]: [
        "What incantation (code) were you weaving when this logic goblin first appeared?",
        "Can you describe the expected behavior versus what this mischievous spirit is actually doing?",
        "What inputs are you feeding to this spell, and what outputs do you receive?",
        "Have you tried tracing through your logic step by step, like following footprints in the forest?"
      ],
      [QuestPhase.INVESTIGATION]: [
        "What happens if you test each condition in isolation, like examining each ingredient of a potion?",
        "Can you add some debugging runes (console logs) to see where the logic goes astray?",
        "What would happen if you walked through this code with different test cases?",
        "Are there any assumptions in your code that might not hold true in all scenarios?"
      ],
      [QuestPhase.BATTLE]: [
        "How might you restructure this logic to make it more transparent and less prone to trickery?",
        "What edge cases might your current approach be missing?",
        "Could breaking this complex spell into smaller, simpler enchantments help?",
        "How can you verify that your solution handles all the scenarios you've discovered?"
      ],
      [QuestPhase.VICTORY]: [
        "Excellent! How does your solution handle the edge cases you discovered?",
        "What did you learn about this type of logic that you'll carry into future quests?",
        "How might you prevent similar logic goblins from appearing in the future?"
      ]
    },
    
    [QuestType.PERFORMANCE_QUEST]: {
      [QuestPhase.PREPARATION]: [
        "Where in your kingdom (application) have you noticed the performance dragon stirring?",
        "What actions or spells seem to awaken this sluggish beast?",
        "Have you measured the dragon's size? What metrics show the performance impact?",
        "When did you first notice this performance curse affecting your realm?"
      ],
      [QuestPhase.INVESTIGATION]: [
        "What happens when you profile your code? Where do the performance bottlenecks lurk?",
        "Could there be unnecessary work being done, like casting the same spell repeatedly?",
        "Are you loading more data than needed, like carrying too much treasure in your pack?",
        "What tools can help you see where time is being spent in your application?"
      ],
      [QuestPhase.BATTLE]: [
        "How might you optimize the most expensive operations you've identified?",
        "Could caching or memoization help you avoid repeating costly computations?",
        "Are there more efficient algorithms or data structures you could employ?",
        "What trade-offs are you willing to make between performance and other qualities?"
      ],
      [QuestPhase.VICTORY]: [
        "Magnificent! How much faster is your optimized solution?",
        "What performance monitoring will you put in place to catch future dragons early?",
        "What performance lessons will you apply to prevent similar issues?"
      ]
    },
    
    [QuestType.INTEGRATION_QUEST]: {
      [QuestPhase.PREPARATION]: [
        "Which external realm (API/service) is refusing to cooperate with your kingdom?",
        "What message exchanges are failing between your systems?",
        "Are you receiving error scrolls (status codes/error messages) from the other realm?",
        "What did the integration work like before this troll appeared?"
      ],
      [QuestPhase.INVESTIGATION]: [
        "Can you test the external service independently to verify it's working?",
        "What does the network traffic look like? Are your requests formatted correctly?",
        "Are authentication tokens or API keys still valid and properly configured?",
        "How does your error handling respond to different types of failures?"
      ],
      [QuestPhase.BATTLE]: [
        "How might you make your integration more resilient to temporary failures?",
        "What retry strategies or circuit breakers could protect your system?",
        "How can you better handle and communicate integration errors to users?",
        "What monitoring would help you detect integration issues quickly?"
      ],
      [QuestPhase.VICTORY]: [
        "Splendid! How does your solution handle various failure scenarios?",
        "What monitoring have you added to watch for future integration troubles?",
        "How will you test this integration going forward to prevent regressions?"
      ]
    },
    
    [QuestType.UI_QUEST]: {
      [QuestPhase.PREPARATION]: [
        "What visual enchantment is misbehaving in your user interface?",
        "On which viewing crystals (browsers/devices) does this UI goblin appear?",
        "What should the interface look like versus what users are actually seeing?",
        "When do users encounter this visual disturbance in their journey?"
      ],
      [QuestPhase.INVESTIGATION]: [
        "What do the browser's developer tools reveal about the styling or layout?",
        "Are there CSS conflicts or JavaScript errors affecting the presentation?",
        "How does the interface behave at different screen sizes or zoom levels?",
        "What happens when you isolate the problematic component?"
      ],
      [QuestPhase.BATTLE]: [
        "How might you restructure the CSS to be more predictable and maintainable?",
        "What responsive design patterns could better handle different screen sizes?",
        "How can you test this interface across different browsers and devices?",
        "What accessibility considerations should be addressed in your solution?"
      ],
      [QuestPhase.VICTORY]: [
        "Wonderful! How does your interface now perform across different devices?",
        "What CSS or component patterns will you use to prevent similar UI issues?",
        "How will you test UI changes going forward to catch visual regressions?"
      ]
    },
    
    [QuestType.DATA_QUEST]: {
      [QuestPhase.PREPARATION]: [
        "What data sorcery is going awry in your information stores?",
        "Are you seeing incorrect, missing, or corrupted data in your repositories?",
        "What operations on your data seem to awaken this particular data demon?",
        "When did you first notice the data behaving strangely?"
      ],
      [QuestPhase.INVESTIGATION]: [
        "Can you trace the data's journey from source to destination?",
        "Are there data transformations or validations that might be affecting the information?",
        "What do your database queries return when tested directly?",
        "How does the data look at each step of processing?"
      ],
      [QuestPhase.BATTLE]: [
        "How might you add validation to catch data issues earlier in the process?",
        "What data integrity constraints could prevent corruption?",
        "How can you better handle edge cases in your data processing?",
        "What backup and recovery procedures should be in place?"
      ],
      [QuestPhase.VICTORY]: [
        "Excellent! How have you ensured data integrity going forward?",
        "What monitoring will alert you to similar data issues in the future?",
        "What validation patterns will you apply to prevent data corruption?"
      ]
    },
    
    [QuestType.ARCHITECTURE_QUEST]: {
      [QuestPhase.PREPARATION]: [
        "What architectural challenge threatens the stability of your digital kingdom?",
        "Which components or services are struggling to work together harmoniously?",
        "What scalability or maintainability issues are you encountering?",
        "How is this architectural dragon affecting your users or development team?"
      ],
      [QuestPhase.INVESTIGATION]: [
        "What are the key responsibilities and boundaries of each component?",
        "Where are the coupling points between different parts of your system?",
        "What quality attributes (performance, scalability, maintainability) are most important?",
        "How do current design patterns support or hinder your goals?"
      ],
      [QuestPhase.BATTLE]: [
        "How might you restructure components to better separate concerns?",
        "What patterns or principles could guide your architectural decisions?",
        "How can you ensure your architecture supports future growth and changes?",
        "What refactoring steps would move you toward your desired architecture?"
      ],
      [QuestPhase.VICTORY]: [
        "Magnificent! How does your new architecture better serve your requirements?",
        "What architectural principles will guide your future design decisions?",
        "How will you maintain architectural quality as your system evolves?"
      ]
    }
  },
  
  encouragements: {
    [BugSeverity.GOBLIN]: [
      "Fear not, this goblin may be small but defeating it will sharpen your skills!",
      "Even mighty heroes started by conquering simple goblins. You've got this!",
      "This minor creature won't stand long against your growing expertise!",
      "A quick victory over this goblin will boost your confidence for bigger battles!"
    ],
    [BugSeverity.ORC]: [
      "This orc requires strategy, but I sense the wisdom within you to overcome it!",
      "Moderate foes like this orc test your problem-solving prowess. Trust your instincts!",
      "You've grown strong enough to face this orc. Take it step by step!",
      "This orc may be tougher than a goblin, but your skills have grown to match the challenge!"
    ],
    [BugSeverity.TROLL]: [
      "Trolls are formidable, but methodical heroes like yourself have conquered them before!",
      "This troll guards important knowledge. Defeating it will make you a stronger developer!",
      "Complex beasts like this troll require patience and persistence. You have both!",
      "The troll seems intimidating, but remember: every expert was once a beginner who didn't give up!"
    ],
    [BugSeverity.DRAGON]: [
      "Dragons are the ultimate test of a hero's skills. You wouldn't face one if you weren't ready!",
      "This dragon threatens your entire kingdom, but heroes like you are exactly what's needed!",
      "The greatest legends are born from dragon-slaying quests. This is your moment!",
      "Dragons have fallen before determined heroes. Your persistence will be the key to victory!"
    ],
    [BugSeverity.HYDRA]: [
      "The dreaded Hydra! Multiple heads require multiple strategies. Your systematic approach will prevail!",
      "Hydras are rare beasts that only the most experienced adventurers encounter. You're among the elite!",
      "Each head of this Hydra teaches a different lesson. Embrace the complex challenge!",
      "Multi-faceted problems create multi-talented heroes. This Hydra will make you legendary!"
    ]
  },
  
  milestoneAcknowledgments: [
    "Excellent discovery! You've uncovered an important clue in your quest!",
    "Your investigation skills grow stronger! This finding brings you closer to victory!",
    "Brilliant insight! The path forward becomes clearer with each discovery!",
    "Your persistence pays off! This breakthrough illuminates the way ahead!",
    "Masterful detection! You're developing the instincts of a true bug hunter!"
  ],
  
  victoryMessages: [
    "🏆 Victory! Another bug vanquished by your heroic efforts! Your debugging prowess grows stronger!",
    "⚔️ Triumphant! The digital realm is safer thanks to your noble quest! Well fought, brave warrior!",
    "🎉 Success! You've proven once again that no bug can withstand a determined hero's resolve!",
    "✨ Glorious victory! Your systematic approach and persistence have saved the day once more!",
    "🛡️ Champion! Your debugging skills shine brighter with each conquered challenge!"
  ]
};

/**
 * Selects a random response from an array of possible responses.
 * Adds variety to mentor interactions by randomizing response selection.
 * 
 * @param responses - Array of possible response strings
 * @returns A randomly selected response string
 */
export function getRandomResponse(responses: string[]): string {
  return responses[Math.floor(Math.random() * responses.length)];
}

/**
 * Retrieves contextually appropriate questions for a specific quest type and phase.
 * Questions are designed to guide the debugging process systematically.
 * 
 * @param questType - The type of debugging quest (logic, performance, etc.)
 * @param phase - Current phase of the quest (preparation, investigation, etc.)
 * @returns Array of guidance questions for the current context
 */
export function getQuestQuestions(questType: QuestType, phase: QuestPhase): string[] {
  return MENTOR_RESPONSES.questions[questType][phase] || [];
}

/**
 * Retrieves an encouraging message appropriate for the bug severity level.
 * Encouragement is tailored to match the challenge level being faced.
 * 
 * @param severity - The severity level of the bug being debugged
 * @returns A random encouraging message appropriate for the severity level
 */
export function getEncouragement(severity: BugSeverity): string {
  return getRandomResponse(MENTOR_RESPONSES.encouragements[severity]);
}

/**
 * Retrieves a random greeting message to start conversations.
 * Maintains the adventure theme while welcoming debugging heroes.
 * 
 * @returns A random greeting message in adventure theme
 */
export function getGreeting(): string {
  return getRandomResponse(MENTOR_RESPONSES.greetings);
}

/**
 * Retrieves a random milestone acknowledgment message.
 * Used to celebrate significant discoveries and breakthroughs during quests.
 * 
 * @returns A random milestone acknowledgment message
 */
export function getMilestoneAcknowledgment(): string {
  return getRandomResponse(MENTOR_RESPONSES.milestoneAcknowledgments);
}

/**
 * Retrieves a random victory celebration message.
 * Used to celebrate the successful completion of debugging quests.
 * 
 * @returns A random victory celebration message
 */
export function getVictoryMessage(): string {
  return getRandomResponse(MENTOR_RESPONSES.victoryMessages);
}
