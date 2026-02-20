import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { HostsList } from '@/components/admin/hosts-list';

export default async function AdminHostsPage() {
    const supabase = await createClient();

    const { data: hosts } = await supabase
        .from('hosts')
        .select('*')
        .order('created_at', { ascending: false });

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold font-serif text-gray-900">Team / Hosts</h1>
                <Link href="/admin/hosts/new">
                    <Button className="bg-[#E4192B] hover:bg-[#c41525] text-white gap-2">
                        <Plus className="w-4 h-4" /> Add Team Member
                    </Button>
                </Link>
            </div>

            <HostsList initialHosts={hosts || []} />
        </div>
    );
}
