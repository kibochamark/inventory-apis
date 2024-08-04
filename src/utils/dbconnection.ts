import {drizzle} from "drizzle-orm/node-postgres"
import pg from 'pg';
import schema from "../drizzle/schema"

const { Pool } = pg;

const pool = new Pool({
  connectionString: "postgresql://default:rIuSWyom4z9U@ep-snowy-morning-a4a7632h.us-east-1.aws.neon.tech:5432/verceldb?sslmode=require",
})



const db = drizzle(pool, {schema:schema})



export default db

