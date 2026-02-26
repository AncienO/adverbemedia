import { createClient } from '@supabase/supabase-js'

// Creates a Supabase client with the Service Role key to bypass RLS.
// Uses @supabase/supabase-js directly (not the SSR cookie client) so the
// service role key is applied correctly and RLS is fully bypassed.
// WARNING: This should ONLY be used in secure Server Actions or Admin layout pages
// where the user's admin authorization has already been verified.
export async function createAdminClient() {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY!;

    if (!key) {
        throw new Error('SUPABASE_SERVICE_ROLE_KEY is not set. Admin client cannot be created.');
    }

    return createClient(url, key, {
        auth: {
            autoRefreshToken: false,
            persistSession: false,
        },
    });
}
