/**
 * @fileoverview Resource registration for the Rubber Ducking Adventure MCP Server.
 * This module contains all MCP resource definitions including debugging handbook,
 * quest logs, bestiary, and achievement hall.
 */

import { McpServer, ResourceTemplate } from "@modelcontextprotocol/sdk/server/mcp.js";
import { AdventureEngine } from '../adventureEngine.js';
import { 
  generateQuestHistory, 
  getBugInfo, 
  generateDebuggingHandbook, 
  generateAchievementHall 
} from './resourceGenerator.js';

/**
 * Registers all adventure-themed resources with the MCP server.
 * These resources provide static and dynamic content for debugging guidance,
 * quest tracking, and achievement progression.
 * 
 * @param server - The MCP server instance to register resources with
 * @param adventureEngine - The adventure engine for dynamic content generation
 */
export function registerAdventureResources(server: McpServer, adventureEngine: AdventureEngine): void {
  registerDebuggingHandbook(server);
  registerQuestLog(server);
  registerDebuggingBestiary(server);
  registerAchievementHall(server, adventureEngine);
}

/**
 * Registers the debugging handbook resource.
 * Provides comprehensive debugging techniques and wisdom in adventure theme.
 */
function registerDebuggingHandbook(server: McpServer): void {
  server.registerResource(
    "debugging-handbook",
    "handbook://debugging-guide",
    {
      title: "🧙‍♂️ Mystical Debugging Handbook",
      description: "Ancient scrolls of debugging wisdom and techniques",
      mimeType: "text/markdown"
    },
    async (uri) => ({
      contents: [{
        uri: uri.href,
        text: generateDebuggingHandbook()
      }]
    })
  );
}

/**
 * Registers the quest log resource with templated hero level parameter.
 * Generates historical quest data based on the provided hero level.
 */
function registerQuestLog(server: McpServer): void {
  server.registerResource(
    "quest-log",
    new ResourceTemplate("quest://log/{heroLevel}", { list: undefined }),
    {
      title: "📜 Quest Log Archive",
      description: "Chronicles of past debugging adventures and victories"
    },
    async (uri, { heroLevel }) => {
      const levelStr = Array.isArray(heroLevel) ? heroLevel[0] : heroLevel;
      const level = parseInt(levelStr) || 1;
      const questHistory = generateQuestHistory(level);
      
      return {
        contents: [{
          uri: uri.href,
          text: questHistory
        }]
      };
    }
  );
}

/**
 * Registers the debugging bestiary resource with bug type completion.
 * Provides detailed information about different types of bugs and how to defeat them.
 */
function registerDebuggingBestiary(server: McpServer): void {
  server.registerResource(
    "debugging-bestiary",
    new ResourceTemplate("bestiary://bugs/{bugType}", { 
      list: undefined,
      complete: {
        bugType: (value) => {
          const bugTypes = ['goblin', 'orc', 'troll', 'dragon', 'hydra'];
          return bugTypes.filter(type => type.startsWith(value.toLowerCase()));
        }
      }
    }),
    {
      title: "🐉 Debugging Bestiary",
      description: "Encyclopedia of common bugs and how to defeat them"
    },
    async (uri, { bugType }) => {
      const typeStr = Array.isArray(bugType) ? bugType[0] : bugType;
      const bugInfo = getBugInfo(typeStr.toLowerCase());
      
      return {
        contents: [{
          uri: uri.href,
          text: bugInfo
        }]
      };
    }
  );
}

/**
 * Registers the achievement hall resource.
 * Shows current quest status and available achievement badges for progression.
 */
function registerAchievementHall(server: McpServer, adventureEngine: AdventureEngine): void {
  server.registerResource(
    "achievement-hall",
    "achievements://hall-of-fame",
    {
      title: "🏆 Hall of Debugging Fame",
      description: "Your debugging achievements and milestones",
      mimeType: "text/markdown"
    },
    async (uri) => {
      const status = adventureEngine.getQuestStatus();
      return {
        contents: [{
          uri: uri.href,
          text: generateAchievementHall(status)
        }]
      };
    }
  );
}
