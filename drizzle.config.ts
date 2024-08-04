import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  schema: "./src/drizzle/schema.ts",
  out: "./drizzle",
  dbCredentials: {
    url: "postgres://default:idqWZ2RsQ3ef@ep-summer-smoke-a4nod18e.us-east-1.aws.neon.tech:5432/verceldb?sslmode=require"
  },
});