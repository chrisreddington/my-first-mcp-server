# Copilot Instructions for Rubber Ducking Adventure MCP Server

This is a Model Context Protocol (MCP) server implementation in TypeScript that gamifies debugging through fantasy adventure quests.

## Features

- **start_quest**: Begin a debugging adventure by describing your bug - gets classified and turned into an epic quest
- **continue_quest**: Progress through your debugging journey by sharing findings and discoveries
- **get_quest_status**: View your current quest progress, hero stats, and debugging achievements
- **seek_wisdom**: Ask for specific guidance on debugging approaches, testing, or investigation techniques
- **complete_quest**: Celebrate your victory when you've conquered the bug!

## Development

This project uses the [MCP TypeScript SDK](https://github.com/modelcontextprotocol/typescript-sdk) to create an MCP server that transforms debugging into an engaging adventure game experience.

## Core Principles

- **Never solve problems directly** - Guide users to discover solutions themselves through thoughtful questions
- **Gamify the experience** - Use fantasy themes and progression to make debugging more engaging
- **Encourage systematic thinking** - Structure debugging into phases (preparation, investigation, battle, victory)
- **Celebrate progress** - Acknowledge breakthroughs and learning moments
- **Build confidence** - Help developers feel like heroic problem-solvers

## References

- [MCP SDK Documentation](https://github.com/modelcontextprotocol/create-python-server)
- [Model Context Protocol Specification](https://modelcontextprotocol.io/)
- [Rubber Ducking Debugging Technique](https://en.wikipedia.org/wiki/Rubber_duck_debugging)

## Building

Run `npm run build` to compile the TypeScript code and prepare the server for execution.

## Running

The server runs using stdio transport and communicates via JSON-RPC messages. It's designed to be used with MCP clients like Claude Desktop to provide an interactive debugging adventure experience.
