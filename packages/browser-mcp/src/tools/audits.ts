
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

// Define audit categories as enum to match the server's AuditCategory enum
enum AuditCategory {
  ACCESSIBILITY = "accessibility",
  PERFORMANCE = "performance",
  SEO = "seo",
  BEST_PRACTICES = "best-practices",
  PWA = "pwa",
}

export function registerAuditTools(server: McpServer, withServerConnection: <T>(apiCall: () => Promise<T>) => Promise<T | any>, discoveredHost: string, discoveredPort: number) {
  // Add tool for accessibility audits, launches a headless browser instance
  server.tool(
    "runAccessibilityAudit",
    "Run an accessibility audit on the current page",
    {},
    async () => {
      return await withServerConnection(async () => {
        try {
          console.log(
            `Sending POST request to http://${discoveredHost}:${discoveredPort}/accessibility-audit`
          );
          const response = await fetch(
            `http://${discoveredHost}:${discoveredPort}/accessibility-audit`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
              },
              body: JSON.stringify({
                category: AuditCategory.ACCESSIBILITY,
                source: "mcp_tool",
                timestamp: Date.now(),
              }),
            }
          );

          // Log the response status
          console.log(`Accessibility audit response status: ${response.status}`);

          if (!response.ok) {
            const errorText = await response.text();
            console.error(`Accessibility audit error: ${errorText}`);
            throw new Error(`Server returned ${response.status}: ${errorText}`);
          }

          const json = await response.json();

                  // flatten it by merging metadata with the report contents
          if (json.report) {
            const { metadata, report } = json;
            const flattened = {
              ...metadata,
              ...report,
            };

            return {
              content: [
                {
                  type: "text",
                  text: JSON.stringify(flattened, null, 2),
                },
              ],
            };
          } else {
            return {
              content: [
                {
                  type: "text",
                  text: JSON.stringify(json, null, 2),
                },
              ],
            };
          }
        } catch (error) {
          const errorMessage =
            error instanceof Error ? error.message : String(error);
          console.error("Error in accessibility audit:", errorMessage);
          return {
            content: [
              {
                type: "text",
                text: `Failed to run accessibility audit: ${errorMessage}`,
              },
            ],
          };
        }
      });
    }
  );

  // Add tool for performance audits, launches a headless browser instance
  server.tool(
    "runPerformanceAudit",
    "Run a performance audit on the current page",
    {},
    async () => {
      return await withServerConnection(async () => {
        try {
                  // Simplified approach - let the browser connector handle the current tab and URL
          console.log(
            `Sending POST request to http://${discoveredHost}:${discoveredPort}/performance-audit`
          );
          const response = await fetch(
            `http://${discoveredHost}:${discoveredPort}/performance-audit`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
              },
              body: JSON.stringify({
                category: AuditCategory.PERFORMANCE,
                source: "mcp_tool",
                timestamp: Date.now(),
              }),
            }
          );

          console.log(`Performance audit response status: ${response.status}`);

          if (!response.ok) {
            const errorText = await response.text();
            console.error(`Performance audit error: ${errorText}`);
            throw new Error(`Server returned ${response.status}: ${errorText}`);
          }

          const json = await response.json();

          if (json.report) {
            const { metadata, report } = json;
            const flattened = {
              ...metadata,
              ...report,
            };

            return {
              content: [
                {
                  type: "text",
                  text: JSON.stringify(flattened, null, 2),
                },
              ],
            };
          } else {
            return {
              content: [
                {
                  type: "text",
                  text: JSON.stringify(json, null, 2),
                },
              ],
            };
          }
        } catch (error) {
          const errorMessage =
            error instanceof Error ? error.message : String(error);
          console.error("Error in performance audit:", errorMessage);
          return {
            content: [
              {
                type: "text",
                text: `Failed to run performance audit: ${errorMessage}`,
              },
            ],
          };
        }
      });
    }
  );

  // Add tool for SEO audits, launches a headless browser instance
  server.tool(
    "runSEOAudit",
    "Run an SEO audit on the current page",
    {},
    async () => {
      return await withServerConnection(async () => {
        try {
          console.log(
            `Sending POST request to http://${discoveredHost}:${discoveredPort}/seo-audit`
          );
          const response = await fetch(
            `http://${discoveredHost}:${discoveredPort}/seo-audit`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
              },
              body: JSON.stringify({
                category: AuditCategory.SEO,
                source: "mcp_tool",
                timestamp: Date.now(),
              }),
            }
          );

          // Log the response status
          console.log(`SEO audit response status: ${response.status}`);

          if (!response.ok) {
            const errorText = await response.text();
            console.error(`SEO audit error: ${errorText}`);
            throw new Error(`Server returned ${response.status}: ${errorText}`);
          }

          const json = await response.json();

          return {
            content: [
              {
                type: "text",
                text: JSON.stringify(json, null, 2),
              },
            ],
          };
        } catch (error) {
          const errorMessage =
            error instanceof Error ? error.message : String(error);
          console.error("Error in SEO audit:", errorMessage);
          return {
            content: [
              {
                type: "text",
                text: `Failed to run SEO audit: ${errorMessage}`,
              },
            ],
          };
        }
      });
    }
  );

  // Add tool for Best Practices audits, launches a headless browser instance
  server.tool(
    "runBestPracticesAudit",
    "Run a best practices audit on the current page",
    {},
    async () => {
      return await withServerConnection(async () => {
        try {
          console.log(
            `Sending POST request to http://${discoveredHost}:${discoveredPort}/best-practices-audit`
          );
          const response = await fetch(
            `http://${discoveredHost}:${discoveredPort}/best-practices-audit`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
              },
              body: JSON.stringify({
                source: "mcp_tool",
                timestamp: Date.now(),
              }),
            }
          );

          // Check for errors
          if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Server returned ${response.status}: ${errorText}`);
          }

          const json = await response.json();

          // flatten it by merging metadata with the report contents
          if (json.report) {
            const { metadata, report } = json;
            const flattened = {
              ...metadata,
              ...report,
            };

            return {
              content: [
                {
                  type: "text",
                  text: JSON.stringify(flattened, null, 2),
                },
              ],
            };
          } else {
            // Return as-is if it's not in the new format
            return {
              content: [
                {
                  type: "text",
                  text: JSON.stringify(json, null, 2),
                },
              ],
            };
          }
        } catch (error) {
          const errorMessage =
            error instanceof Error ? error.message : String(error);
          console.error("Error in Best Practices audit:", errorMessage);
          return {
            content: [
              {
                type: "text",
                text: `Failed to run Best Practices audit: ${errorMessage}`,
              },
            ],
          };
        }
      });
    }
  );
}
