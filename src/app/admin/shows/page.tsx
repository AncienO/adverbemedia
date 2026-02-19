import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ShowsList } from '@/components/admin/shows-list';

export default async function AdminShowsPage() {
    const supabase = await createClient();

    const { data: shows } = await supabase
        .from('shows')
        .select('*, categories(name)')
        .order('sort_order', { ascending: true })
        .order('created_at', { ascending: false });

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold font-serif text-gray-900">Shows</h1>
                <Link href="/admin/shows/new">
                    <Button className="bg-[#E4192B] hover:bg-[#c41525] text-white gap-2">
                        <Plus className="w-4 h-4" /> Add Show
                    </Button>
                </Link>
            </div>

            <ShowsList initialShows={shows || []} />
        </div>
    );
}
