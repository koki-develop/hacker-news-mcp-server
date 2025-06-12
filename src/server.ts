import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import packageJson from "../package.json" with { type: "json" };
import { registerTools } from "./mcp.js";

export async function runServer() {
  // Create MCP server
  const server = new McpServer({
    name: "hacker-news",
    version: packageJson.version,
  });

  registerTools(server);

  // Start server
  const transport = new StdioServerTransport();
  await server.connect(transport);
}
