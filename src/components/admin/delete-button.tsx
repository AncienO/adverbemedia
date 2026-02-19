'use client';

import { useState } from 'react';
import { Trash2, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface DeleteButtonProps {
    onDelete: () => Promise<void | { error?: string }>;
    itemName?: string;
}

export function DeleteButton({ onDelete, itemName = 'item' }: DeleteButtonProps) {
    const [confirming, setConfirming] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleDelete = async () => {
        setLoading(true);
        await onDelete();
        setLoading(false);
        setConfirming(false);
    };

    if (confirming) {
        return (
            <div className="flex items-center gap-2">
                <span className="text-xs text-red-600">Delete {itemName}?</span>
                <Button size="sm" variant="destructive" onClick={handleDelete} disabled={loading} className="h-7 text-xs">
                    {loading ? <Loader2 className="w-3 h-3 animate-spin" /> : 'Yes'}
                </Button>
                <Button size="sm" variant="ghost" onClick={() => setConfirming(false)} disabled={loading} className="h-7 text-xs">
                    No
                </Button>
            </div>
        );
    }

    return (
        <Button
            size="sm"
            variant="ghost"
            onClick={() => setConfirming(true)}
            className="text-gray-400 hover:text-red-600 h-8 w-8 p-0"
        >
            <Trash2 className="w-4 h-4" />
        </Button>
    );
}
