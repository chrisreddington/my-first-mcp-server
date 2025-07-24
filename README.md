# 🏰 Rubber Ducking Adventure MCP Server

> Transform your debugging sessions into epic fantasy quests! This MCP server gamifies the rubber ducking debugging technique, turning you into a heroic code warrior on a quest to vanquish villainous bugs.

## 🎮 What is This?

The Rubber Ducking Adventure MCP server is a unique debugging companion that:

- **Gamifies debugging** - Turn frustrating bug hunts into engaging fantasy adventures
- **Guides without solving** - Helps you think through problems using the Socratic method
- **Provides motivation** - Epic fantasy themes make debugging more enjoyable
- **Tracks progress** - Watch your hero level up as you conquer more challenging bugs
- **Encourages systematic thinking** - Structured quest phases guide your debugging approach

## 🐉 Bug Classifications

Different types of bugs become different fantasy creatures:

- 🧌 **Goblins** - Minor bugs, typos, simple logic errors
- ⚔️ **Orcs** - Moderate bugs, integration issues
- 👹 **Trolls** - Complex bugs, performance issues  
- 🐉 **Dragons** - Critical bugs, system-breaking issues
- 🐍 **Hydras** - Multi-faceted bugs with multiple root causes

## 🗡️ Quest Types

Your debugging adventures are categorized into different quest types:

- **Logic Quest** - Algorithm and logic bugs
- **Performance Quest** - Optimization and speed issues
- **Integration Quest** - API and service integration problems
- **UI Quest** - User interface and styling challenges
- **Data Quest** - Database and data handling issues
- **Architecture Quest** - System design and structure problems

## 🚀 Available Tools

### `start_quest`
Begin a new debugging adventure by describing your bug. The system will:
- Classify your bug severity (goblin to dragon)
- Determine the quest type
- Set up an adventure narrative
- Provide initial guiding questions

**Parameters:**
- `description` - What bug are you facing?
- `techStack` (optional) - Technologies involved
- `urgency` (optional) - How critical is this issue?

### `continue_quest`  
Progress through your quest by sharing discoveries and findings.

**Parameters:**
- `finding` - What you discovered, tried, or learned
- `significance` (optional) - How important is this finding?

### `get_quest_status`
View your current quest progress, hero stats, and debugging journey.

### `seek_wisdom`
Ask for specific guidance on debugging approaches, testing strategies, or investigation techniques.

**Parameters:**
- `helpType` - Type of guidance needed (e.g., "approach", "testing", "investigation")

### `complete_quest`
Celebrate your victory when you've solved the bug!

**Parameters:**
- `solutionSummary` (optional) - How you solved the issue

## 🎭 Adventure Tone Consistency

### `adventure-tone-guide` Prompt
This server includes a special prompt that provides **automatic tone consistency guidance** to any AI assistant connecting to it. When an AI client accesses the `adventure-tone-guide` prompt, it receives comprehensive instructions to maintain the fantasy adventure theme throughout all debugging interactions.

**What it provides:**
- ⚔️ Required language patterns (bugs as "goblins," "dragons," etc.)
- 🏰 Fantasy terminology guidelines  
- 🎯 Communication style requirements
- ✨ Example phrases and emojis to use
- 🧙‍♂️ Wise mentor persona guidance

This ensures that **every debugging session feels like an epic adventure**, regardless of which kingdom (repository) the server is deployed in!

## 🎯 Philosophy

This server follows core rubber ducking principles:

1. **Never provides direct solutions** - Guides you to discover answers yourself
2. **Asks thoughtful questions** - Helps you think systematically about problems  
3. **Encourages exploration** - Supports different approaches and perspectives
4. **Celebrates progress** - Acknowledges breakthroughs and learning moments
5. **Makes debugging fun** - Fantasy themes reduce frustration and increase engagement

## 🛠️ Setup

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/chrisreddington/my-first-mcp-server.git
cd my-first-mcp-server
```

2. Install dependencies:
```bash
npm install
```

3. Build the project:
```bash
npm run build
```

### Running
```bash
npm run start
```

### Integration with Claude Desktop

Add this configuration to your `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "rubber-ducking-adventure": {
      "command": "node",
      "args": ["/absolute/path/to/my-first-mcp-server/build/index.js"]
    }
  }
}
```

**Configuration file locations:**
- **macOS/Linux**: `~/Library/Application Support/Claude/claude_desktop_config.json`
- **Windows**: `%APPDATA%\Claude\claude_desktop_config.json`

### VS Code Debugging

This project includes VS Code configuration for debugging:

1. Open the project in VS Code
2. Go to Run and Debug panel (Ctrl/Cmd + Shift + D)
3. Run the "Build and Run MCP Server" task

## 🎮 Usage Example

1. **Start a quest:**
   ```
   Tool: start_quest
   Description: "My React component isn't re-rendering when state changes"
   Tech Stack: ["React", "TypeScript", "Vite"]
   Urgency: "moderate"
   ```

2. **Continue with findings:**
   ```
   Tool: continue_quest  
   Finding: "I added console.logs and the state is definitely updating"
   Significance: "moderate"
   ```

3. **Seek specific guidance:**
   ```
   Tool: seek_wisdom
   Help Type: "testing"
   ```

4. **Complete the quest:**
   ```
   Tool: complete_quest
   Solution Summary: "The issue was a missing key prop causing React to not recognize the component should re-render"
   ```

## 🏆 Hero Progression

- Gain experience points (XP) by completing quests
- Level up your debugging hero
- Track your quest completion history
- Build confidence through systematic success

## 🛠️ Development

### Project Structure

```
rubber-ducking-adventure-mcp/
├── src/
│   ├── index.ts              # Main server implementation
│   ├── adventureEngine.ts    # Core quest and adventure logic
│   ├── questTypes.ts         # TypeScript interfaces and enums
│   └── mentorResponses.ts    # Response templates and guidance
├── build/                    # Compiled JavaScript (generated)
├── .vscode/
│   ├── mcp.json             # MCP server configuration
│   └── tasks.json           # VS Code tasks
├── package.json
├── tsconfig.json
└── README.md
```

### Available Scripts

- `npm run build` - Compile TypeScript to JavaScript
- `npm run start` - Build and run the server
- `npm run dev` - Development mode (same as start)

### Technical Details

- Built with the [@modelcontextprotocol/sdk](https://www.npmjs.com/package/@modelcontextprotocol/sdk)
- Uses [Zod](https://zod.dev/) for runtime type validation
- Implements stdio transport for communication
- TypeScript for type safety and developer experience

## 📚 The Adventure Continues

Each debugging session becomes part of your heroic journey. The more quests you complete, the stronger your debugging skills become, and the more confident you'll feel facing future challenges.

Remember: Every master debugger was once a beginner who never gave up! 

## 🤝 Contributing

This is a learning project demonstrating gamified debugging and MCP server development. Feel free to fork and experiment!

## 📄 License

ISC License - see LICENSE file for details.

## 🙏 Acknowledgments

- [Model Context Protocol](https://modelcontextprotocol.io/) for the specification
- [MCP SDK](https://github.com/modelcontextprotocol/typescript-sdk) for the development framework
- The rubber ducking debugging technique for inspiring systematic problem-solving
- Fantasy RPG games for the adventure and progression mechanics

---

*Ready to embark on your debugging adventure? The digital realm awaits your heroic efforts!* ⚔️🐉
