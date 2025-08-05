
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

export function registerLoggingTools(server: McpServer, withServerConnection: <T>(apiCall: () => Promise<T>) => Promise<T | any>, discoveredHost: string, discoveredPort: number) {
  server.tool("getConsoleLogs", "Check our browser logs", async () => {
    return await withServerConnection(async () => {
      const response = await fetch(
        `http://${discoveredHost}:${discoveredPort}/console-logs`
      );
      const json = await response.json();
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(json, null, 2),
          },
        ],
      };
    });
  });

  server.tool(
    "getConsoleErrors",
    "Check our browsers console errors",
    async () => {
      return await withServerConnection(async () => {
        const response = await fetch(
          `http://${discoveredHost}:${discoveredPort}/console-errors`
        );
        const json = await response.json();
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(json, null, 2),
            },
          ],
        };
      });
    }
  );

  server.tool("getNetworkErrors", "Check our network ERROR logs", async () => {
    return await withServerConnection(async () => {
      const response = await fetch(
        `http://${discoveredHost}:${discoveredPort}/network-errors`
      );
      const json = await response.json();
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(json, null, 2),
          },
        ],
        isError: true,
      };
    });
  });

  server.tool("getNetworkLogs", "Check ALL our network logs", async () => {
    return await withServerConnection(async () => {
      const response = await fetch(
        `http://${discoveredHost}:${discoveredPort}/network-success`
      );
      const json = await response.json();
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(json, null, 2),
          },
        ],
      };
    });
  });

  server.tool("wipeLogs", "Wipe all browser logs from memory", async () => {
    return await withServerConnection(async () => {
      const response = await fetch(
        `http://${discoveredHost}:${discoveredPort}/wipelogs`,
        {
          method: "POST",
        }
      );
      const json = await response.json();
      return {
        content: [
          {
            type: "text",
            text: json.message,
          },
        ],
      };
    });
  });
}
