# Hacker News MCP Server

[![Version](https://img.shields.io/github/v/release/koki-develop/hacker-news-mcp-server)](https://github.com/koki-develop/hacker-news-mcp-server/releases/latest)
[![License](https://img.shields.io/github/license/koki-develop/hacker-news-mcp-server)](./LICENSE)
[![Docker](https://img.shields.io/badge/docker-ghcr.io-blue.svg)](https://github.com/koki-develop/hacker-news-mcp-server/pkgs/container/hacker-news-mcp-server)

A **Model Context Protocol (MCP) server** that connects the Hacker News API with AI assistants like Claude. This server enables AI assistants to fetch stories, comments, and other data from Hacker News, allowing you to explore and analyze the latest tech news through natural language conversations.

The Hacker News MCP server provides a bridge between AI assistants and the Hacker News platform, enabling seamless access to top stories, new posts, Ask HN discussions, Show HN projects, and job listings through conversational interfaces.

## Table of Contents

- [Usage](#usage)
- [MCP Tools](#mcp-tools)
  - [Items](#items)
  - [Stories](#stories)
- [License](#license)

## Usage

To use this server with an MCP client, add the following configuration:

```json
{
  "mcpServers": {
    "hacker-news": {
      "command": "docker",
      "args": [
        "run",
        "-i",
        "--rm",
        "ghcr.io/koki-develop/hacker-news-mcp-server:latest"
      ]
    }
  }
}
```

## MCP Tools

### Items

#### `hn_get_item`

Retrieve a Hacker News item (story, comment, job, poll, or poll option) by its ID.

**Parameters:**

| Parameter | Type   | Required | Description                    |
|-----------|--------|----------|--------------------------------|
| **`id`**  | number | **Yes**  | The ID of the item to retrieve |

### Stories

#### `hn_get_top_stories`

Get the current top stories on Hacker News.

**Parameters:**

| Parameter | Type   | Required | Description                                         |
|-----------|--------|----------|-----------------------------------------------------|
| `limit`   | number | No       | Number of stories to retrieve (default: 30, max: 500) |

#### `hn_get_new_stories`

Get the newest stories on Hacker News.

**Parameters:**

| Parameter | Type   | Required | Description                                         |
|-----------|--------|----------|-----------------------------------------------------|
| `limit`   | number | No       | Number of stories to retrieve (default: 30, max: 500) |

#### `hn_get_best_stories`

Get the best stories on Hacker News.

**Parameters:**

| Parameter | Type   | Required | Description                                         |
|-----------|--------|----------|-----------------------------------------------------|
| `limit`   | number | No       | Number of stories to retrieve (default: 30, max: 500) |

#### `hn_get_ask_stories`

Get the latest Ask HN stories.

**Parameters:**

| Parameter | Type   | Required | Description                                         |
|-----------|--------|----------|-----------------------------------------------------|
| `limit`   | number | No       | Number of stories to retrieve (default: 30, max: 200) |

#### `hn_get_show_stories`

Get the latest Show HN stories.

**Parameters:**

| Parameter | Type   | Required | Description                                         |
|-----------|--------|----------|-----------------------------------------------------|
| `limit`   | number | No       | Number of stories to retrieve (default: 30, max: 200) |

#### `hn_get_job_stories`

Get the latest job postings.

**Parameters:**

| Parameter | Type   | Required | Description                                         |
|-----------|--------|----------|-----------------------------------------------------|
| `limit`   | number | No       | Number of stories to retrieve (default: 30, max: 200) |

## License

[MIT](./LICENSE)
