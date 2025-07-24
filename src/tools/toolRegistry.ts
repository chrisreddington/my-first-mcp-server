/**
 * @fileoverview Tool registration for the Rubber Ducking Adventure MCP Server.
 * This module contains all MCP tool definitions for debugging quest management,
 * including quest lifecycle, progress tracking, and wisdom seeking.
 */

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { AdventureEngine } from '../adventureEngine.js';

/**
 * Registers all debugging adventure tools with the MCP server.
 * These tools provide the core functionality for managing debugging quests,
 * tracking progress, and providing guidance throughout the adventure.
 * 
 * @param server - The MCP server instance to register tools with
 * @param adventureEngine - The adventure engine that manages quest logic
 */
export function registerAdventureTools(server: McpServer, adventureEngine: AdventureEngine): void {
  registerStartQuestTool(server, adventureEngine);
  registerContinueQuestTool(server, adventureEngine);
  registerQuestStatusTool(server, adventureEngine);
  registerSeekWisdomTool(server, adventureEngine);
  registerCompleteQuestTool(server, adventureEngine);
}

/**
 * Registers the start_quest tool for beginning new debugging adventures.
 * Analyzes the bug description and creates an appropriate quest with guidance.
 */
function registerStartQuestTool(server: McpServer, adventureEngine: AdventureEngine): void {
  server.tool(
    "start_quest",
    "Begin a new debugging adventure quest",
    {
      description: z.string().describe("Description of the bug or issue you're facing"),
      techStack: z.array(z.string()).optional().describe("Technologies involved (e.g., React, Node.js, PostgreSQL)"),
      urgency: z.enum(["low", "moderate", "high", "critical"]).optional().describe("How urgent is this issue?")
    },
    async ({ description, techStack, urgency }) => {
      const { quest, response } = adventureEngine.startQuest(description, techStack, urgency);
      
      const responseText = [
        response.message,
        "",
        "🤔 **Guiding Questions:**",
        ...response.questions.map(q => `• ${q}`),
        "",
        "💪 **Encouragement:**",
        response.encouragement,
        "",
        "🎯 **Next Steps:**", 
        ...response.nextSuggestions.map(s => `• ${s}`)
      ].join("\n");

      return {
        content: [
          {
            type: "text",
            text: responseText,
          },
        ],
      };
    },
  );
}

/**
 * Registers the continue_quest tool for progressing through debugging adventures.
 * Accepts findings and discoveries to advance the quest and provide new guidance.
 */
function registerContinueQuestTool(server: McpServer, adventureEngine: AdventureEngine): void {
  server.tool(
    "continue_quest",
    "Continue your debugging quest with new findings or discoveries", 
    {
      finding: z.string().describe("What you discovered, tried, or learned"),
      significance: z.enum(["minor", "moderate", "major", "breakthrough"]).optional().describe("How important is this finding?")
    },
    async ({ finding, significance = "moderate" }) => {
      const response = adventureEngine.continueQuest(finding, significance);
      
      const responseText = [
        response.message,
        "",
        "🤔 **Next Questions to Consider:**",
        ...response.questions.map(q => `• ${q}`),
        "",
        "💪 **Keep Going:**",
        response.encouragement,
        "",
        "🎯 **Suggested Actions:**",
        ...response.nextSuggestions.map(s => `• ${s}`)
      ].join("\n");

      return {
        content: [
          {
            type: "text", 
            text: responseText,
          },
        ],
      };
    },
  );
}

/**
 * Registers the get_quest_status tool for checking current progress.
 * Provides comprehensive status information about the active quest and hero progress.
 */
function registerQuestStatusTool(server: McpServer, adventureEngine: AdventureEngine): void {
  server.tool(
    "get_quest_status",
    "View your current debugging quest progress and hero stats",
    {},
    async () => {
      const status = adventureEngine.getQuestStatus();
      
      return {
        content: [
          {
            type: "text",
            text: status,
          },
        ],
      };
    },
  );
}

/**
 * Registers the seek_wisdom tool for requesting specific debugging guidance.
 * Provides targeted advice based on the type of help needed and current quest context.
 */
function registerSeekWisdomTool(server: McpServer, adventureEngine: AdventureEngine): void {
  server.tool(
    "seek_wisdom", 
    "Ask for specific guidance on your debugging approach",
    {
      helpType: z.string().describe("What kind of guidance do you need? (e.g., 'approach', 'testing', 'investigation')")
    },
    async ({ helpType }) => {
      const response = adventureEngine.seekWisdom(helpType);
      
      const responseText = [
        response.message,
        "",
        "🤔 **Wisdom Questions:**",
        ...response.questions.map(q => `• ${q}`),
        "",
        "💪 **Remember:**",
        response.encouragement,
        "",
        "🎯 **Action Items:**",
        ...response.nextSuggestions.map(s => `• ${s}`)
      ].join("\n");

      return {
        content: [
          {
            type: "text",
            text: responseText,
          },
        ],
      };
    },
  );
}

/**
 * Registers the complete_quest tool for celebrating successful bug resolution.
 * Marks quests as completed, awards experience, and provides reflection opportunities.
 */
function registerCompleteQuestTool(server: McpServer, adventureEngine: AdventureEngine): void {
  server.tool(
    "complete_quest",
    "Mark your debugging quest as completed - celebrate your victory!",
    {
      solutionSummary: z.string().optional().describe("Brief summary of how you solved the issue")
    },
    async ({ solutionSummary }) => {
      const response = adventureEngine.completeQuest(solutionSummary);
      
      const responseText = [
        response.message,
        "",
        "🤔 **Reflection Questions:**", 
        ...response.questions.map(q => `• ${q}`),
        "",
        "💪 **Hero's Journey:**",
        response.encouragement,
        "",
        "🎯 **Moving Forward:**",
        ...response.nextSuggestions.map(s => `• ${s}`)
      ].join("\n");

      return {
        content: [
          {
            type: "text",
            text: responseText,
          },
        ],
      };
    },
  );
}
