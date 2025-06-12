import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { HackerNewsClient } from "./client.js";
import type { HNItem } from "./types.js";

const client = new HackerNewsClient();

export function registerTools(server: McpServer) {
  // hn_get_item - Get item by ID (story, comment, job, poll)
  server.tool(
    "hn_get_item",
    {
      id: z
        .number()
        .int()
        .positive()
        .describe("The ID of the item to retrieve"),
    },
    {
      description:
        "Retrieve a Hacker News item (story, comment, job, poll, or poll option) by its ID",
    },
    async ({ id }) => {
      const result = await client.getItem(id);
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(result, null, 2),
          },
        ],
      };
    },
  );

  // hn_get_top_stories - Get top stories
  server.tool(
    "hn_get_top_stories",
    {
      limit: z
        .number()
        .int()
        .min(1)
        .max(500)
        .default(30)
        .describe("Number of stories to retrieve (default: 30, max: 500)"),
    },
    {
      description: "Get the current top stories on Hacker News",
    },
    async ({ limit = 30 }) => {
      const storyIds = await client.getTopStories();
      const limitedIds = storyIds.slice(0, limit);
      const stories: (HNItem | null)[] = await Promise.all(
        limitedIds.map((id) => client.getItem(id)),
      );
      const validStories = stories.filter(
        (story): story is HNItem => story !== null,
      );
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(validStories, null, 2),
          },
        ],
      };
    },
  );

  // hn_get_new_stories - Get new stories
  server.tool(
    "hn_get_new_stories",
    {
      limit: z
        .number()
        .int()
        .min(1)
        .max(500)
        .default(30)
        .describe("Number of stories to retrieve (default: 30, max: 500)"),
    },
    {
      description: "Get the newest stories on Hacker News",
    },
    async ({ limit = 30 }) => {
      const storyIds = await client.getNewStories();
      const limitedIds = storyIds.slice(0, limit);
      const stories: (HNItem | null)[] = await Promise.all(
        limitedIds.map((id) => client.getItem(id)),
      );
      const validStories = stories.filter(
        (story): story is HNItem => story !== null,
      );
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(validStories, null, 2),
          },
        ],
      };
    },
  );

  // hn_get_best_stories - Get best stories
  server.tool(
    "hn_get_best_stories",
    {
      limit: z
        .number()
        .int()
        .min(1)
        .max(500)
        .default(30)
        .describe("Number of stories to retrieve (default: 30, max: 500)"),
    },
    {
      description: "Get the best stories on Hacker News",
    },
    async ({ limit = 30 }) => {
      const storyIds = await client.getBestStories();
      const limitedIds = storyIds.slice(0, limit);
      const stories: (HNItem | null)[] = await Promise.all(
        limitedIds.map((id) => client.getItem(id)),
      );
      const validStories = stories.filter(
        (story): story is HNItem => story !== null,
      );
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(validStories, null, 2),
          },
        ],
      };
    },
  );

  // hn_get_ask_stories - Get Ask HN stories
  server.tool(
    "hn_get_ask_stories",
    {
      limit: z
        .number()
        .int()
        .min(1)
        .max(200)
        .default(30)
        .describe("Number of stories to retrieve (default: 30, max: 200)"),
    },
    {
      description: "Get the latest Ask HN stories",
    },
    async ({ limit = 30 }) => {
      const storyIds = await client.getAskStories();
      const limitedIds = storyIds.slice(0, limit);
      const stories: (HNItem | null)[] = await Promise.all(
        limitedIds.map((id) => client.getItem(id)),
      );
      const validStories = stories.filter(
        (story): story is HNItem => story !== null,
      );
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(validStories, null, 2),
          },
        ],
      };
    },
  );

  // hn_get_show_stories - Get Show HN stories
  server.tool(
    "hn_get_show_stories",
    {
      limit: z
        .number()
        .int()
        .min(1)
        .max(200)
        .default(30)
        .describe("Number of stories to retrieve (default: 30, max: 200)"),
    },
    {
      description: "Get the latest Show HN stories",
    },
    async ({ limit = 30 }) => {
      const storyIds = await client.getShowStories();
      const limitedIds = storyIds.slice(0, limit);
      const stories: (HNItem | null)[] = await Promise.all(
        limitedIds.map((id) => client.getItem(id)),
      );
      const validStories = stories.filter(
        (story): story is HNItem => story !== null,
      );
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(validStories, null, 2),
          },
        ],
      };
    },
  );

  // hn_get_job_stories - Get job stories
  server.tool(
    "hn_get_job_stories",
    {
      limit: z
        .number()
        .int()
        .min(1)
        .max(200)
        .default(30)
        .describe("Number of stories to retrieve (default: 30, max: 200)"),
    },
    {
      description: "Get the latest job postings",
    },
    async ({ limit = 30 }) => {
      const storyIds = await client.getJobStories();
      const limitedIds = storyIds.slice(0, limit);
      const stories: (HNItem | null)[] = await Promise.all(
        limitedIds.map((id) => client.getItem(id)),
      );
      const validStories = stories.filter(
        (story): story is HNItem => story !== null,
      );
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(validStories, null, 2),
          },
        ],
      };
    },
  );
}
