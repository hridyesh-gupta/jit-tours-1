// One-time setup: creates the `enquiries` table in your Neon database.
// Usage: npm run db:setup   (reads DATABASE_URL from your .env file)

import 'dotenv/config';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';
import { Client } from '@neondatabase/serverless';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

if (!process.env.DATABASE_URL) {
  console.error('❌ DATABASE_URL is not set. Add it to your .env file first (see .env.example).');
  process.exit(1);
}

const schema = readFileSync(path.join(__dirname, '..', 'db', 'schema.sql'), 'utf8');
const client = new Client(process.env.DATABASE_URL);

try {
  await client.connect();
  await client.query(schema);
  console.log('✅ Database ready — the "enquiries" table exists (created it if it was missing).');
} catch (err) {
  console.error('❌ Failed to set up the database:', err.message);
  process.exitCode = 1;
} finally {
  await client.end();
}
