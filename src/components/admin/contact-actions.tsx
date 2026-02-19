'use client';

import { Button } from '@/components/ui/button';
import { Check, Trash2 } from 'lucide-react';
import { markAsRead, deleteContact } from '@/app/admin/_actions/contacts';
import { DeleteButton } from '@/components/admin/delete-button';
import { useRouter } from 'next/navigation';

export function ContactActions({ id, isRead }: { id: string; isRead: boolean }) {
    const router = useRouter();

    const handleMarkRead = async () => {
        await markAsRead(id);
        router.refresh();
    };

    const handleDelete = async () => {
        await deleteContact(id);
        router.refresh();
    };

    return (
        <div className="flex items-center gap-1 flex-shrink-0">
            {!isRead && (
                <Button size="sm" variant="ghost" onClick={handleMarkRead}
                    className="text-gray-400 hover:text-green-600 h-8 w-8 p-0" title="Mark as read">
                    <Check className="w-4 h-4" />
                </Button>
            )}
            <DeleteButton onDelete={handleDelete} itemName="message" />
        </div>
    );
}
