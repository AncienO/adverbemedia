import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';

// Load environment variables from .env.local
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

console.log('Testing Supabase Connection...');
console.log('URL:', supabaseUrl);
// console.log('Key:', supabaseKey); // Don't log key

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkConnection() {
    try {
        const { data, error } = await supabase.from('shows').select('*').limit(1);
        if (error) {
            console.error('Supabase Error:', error.message, error.details, error.hint);
        } else {
            console.log('Supabase Connection Successful! Data:', data);
        }
    } catch (err) {
        console.error('Unexpected Error:', err);
    }
}

checkConnection();
