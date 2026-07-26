import { defineConfig, devices } from "@playwright/test";

// Another local project may already hold :3000 — PORT lets you point the suite at the right server.
const PORT = process.env.PORT ?? "3000";
const BASE_URL = `http://localhost:${PORT}`;

export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: false,
  retries: 0,
  reporter: "list",
  use: { baseURL: BASE_URL, trace: "on-first-retry" },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
  webServer: {
    command: `next dev --port ${PORT}`,
    url: `${BASE_URL}/tr`,
    reuseExistingServer: true,
    timeout: 60_000,
  },
});
