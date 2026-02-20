'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Pencil } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DeleteButton } from '@/components/admin/delete-button';
import { deleteHost } from '@/app/admin/_actions/hosts';
import Image from 'next/image';

interface Host {
    id: string;
    name: string;
    role: string | null;
    avatar_url: string | null;
    bio: string | null;
}

interface HostsListProps {
    initialHosts: Host[];
}

export function HostsList({ initialHosts }: HostsListProps) {
    const [hosts, setHosts] = useState(initialHosts);

    const handleDelete = async (id: string) => {
        await deleteHost(id);
        setHosts(hosts.filter(h => h.id !== id));
    }

    return (
        <div className="space-y-6">
            {/* Desktop Table */}
            <div className="hidden md:block bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
                <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-100">
                        <tr>
                            <th className="w-20 px-6 py-3"></th>
                            <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Name</th>
                            <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Role</th>
                            <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Biography</th>
                            <th className="text-right px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {hosts.map((host) => (
                            <tr key={host.id} className="hover:bg-gray-50/50">
                                <td className="px-6 py-4">
                                    <div className="relative w-10 h-10 rounded-full overflow-hidden bg-gray-100 border border-gray-200 flex items-center justify-center">
                                        {host.avatar_url ? (
                                            <Image src={host.avatar_url} alt={host.name} fill className="object-cover" />
                                        ) : (
                                            <span className="text-gray-400 font-bold text-sm">{host.name.charAt(0)}</span>
                                        )}
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <p className="font-medium text-gray-900">{host.name}</p>
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-600">
                                    <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-50 text-blue-700">
                                        {host.role || 'Host'}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-600 max-w-xs">
                                    <p className="line-clamp-2">{host.bio || '—'}</p>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex items-center justify-end gap-1">
                                        <Link href={`/admin/hosts/${host.id}`}>
                                            <Button size="sm" variant="ghost" className="text-gray-400 hover:text-blue-600 h-8 w-8 p-0">
                                                <Pencil className="w-4 h-4" />
                                            </Button>
                                        </Link>
                                        <DeleteButton onDelete={async () => { await handleDelete(host.id); }} itemName="host" />
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {(!hosts || hosts.length === 0) && (
                    <div className="p-12 text-center text-gray-400">No team members yet. Add your first host!</div>
                )}
            </div>

            {/* Mobile Cards */}
            <div className="md:hidden space-y-3">
                {hosts.map((host) => (
                    <div key={host.id} className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
                        <div className="flex items-center justify-between gap-4">
                            <div className="relative w-12 h-12 rounded-full overflow-hidden bg-gray-100 border border-gray-200 flex items-center justify-center flex-shrink-0">
                                {host.avatar_url ? (
                                    <Image src={host.avatar_url} alt={host.name} fill className="object-cover" />
                                ) : (
                                    <span className="text-gray-400 font-bold text-sm">{host.name.charAt(0)}</span>
                                )}
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="font-medium text-gray-900 truncate">{host.name}</p>
                                <span className="inline-flex mt-1 px-2 py-1 text-xs font-semibold rounded-full bg-blue-50 text-blue-700">
                                    {host.role || 'Host'}
                                </span>
                            </div>
                            <div className="flex items-center gap-1">
                                <Link href={`/admin/hosts/${host.id}`}>
                                    <Button size="sm" variant="ghost" className="h-8 w-8 p-0"><Pencil className="w-4 h-4" /></Button>
                                </Link>
                                <DeleteButton onDelete={async () => { await handleDelete(host.id); }} itemName="host" />
                            </div>
                        </div>
                    </div>
                ))}
                {(!hosts || hosts.length === 0) && (
                    <div className="bg-white rounded-lg p-8 text-center text-gray-400">No team members yet.</div>
                )}
            </div>
        </div>
    );
}
