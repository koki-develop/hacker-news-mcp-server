# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `bun run lint` - Check code quality with Biome
- `bun run format` - Auto-format code with Biome  
- `bun run typecheck` - TypeScript type checking
- `bun start` - Run the MCP server

## Project Architecture

This is a **Hacker News MCP Server** that exposes the Hacker News API as MCP (Model Context Protocol) tools for AI agents.

### Core Structure
- **`index.ts`** - Entry point that calls `runServer()`
- **`src/server.ts`** - MCP server setup using stdio transport
- **`src/mcp.ts`** - Tool registration (needs implementation)
- **`src/client.ts`** - HackerNewsClient class (needs implementation)

### MCP Server Pattern
Uses `@modelcontextprotocol/sdk` with stdio transport for CLI integration. The server registers tools that wrap Hacker News API calls, allowing AI agents to fetch stories, comments, and user data.

### Hacker News API Reference
**Full API documentation is available at `HackerNews/API/README.md`** - this contains complete endpoint details, data structures, and examples.

Key points from the API documentation:
- Base URL: `https://hacker-news.firebaseio.com/v0/`
- No rate limiting currently
- Items (stories, comments, jobs, polls) at `/item/<id>.json`
- Users at `/user/<id>.json`
- Live data endpoints: `/topstories.json`, `/newstories.json`, `/beststories.json`
- Category endpoints: `/askstories.json`, `/showstories.json`, `/jobstories.json`
- Max item ID at `/maxitem.json`
- Updates at `/updates.json`

### Current Implementation Status
**Requires implementation:**
1. `HackerNewsClient` - HTTP client for Firebase API calls
2. `registerTools` - MCP tool definitions for HN operations
3. TypeScript interfaces for API response types
4. Error handling and rate limiting

### Code Quality Setup
- **Biome** for formatting/linting with strict rules
- **TypeScript** in strict mode with ESNext target
- **Husky + lint-staged** for pre-commit hooks
- Uses **Bun** as runtime and package manager