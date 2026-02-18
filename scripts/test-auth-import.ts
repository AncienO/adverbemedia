import { createServerClient } from '@supabase/ssr';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

console.log('Testing @supabase/ssr import...');

try {
    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                getAll() { return [] },
                setAll(cookiesToSet) { console.log('Cookies to set:', cookiesToSet) }
            }
        }
    );
    console.log('Successfully created Supabase client!');
} catch (error) {
    console.error('Error creating client:', error);
}
