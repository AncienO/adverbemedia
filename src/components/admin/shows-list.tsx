'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Pencil, ArrowUp, ArrowDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DeleteButton } from '@/components/admin/delete-button';
import { deleteShow, updateShowOrder } from '@/app/admin/_actions/shows';
import { toast } from 'sonner';

interface Show {
    id: string;
    title: string;
    slug: string;
    sort_order: number;
    // Add other fields as needed
    status: string;
    categories: { name: string } | null;
}

interface ShowsListProps {
    initialShows: any[]; // Using any to avoid strict type issues with Supabase result for now, but better to define
}

export function ShowsList({ initialShows }: ShowsListProps) {
    const [shows, setShows] = useState(initialShows);
    const [isReordering, setIsReordering] = useState(false);

    const moveItem = async (index: number, direction: 'up' | 'down') => {
        if (isReordering) return;

        const newShows = [...shows];
        if (direction === 'up') {
            if (index === 0) return;
            [newShows[index - 1], newShows[index]] = [newShows[index], newShows[index - 1]];
        } else {
            if (index === newShows.length - 1) return;
            [newShows[index + 1], newShows[index]] = [newShows[index], newShows[index + 1]];
        }

        setShows(newShows);
        setIsReordering(true);

        // Prepare updates
        const updates = newShows.map((show, idx) => ({
            id: show.id,
            sort_order: idx
        }));

        try {
            const result = await updateShowOrder(updates);
            if (result.error) {
                toast.error('Failed to update order');
                // Revert? Or just show error
                setShows(initialShows); // Revert to initial if failed (optimistic UI is complex)
            } else {
                toast.success('Order updated');
            }
        } catch (error) {
            toast.error('An error occurred');
        } finally {
            setIsReordering(false);
        }
    };

    return (
        <div className="space-y-6">
            {/* Desktop Table */}
            <div className="hidden md:block bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
                <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-100">
                        <tr>
                            <th className="w-12 px-6 py-3"></th>
                            <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Title</th>
                            <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Category</th>
                            <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Status</th>
                            <th className="text-right px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {shows.map((show, index) => (
                            <tr key={show.id} className="hover:bg-gray-50/50">
                                <td className="px-6 py-4">
                                    <div className="flex flex-col gap-1">
                                        <button
                                            onClick={() => moveItem(index, 'up')}
                                            disabled={index === 0 || isReordering}
                                            className="p-1 hover:bg-gray-100 rounded text-gray-400 hover:text-gray-600 disabled:opacity-30"
                                        >
                                            <ArrowUp className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={() => moveItem(index, 'down')}
                                            disabled={index === shows.length - 1 || isReordering}
                                            className="p-1 hover:bg-gray-100 rounded text-gray-400 hover:text-gray-600 disabled:opacity-30"
                                        >
                                            <ArrowDown className="w-4 h-4" />
                                        </button>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div>
                                        <p className="font-medium text-gray-900">{show.title}</p>
                                        <p className="text-xs text-gray-400">/{show.slug}</p>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-600">{show.categories?.name || '—'}</td>
                                <td className="px-6 py-4">
                                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${show.status === 'active' ? 'bg-green-100 text-green-700' :
                                        show.status === 'coming-soon' ? 'bg-yellow-100 text-yellow-700' :
                                            'bg-gray-100 text-gray-700'
                                        }`}>
                                        {show.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex items-center justify-end gap-1">
                                        <Link href={`/admin/shows/${show.id}/edit`}>
                                            <Button size="sm" variant="ghost" className="text-gray-400 hover:text-blue-600 h-8 w-8 p-0">
                                                <Pencil className="w-4 h-4" />
                                            </Button>
                                        </Link>
                                        <DeleteButton onDelete={async () => { await deleteShow(show.id); }} itemName="show" />
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {(!shows || shows.length === 0) && (
                    <div className="p-12 text-center text-gray-400">No shows yet. Create your first one!</div>
                )}
            </div>

            {/* Mobile Cards */}
            <div className="md:hidden space-y-3">
                {shows.map((show, index) => (
                    <div key={show.id} className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
                        <div className="flex items-start justify-between gap-4">
                            <div className="flex flex-col gap-1 pt-1">
                                <button
                                    onClick={() => moveItem(index, 'up')}
                                    disabled={index === 0 || isReordering}
                                    className="p-1 hover:bg-gray-100 rounded text-gray-400 hover:text-gray-600 disabled:opacity-30"
                                >
                                    <ArrowUp className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={() => moveItem(index, 'down')}
                                    disabled={index === shows.length - 1 || isReordering}
                                    className="p-1 hover:bg-gray-100 rounded text-gray-400 hover:text-gray-600 disabled:opacity-30"
                                >
                                    <ArrowDown className="w-4 h-4" />
                                </button>
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="font-medium text-gray-900 truncate">{show.title}</p>
                                <p className="text-xs text-gray-400 mt-1">{show.categories?.name || '—'}</p>
                                <span className={`inline-flex mt-2 px-2 py-1 text-xs font-semibold rounded-full ${show.status === 'active' ? 'bg-green-100 text-green-700' :
                                    show.status === 'coming-soon' ? 'bg-yellow-100 text-yellow-700' :
                                        'bg-gray-100 text-gray-700'
                                    }`}>
                                    {show.status}
                                </span>
                            </div>
                            <div className="flex items-center gap-1">
                                <Link href={`/admin/shows/${show.id}/edit`}>
                                    <Button size="sm" variant="ghost" className="h-8 w-8 p-0"><Pencil className="w-4 h-4" /></Button>
                                </Link>
                                <DeleteButton onDelete={async () => { await deleteShow(show.id); }} itemName="show" />
                            </div>
                        </div>
                    </div>
                ))}
                {(!shows || shows.length === 0) && (
                    <div className="bg-white rounded-lg p-8 text-center text-gray-400">No shows yet.</div>
                )}
            </div>
        </div>
    );
}
