const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

async function main() {
    await supabase.from('social_links').update({ icon_key: 'facebook' }).eq('platform', 'Facebook');
    await supabase.from('social_links').update({ icon_key: 'tiktok' }).eq('platform', 'TikTok');

    const { data } = await supabase.from('social_links').select('*');
    console.log('Updated links:', data);
}

main();
