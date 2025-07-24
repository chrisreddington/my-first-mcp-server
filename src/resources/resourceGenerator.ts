/**
 * @fileoverview Resource content generators for the Rubber Ducking Adventure MCP Server.
 * This module contains functions that generate dynamic content for various MCP resources
 * such as quest logs, debugging bestiary, and achievement hall.
 */

import { BugSeverity, QuestType } from '../questTypes.js';

/**
 * Generates a quest history log for a given hero level.
 * Creates fake historical quest data to show progression and past adventures.
 * 
 * @param heroLevel - The current level of the debugging hero (1-50+)
 * @returns Formatted markdown string containing quest history
 */
export function generateQuestHistory(heroLevel: number): string {
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

/**
 * Bug information database containing detailed descriptions for each bug type.
 * Maps bug severity levels to their corresponding bestiary entries.
 */
const BUG_BESTIARY: Record<string, string> = {
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

/**
 * Retrieves detailed information about a specific bug type from the bestiary.
 * 
 * @param bugType - The type of bug to look up (goblin, orc, troll, dragon, hydra)
 * @returns Formatted markdown string with bug information, or unknown creature message
 */
export function getBugInfo(bugType: string): string {
  const normalizedType = bugType.toLowerCase();
  
  return BUG_BESTIARY[normalizedType] || `# ❓ Unknown Creature

This mystical bug type is not yet documented in our bestiary. Perhaps you've discovered a new species of digital creature!

*Report your findings to the Guild of Debugging Masters for proper classification.* 🧙‍♂️`;
}

/**
 * Generates the debugging handbook content with essential techniques and wisdom.
 * This resource provides comprehensive debugging guidance in an adventure theme.
 * 
 * @returns Formatted markdown string containing debugging handbook
 */
export function generateDebuggingHandbook(): string {
  return `# 🧙‍♂️ The Mystical Debugging Handbook

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

*May your bugs be few and your solutions elegant, brave developer!* ⚔️`;
}

/**
 * Generates the Hall of Fame achievements content based on current adventure status.
 * Shows available achievement badges and progression milestones.
 * 
 * @param questStatus - Current quest status from the adventure engine
 * @returns Formatted markdown string containing achievements hall
 */
export function generateAchievementHall(questStatus: string): string {
  return `# 🏆 Hall of Debugging Fame

${questStatus}

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

*Your heroic deeds in the realm of debugging shall be remembered forever!* ⚔️`;
}
