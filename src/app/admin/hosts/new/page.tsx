import { HostForm } from '@/components/admin/host-form';

export default function NewHostPage() {
    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold font-serif text-gray-900">Add Team Member</h1>
            <HostForm />
        </div>
    );
}
