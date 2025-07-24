#!/usr/bin/env node

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { ResourceTemplate } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { AdventureEngine } from "./adventureEngine.js";

// Create server instance
const server = new McpServer({
  name: "rubber-ducking-adventure",
  version: "1.0.0",
  capabilities: {
    resources: {},
    tools: {},
    prompts: {},
  },
});

// Create adventure engine instance
const adventureEngine = new AdventureEngine();

// Register debugging adventure resources
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
      text: `# 🧙‍♂️ The Mystical Debugging Handbook

## 🗡️ Essential Debugging Techniques

### 🔍 The Art of Investigation
- **Examine the Ancient Logs**: Always check error logs and console outputs first
- **Reproduce the Beast**: Try to recreate the bug consistently
- **Isolate the Lair**: Narrow down where the bug lives in your code
- **Question the Witnesses**: Talk to users who encountered the issue

### 🧪 Testing Your Theories
- **Form Hypotheses**: What do you think is causing the issue?
- **Test One Theory at a Time**: Don't change multiple things simultaneously
- **Use Debugging Spells**: \`console.log\`, debugger statements, breakpoints
- **Binary Search**: Comment out half your code to isolate the problem

### 🛡️ Defensive Coding Practices
- **Guard Against Null Dragons**: Always check for null/undefined values
- **Validate Input from Strangers**: Never trust external data
- **Use Type Safety**: Let TypeScript be your magical armor
- **Write Tests**: Unit tests are your early warning system

### 🏰 Common Bug Lairs
- **Timing Issues**: Race conditions, async/await problems
- **Scope Confusion**: Variable hoisting, closure issues
- **State Management**: React state updates, Redux bugs
- **Network Troubles**: API calls, CORS, timeouts

### 🎯 Victory Strategies
- **Take Breaks**: Sometimes stepping away reveals the solution
- **Rubber Duck Debugging**: Explain the problem out loud
- **Pair Programming**: Two minds are better than one
- **Read the Error Messages**: They often tell you exactly what's wrong

*May your bugs be few and your solutions elegant, brave developer!* ⚔️`
    }]
  })
);

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
        text: `# 🏆 Hall of Debugging Fame

${status}

## 🎖️ Available Achievement Badges

### 🥉 Apprentice Achievements
- **First Steps**: Start your first debugging quest
- **Goblin Slayer**: Defeat 5 minor bugs (goblins)
- **Question Master**: Ask 10 thoughtful debugging questions

### 🥈 Journeyman Achievements  
- **Orc Hunter**: Defeat 3 moderate bugs (orcs)
- **Tool Master**: Use 5 different debugging tools
- **Pattern Seeker**: Identify recurring bug patterns

### 🥇 Master Achievements
- **Dragon Slayer**: Defeat a critical production bug
- **Hydra Tamer**: Solve a complex multi-layered issue
- **Mentor**: Help another developer debug their code

### 🏅 Legendary Achievements
- **Code Sage**: Prevent bugs through excellent design
- **Debugging Oracle**: Predict bugs before they happen
- **Community Hero**: Contribute debugging knowledge to others

*Your heroic deeds in the realm of debugging shall be remembered forever!* ⚔️`
      }]
    };
  }
);

// Helper functions for resource content generation
function generateQuestHistory(heroLevel: number): string {
  const questCount = Math.min(heroLevel * 2, 10);
  const questTypes = ['Goblin Infestation', 'Orc Invasion', 'Troll Bridge', 'Dragon Attack', 'Hydra Outbreak'];
  
  let history = `# 📜 Quest Log Archive - Hero Level ${heroLevel}\n\n`;
  history += `## 🎯 Recent Adventures\n\n`;
  
  for (let i = 0; i < questCount; i++) {
    const questType = questTypes[Math.floor(Math.random() * questTypes.length)];
    const status = Math.random() > 0.3 ? '✅ Victory' : '⏳ In Progress';
    history += `### Quest ${i + 1}: ${questType}\n`;
    history += `**Status**: ${status}\n`;
    history += `**Difficulty**: ${Math.floor(Math.random() * 5) + 1}/5 ⭐\n\n`;
  }
  
  return history;
}

