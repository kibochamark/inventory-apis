import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  schema: "./src/drizzle/schema.ts",
  out: "./drizzle",
  dbCredentials: {
    url: "postgres://default:rIuSWyom4z9U@ep-snowy-morning-a4a7632h.us-east-1.aws.neon.tech:5432/verceldb?sslmode=require",
  },
});