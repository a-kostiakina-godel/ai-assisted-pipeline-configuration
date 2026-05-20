import { defineConfig, devices } from "@playwright/test";
import * as dotenv from "dotenv";

dotenv.config();

const isCI = !!process.env.CI;

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: isCI,
  retries: 1,
  workers: 3,
  reporter: [["html"]],
  globalSetup: "./globalSetup",
  use: {
    baseURL: process.env.BASE_URL ?? "https://www.saucedemo.com",
    headless: true,
    screenshot: "only-on-failure",
    video: "on",
    trace: "retain-on-failure",
  },
  projects: [
    {
      name: "unauthenticated",
      testMatch: ["**/auth.spec.ts"],
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "authenticated",
      testIgnore: "**/auth.spec.ts",
      use: {
        ...devices["Desktop Chrome"],
        storageState: ".auth/session.json",
      },
    },
  ],
  timeout: 30_000,
  expect: {
    timeout: 5_000,
  },
});
