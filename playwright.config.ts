import { readFileSync } from "node:fs";
import { join } from "node:path";
import { defineConfig } from "@playwright/test";

// One project per application of oqas.json; the harness gives each its base address when it runs the tests.
const config = JSON.parse(readFileSync(join(import.meta.dirname, "oqas.json"), "utf8"));
const appsDir = config.repository?.appsDir ?? "apps";
const stateDir = config.repository?.stateDir ?? ".oqas";
const environment = process.env.OQAS_ENVIRONMENT;
const variable = (id) => `OQAS_BASE_URL_${id.toUpperCase().replace(/[^A-Z0-9]/g, "_")}`;
// The base address of an application: its interface, or else its first API.
const baseOf = (env) => env?.uiUrl ?? env?.apis?.[0]?.baseUrl;

export default defineConfig({
  testDir: appsDir,
  outputDir: join(stateDir, "test-results"),
  forbidOnly: true,
  retries: 0,
  use: { trace: "retain-on-failure", screenshot: "only-on-failure" },
  projects: config.applications.map((application) => ({
    name: application.id,
    testDir: join(appsDir, application.id),
    use: { baseURL: process.env[variable(application.id)] ?? baseOf(application.environments.find((env) => env.name === environment)) },
  })),
});
