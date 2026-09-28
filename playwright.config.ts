import { defineConfig } from "@playwright/test"

// Includes the requested matrix, 360px phones, and short landscape screens.
const viewports = [
  [320, 568], [360, 800], [375, 667], [390, 844], [414, 896],
  [667, 375], [844, 390], [768, 1024], [820, 1180], [1024, 768],
  [1280, 720], [1366, 768], [1440, 900], [1536, 864], [1600, 900],
  [1920, 1080], [2560, 1440],
] as const

export default defineConfig({
  testDir: "./tests",
  testMatch: "responsiveness.spec.ts",
  fullyParallel: true,
  workers: 3,
  timeout: 120_000,
  expect: { timeout: 10_000 },
  reporter: [["list"], ["html", { open: "never" }]],
  use: {
    baseURL: process.env.AUDIT_BASE_URL || "http://localhost:3001",
    channel: "chrome",
    screenshot: "only-on-failure",
    trace: "retain-on-failure",
  },
  projects: viewports.map(([width, height]) => ({
    name: `${width}x${height}`,
    use: { viewport: { width, height }, hasTouch: width < 1024, isMobile: width < 1024 },
  })),
  webServer: {
    command: "node node_modules/next/dist/bin/next start --port 3001",
    url: "http://localhost:3001",
    reuseExistingServer: !process.env.CI,
    timeout: 30_000,
  },
})
