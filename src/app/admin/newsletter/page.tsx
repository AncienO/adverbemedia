import { createAdminClient } from '@/lib/supabase/admin';
import { Mail } from 'lucide-react';

export default async function AdminNewsletterPage() {
    const supabase = await createAdminClient();
    const { data: subscribers, error } = await supabase
        .from('newsletter_subscribers')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) console.error('Supabase newsletter_subscribers fetch error:', error);
    console.log('Fetched newsletter subscribers:', subscribers);

    const list = subscribers || [];

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold font-serif text-gray-900">Newsletter Subscribers</h1>
                    {list.length > 0 && (
                        <p className="text-sm text-gray-500 mt-1">{list.length} subscriber{list.length !== 1 ? 's' : ''}</p>
                    )}
                </div>
            </div>

            <div className="space-y-3">
                {list.map((subscriber: { id: string; email: string; created_at: string }) => (
                    <div key={subscriber.id} className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 md:p-6">
                        <div className="flex items-start gap-3">
                            <div className="mt-1 flex-shrink-0">
                                <Mail className="w-5 h-5 text-gray-400" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="font-semibold text-gray-900">{subscriber.email}</p>
                                <p className="text-xs text-gray-400 mt-1">
                                    Subscribed {new Date(subscriber.created_at).toLocaleString()}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
                {list.length === 0 && (
                    <div className="bg-white rounded-lg p-12 text-center text-gray-400">
                        No newsletter subscribers yet.
                    </div>
                )}
            </div>
        </div>
    );
}
