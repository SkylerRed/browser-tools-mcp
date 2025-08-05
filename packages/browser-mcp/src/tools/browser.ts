
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

export function registerBrowserTools(server: McpServer, withServerConnection: <T>(apiCall: () => Promise<T>) => Promise<T | any>, discoveredHost: string, discoveredPort: number) {
  server.tool(
    "takeScreenshot",
    "Take a screenshot of the current browser tab",
    async () => {
      return await withServerConnection(async () => {
        try {
          const response = await fetch(
            `http://${discoveredHost}:${discoveredPort}/capture-screenshot`,
            {
              method: "POST",
            }
          );

          const result = await response.json();

          if (response.ok) {
            return {
              content: [
                {
                  type: "text",
                  text: "Successfully saved screenshot",
                },
              ],
            };
          } else {
            return {
              content: [
                {
                  type: "text",
                  text: `Error taking screenshot: ${result.error}`,
                },
              ],
            };
          }
        } catch (error: any) {
          const errorMessage =
            error instanceof Error ? error.message : String(error);
          return {
            content: [
              {
                type: "text",
                text: `Failed to take screenshot: ${errorMessage}`,
              },
            ],
          };
        }
      });
    }
  );

  server.tool(
    "getSelectedElement",
    "Get the selected element from the browser",
    async () => {
      return await withServerConnection(async () => {
        const response = await fetch(
          `http://${discoveredHost}:${discoveredPort}/selected-element`
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
}
