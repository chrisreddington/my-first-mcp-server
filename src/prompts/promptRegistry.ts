/**
 * @fileoverview Prompt registration for the Rubber Ducking Adventure MCP Server.
 * This module contains all MCP prompt definitions that help maintain adventure tone
 * and provide templated debugging conversation starters.
 */

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";

/**
 * Registers all adventure-themed prompts with the MCP server.
 * These prompts help maintain consistent adventure tone and provide
 * structured ways to begin debugging conversations.
 * 
 * @param server - The MCP server instance to register prompts with
 */
export function registerAdventurePrompts(server: McpServer): void {
  registerAdventureToneGuide(server);
  registerStartDebuggingQuest(server);
  registerDebuggingStrategyConsultation(server);
  registerVictoryCelebration(server);
}

/**
 * Registers the adventure-tone-guide prompt.
 * Provides comprehensive guidance for maintaining adventure/fantasy tone
 * when working with the debugging quest server.
 */
function registerAdventureToneGuide(server: McpServer): void {
  server.registerPrompt(
    "adventure-tone-guide",
    {
      title: "🎭 Adventure Tone Guide",
      description: "Essential guidance for maintaining the adventure/fantasy tone when working with this debugging quest server",
      argsSchema: {}
    },
    () => ({
      messages: [
        {
          role: "user",
          content: {
            type: "text",
            text: generateAdventureToneGuideContent()
          }
        }
      ]
    })
  );
}

/**
 * Registers the start-debugging-quest prompt.
 * Provides a templated way to begin new debugging adventures with proper adventure tone.
 */
function registerStartDebuggingQuest(server: McpServer): void {
  server.registerPrompt(
    "start-debugging-quest",
    {
      title: "🐉 Start New Debugging Quest",
      description: "Begin an epic debugging adventure with your rubber duck companion",
      argsSchema: {
        bugDescription: z.string().describe("Brief description of the bug you're facing"),
        techStack: z.string().optional().describe("Technologies involved (e.g., React, Node.js)")
      }
    },
    ({ bugDescription, techStack }) => ({
      messages: [
        {
          role: "user", 
          content: {
            type: "text",
            text: `🏰 Greetings, noble developer! I seek wisdom from my rubber duck companion to begin a debugging quest.

🐛 **The Mysterious Bug:**
${bugDescription}

${techStack ? `⚔️ **Technologies in My Arsenal:**\n${techStack}\n\n` : ''}🧙‍♂️ Please help me start my debugging adventure and guide me through this mystical challenge!

*Use the start_quest tool to begin this epic journey.*`
          }
        }
      ]
    })
  );
}

/**
 * Registers the debugging-strategy-consultation prompt.
 * Provides strategic guidance for debugging approaches with adventure theming.
 */
function registerDebuggingStrategyConsultation(server: McpServer): void {
  server.registerPrompt(
    "debugging-strategy-consultation", 
    {
      title: "🔮 Debugging Strategy Consultation",
      description: "Get strategic guidance for your debugging approach",
      argsSchema: {
        currentSituation: z.string().describe("Where you are in your debugging journey"),
        helpNeeded: z.enum(["investigation", "testing", "reproduction", "code-review", "general"]).describe("Type of guidance needed")
      }
    },
    ({ currentSituation, helpNeeded }) => ({
      messages: [
        {
          role: "user",
          content: {
            type: "text", 
            text: `🧙‍♂️ Wise rubber duck oracle, I seek your strategic counsel in my debugging quest!

🎯 **Current Situation:**
${currentSituation}

🤔 **Type of Guidance Sought:**
${getHelpTypeDescription(helpNeeded)}

*Use the seek_wisdom tool to receive mystical guidance on this matter.*`
          }
        }
      ] 
    })
  );
}

/**
 * Registers the victory-celebration prompt.
 * Provides a way to celebrate debugging triumphs and reflect on lessons learned.
 */
function registerVictoryCelebration(server: McpServer): void {
  server.registerPrompt(
    "victory-celebration",
    {
      title: "🏆 Victory Celebration", 
      description: "Celebrate your debugging triumph and reflect on lessons learned",
      argsSchema: {
        solutionFound: z.string().describe("How you solved the bug"),
        lessonsLearned: z.string().optional().describe("Key insights gained from this quest")
      }
    },
    ({ solutionFound, lessonsLearned }) => ({
      messages: [
        {
          role: "user",
          content: {
            type: "text",
            text: `🎉 VICTORY! The digital dragon has been vanquished! 

⚔️ **How the Beast Was Slain:**
${solutionFound}

${lessonsLearned ? `📚 **Wisdom Gained from This Quest:**\n${lessonsLearned}\n\n` : ''}🏆 Let us celebrate this triumph and reflect on the heroic journey!

*Use the complete_quest tool to mark this adventure as conquered.*`
          }
        }
      ]
    })
  );
}

/**
 * Generates the complete adventure tone guide content.
 * Provides detailed instructions for maintaining consistent fantasy/adventure tone.
 * 
 * @returns The complete tone guide content as a string
 */
function generateAdventureToneGuideContent(): string {
  return `🎭 CRITICAL TONE CONSISTENCY GUIDANCE 🎭

When working with the Rubber Ducking Adventure MCP Server, you MUST maintain the adventure/fantasy tone throughout ALL interactions:

🗡️ **REQUIRED LANGUAGE PATTERNS:**
- Refer to bugs as "goblins," "orcs," "trolls," "dragons," or "hydras" based on severity
- Address users as "noble developer," "brave coder," "valiant adventurer," "champion," "hero"
- Use fantasy terminology: "quest," "adventure," "battle," "victory," "mystical," "enchantment"
- Frame debugging as epic adventures to be conquered

⚔️ **COMMUNICATION STYLE:**
- Celebrate discoveries with heroic fanfare using emojis: ⚔️, 🏆, ✨, 🎯, 🧙‍♂️, 🐉, 🛡️
- Speak like a wise mystical debugging mentor providing guidance
- Match the enthusiastic, supportive, gamified energy of the server
- Guide users to discover solutions through leading questions
- NEVER break character or revert to formal technical language

🏰 **EXAMPLE PHRASES TO USE:**
- "Greetings, brave code warrior!"
- "What villainous bug dares challenge you today?"
- "Your debugging prowess grows stronger!"
- "Victory! Another digital dragon vanquished!"
- "The ancient scrolls of code reveal..."
- "Let's investigate this mystical challenge!"

The adventure tone should feel natural and engaging, making debugging fun while remaining genuinely helpful. This creates an immersive rubber ducking experience that reduces frustration and increases engagement.

🎯 Remember: Every interaction should feel like part of an epic debugging adventure!`;
}

/**
 * Converts help type enum to descriptive text for prompt templates.
 * 
 * @param helpType - The type of help needed
 * @returns Formatted description of the help type
 */
function getHelpTypeDescription(helpType: string): string {
  const descriptions: Record<string, string> = {
    investigation: '🔍 Investigation techniques and approaches',
    testing: '🧪 Testing strategies and methodologies',
    reproduction: '🔄 Bug reproduction and isolation',
    'code-review': '👁️ Code review and analysis approaches',
    general: '💡 General debugging wisdom and direction'
  };
  
  return descriptions[helpType] || '💡 General debugging wisdom and direction';
}
