import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

export async function GET() {
    const supabase = await createClient();

    // 1. Update MAD Conversations to coming-soon
    await supabase
        .from('shows')
        .update({ status: 'coming-soon' })
        .eq('slug', 'mad-conversations');

    // 2. Clear all coming-soon cover images
    const { error } = await supabase
        .from('shows')
        .update({ cover_image_url: null })
        .eq('status', 'coming-soon');

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
}
