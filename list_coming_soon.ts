import { Client } from 'pg';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

async function listShows() {
    const client = new Client({
        connectionString: process.env.SUPABASE_DB_CONNECTION_STRING,
    });
    await client.connect();
    try {
        const res = await client.query("SELECT title, status, cover_image_url FROM shows WHERE status = 'coming-soon'");
        console.log(JSON.stringify(res.rows, null, 2));
    } finally {
        await client.end();
    }
}

listShows().catch(console.error);
