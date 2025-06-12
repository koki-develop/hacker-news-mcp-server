# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `bun run lint` - Check code quality with Biome
- `bun run format` - Auto-format code with Biome  
- `bun run typecheck` - TypeScript type checking
- `bun run build` - Build distributable using custom build script
- `bun run inspector` - Launch MCP inspector for development/debugging
- `bun start` - Run the MCP server

## Project Architecture

This is a **Hacker News MCP Server** that exposes the Hacker News API as MCP (Model Context Protocol) tools for AI agents.

### Core Structure
- **`index.ts`** - Entry point that calls `runServer()`
- **`src/server.ts`** - MCP server setup using stdio transport
- **`src/mcp.ts`** - Tool registration with 6 implemented MCP tools
- **`src/client.ts`** - HackerNewsClient class with rate limiting
- **`src/types.ts`** - TypeScript interfaces for Hacker News API responses

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

### Available MCP Tools
**Fully implemented and production-ready:**
1. `hn_get_item` - Get any item (story, comment, job, poll) by ID
2. `hn_get_top_stories` - Get top stories (up to 500)
3. `hn_get_new_stories` - Get newest stories (up to 500)
4. `hn_get_best_stories` - Get best stories (up to 500) 
5. `hn_get_ask_stories` - Get Ask HN stories (up to 200)
6. `hn_get_show_stories` - Get Show HN stories (up to 200)
7. `hn_get_job_stories` - Get job postings (up to 200)

### Implementation Details
- **Rate limiting**: Max 10 concurrent requests using `p-limit`
- **Error handling**: Proper HTTP error handling with descriptive messages
- **Validation**: Zod schema validation for all parameters
- **Types**: Complete TypeScript interfaces for all HN API responses

### Code Quality Setup
- **Biome** for formatting/linting with strict rules
- **TypeScript** in strict mode with ESNext target
- **Husky + lint-staged** for pre-commit hooks
- Uses **Bun** as runtime and package manager