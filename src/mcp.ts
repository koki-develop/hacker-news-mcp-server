import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import pLimit from "p-limit";
import { z } from "zod";
import { HackerNewsClient } from "./client";
import type { HNItem } from "./types";

const client = new HackerNewsClient();
const limit = pLimit(10); // Limit concurrent requests to 10

async function fetchStories(
  fetchIds: () => Promise<number[]>,
  maxStories: number,
): Promise<HNItem[]> {
  const storyIds = await fetchIds();
  const limitedIds = storyIds.slice(0, maxStories);

  const stories: (HNItem | null)[] = await Promise.all(
    limitedIds.map((id) => limit(() => client.getItem(id))),
  );

  return stories.filter((story): story is HNItem => story !== null);
}

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
      const stories = await fetchStories(() => client.getTopStories(), limit);
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(stories, null, 2),
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
      const stories = await fetchStories(() => client.getNewStories(), limit);
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(stories, null, 2),
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
      const stories = await fetchStories(() => client.getBestStories(), limit);
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(stories, null, 2),
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
      const stories = await fetchStories(() => client.getAskStories(), limit);
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(stories, null, 2),
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
      const stories = await fetchStories(() => client.getShowStories(), limit);
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(stories, null, 2),
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
      const stories = await fetchStories(() => client.getJobStories(), limit);
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(stories, null, 2),
          },
        ],
      };
    },
  );
}
