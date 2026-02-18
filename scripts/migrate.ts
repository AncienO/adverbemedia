import { Client } from 'pg';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';

// Load environment variables from .env.local
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const connectionString = process.env.SUPABASE_DB_CONNECTION_STRING;

if (!connectionString) {
    console.error('Missing SUPABASE_DB_CONNECTION_STRING in .env.local');
    process.exit(1);
}

const client = new Client({
    connectionString,
});

async function migrate() {
    try {
        await client.connect();
        console.log('Connected to Database for Migration...');

        const schemaPath = path.resolve(process.cwd(), 'supabase/schema.sql');
        const schemaSql = fs.readFileSync(schemaPath, 'utf8');

        console.log('Executing Schema SQL...');
        await client.query(schemaSql);

        console.log('Migration Completed Successfully!');

    } catch (err) {
        console.error('Error during migration:', err);
    } finally {
        await client.end();
    }
}

migrate();