function getBugInfo(bugType: string): string {
  const bugData: Record<string, string> = {
    goblin: `# 🧌 Goblin (Minor Bug)

## 🎯 **Characteristics**
- Small, annoying issues
- Usually syntax errors or typos
- Quick to fix once spotted

## ⚔️ **How to Defeat**
- Use your IDE's error highlighting
- Run linters and formatters
- Take your time when typing

## 📚 **Common Examples**
- Missing semicolons
- Typos in variable names
- Incorrect file paths
- Missing imports

*"Even the smallest goblin can trip up a mighty warrior!"* 🧙‍♂️`,

    orc: `# 👹 Orc (Moderate Bug)

## 🎯 **Characteristics**  
- Logic errors that break functionality
- Require some investigation to find
- Can affect user experience

## ⚔️ **How to Defeat**
- Use debugger and breakpoints
- Check your assumptions
- Test edge cases
- Review recent changes

## 📚 **Common Examples**
- Off-by-one errors
- Incorrect conditional logic
- State management issues
- API integration problems

*"Orcs are cunning foes that require strategy to defeat!"* 🧙‍♂️`,

    troll: `# 🧱 Troll (Performance Bug)

## 🎯 **Characteristics**
- Blocks your application's performance
- Causes slowdowns or freezes
- Often related to inefficient code

## ⚔️ **How to Defeat**
- Profile your application
- Look for memory leaks
- Optimize algorithms
- Use performance monitoring tools

## 📚 **Common Examples**
- Infinite loops
- Memory leaks
- Inefficient database queries
- Unoptimized re-renders

*"Trolls may be slow, but they can bring your entire kingdom to a crawl!"* 🧙‍♂️`,

    dragon: `# 🐉 Dragon (Critical Bug)

## 🎯 **Characteristics**
- Production-breaking issues
- Affects many users
- Requires immediate attention
- Often complex and multi-faceted

## ⚔️ **How to Defeat**
- Assemble your best debugging team
- Create comprehensive reproduction steps
- Use all available monitoring tools
- Implement hotfixes carefully

## 📚 **Common Examples**
- Server crashes
- Data corruption
- Security vulnerabilities
- Complete feature failures

*"Dragons are the most fearsome foes - approach with caution and preparation!"* 🧙‍♂️`,

    hydra: `# 🐍 Hydra (Multi-headed Bug)

## 🎯 **Characteristics**
- Multiple interconnected issues
- Fixing one part reveals new problems
- Complex system-wide effects
- Requires holistic approach

## ⚔️ **How to Defeat**
- Map out all affected systems
- Fix root causes, not symptoms
- Test thoroughly after each change
- Consider architectural changes

## 📚 **Common Examples**
- Race conditions in distributed systems
- Complex dependency conflicts
- Multi-service integration failures
- Legacy code interactions

*"The Hydra's many heads represent the interconnected nature of complex bugs!"* 🧙‍♂️`
  };

  return bugData[bugType] || `# ❓ Unknown Creature

This mystical bug type is not yet documented in our bestiary. Perhaps you've discovered a new species of digital creature!

*Report your findings to the Guild of Debugging Masters for proper classification.* 🧙‍♂️`;
}

// Register debugging adventure tools
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

// Register multiple useful prompts for the debugging adventure
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
          text: `🎭 CRITICAL TONE CONSISTENCY GUIDANCE 🎭

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

🎯 Remember: Every interaction should feel like part of an epic debugging adventure!`
        }
      }
    ]
  })
);

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
${helpNeeded === 'investigation' ? '🔍 Investigation techniques and approaches' :
  helpNeeded === 'testing' ? '🧪 Testing strategies and methodologies' :
  helpNeeded === 'reproduction' ? '🔄 Bug reproduction and isolation' :
  helpNeeded === 'code-review' ? '👁️ Code review and analysis approaches' :
  '💡 General debugging wisdom and direction'}

*Use the seek_wisdom tool to receive mystical guidance on this matter.*`
        }
      }
    ] 
  })
);

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

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Rubber Ducking Adventure MCP Server running on stdio");
}

main().catch((error) => {
  console.error("Fatal error in main():", error);
  process.exit(1);
});
