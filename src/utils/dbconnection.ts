import {drizzle} from "drizzle-orm/node-postgres"
import pg from 'pg';
import * as schema from "../drizzle/schema"
import dotenv from "dotenv"

dotenv.config()

const { Pool } = pg;

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL!,
})



const db = drizzle(pool, {schema:schema})



export default db

