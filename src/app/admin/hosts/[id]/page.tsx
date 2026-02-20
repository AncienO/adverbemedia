import { getHost } from '@/app/admin/_actions/hosts';
import { HostForm } from '@/components/admin/host-form';
import { notFound } from 'next/navigation';

export default async function EditHostPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    // Fetch host data
    const host = await getHost(id);

    if (!host) {
        notFound();
    }

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold font-serif text-gray-900">Edit Team Member</h1>
            <HostForm host={host} />
        </div>
    );
}
