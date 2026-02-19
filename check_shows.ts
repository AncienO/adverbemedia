import { createClient } from './src/lib/supabase/server';

async function check() {
    const supabase = await createClient();
    const { data: shows, error } = await supabase.from('shows').select('title, status, slug, cover_image_url');
    if (error) console.error(error);
    else console.log(JSON.stringify(shows, null, 2));
}

check();
