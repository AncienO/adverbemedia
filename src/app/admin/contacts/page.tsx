import { createAdminClient } from '@/lib/supabase/admin';
import { Mail, MailOpen } from 'lucide-react';
import { ContactActions } from '@/components/admin/contact-actions';

export default async function AdminContactsPage() {
    const supabase = await createAdminClient();
    const { data: contactsData, error: contactsError } = await supabase.from('contacts').select('*');
    if (contactsError) console.error('Supabase contacts fetch error:', contactsError);
    console.log('Fetched contacts:', contactsData);

    // Fetch subscribers, defaulting to empty array if the table doesn't exist yet
    let subscribersData: any[] | null = [];
    try {
        const { data, error } = await supabase.from('subscribers').select('*');
        if (!error) subscribersData = data;
    } catch (e) {
        // Table probably missing or RLS error, fail silently so contacts still load
        console.error("Subscribers fetch fallback:", e);
    }

    // Format subscribers to match contact interface for unified display
    const formattedSubscribers = (subscribersData || []).map((sub: any) => ({
        id: sub.id,
        first_name: 'Newsletter',
        last_name: 'Subscriber',
        email: sub.email,
        subject: 'Newsletter Subscription',
        message: 'Subscribed to the newsletter.',
        is_read: false, // Or true, depending on how you want them treated by default
        created_at: sub.created_at,
        is_subscriber: true
    }));

    // Combine and sort by date descending
    const allContacts = [...(contactsData || []), ...formattedSubscribers].sort((a, b) => {
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    });

    const unreadCount = allContacts.filter((c: any) => !c.is_read && !c.is_subscriber).length || 0;

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold font-serif text-gray-900">Contacts & Subscribers</h1>
                    {unreadCount > 0 && (
                        <p className="text-sm text-gray-500 mt-1">{unreadCount} unread message{unreadCount > 1 ? 's' : ''}</p>
                    )}
                </div>
            </div>

            <div className="space-y-3">
                {allContacts.map((contact: any) => (
                    <div key={contact.id} className={`bg-white rounded-lg shadow-sm border p-4 md:p-6 ${!contact.is_read && !contact.is_subscriber ? 'border-[#E4192B]/30 bg-red-50/20' : 'border-gray-100'}`}>
                        <div className="flex items-start justify-between gap-4">
                            <div className="flex items-start gap-3 flex-1 min-w-0">
                                <div className="mt-1 flex-shrink-0">
                                    {(contact.is_read || contact.is_subscriber) ?
                                        <MailOpen className="w-5 h-5 text-gray-400" /> :
                                        <Mail className="w-5 h-5 text-[#E4192B]" />
                                    }
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex flex-wrap items-center gap-2 mb-1">
                                        <p className="font-semibold text-gray-900">{contact.first_name} {contact.last_name}</p>
                                        {!contact.is_read && !contact.is_subscriber && <span className="px-2 py-0.5 text-[10px] font-bold bg-[#E4192B] text-white rounded-full uppercase">New</span>}
                                        {contact.is_subscriber && <span className="px-2 py-0.5 text-[10px] font-bold bg-gray-200 text-gray-700 rounded-full uppercase">Subscriber</span>}
                                    </div>
                                    <p className="text-sm text-gray-500">{contact.email}</p>
                                    {contact.subject && <p className="text-sm font-medium text-gray-700 mt-2">{contact.subject}</p>}
                                    <p className="text-sm text-gray-600 mt-1 whitespace-pre-wrap">{contact.message}</p>
                                    <p className="text-xs text-gray-400 mt-3">{new Date(contact.created_at).toLocaleString()}</p>
                                </div>
                            </div>
                            {!contact.is_subscriber && <ContactActions id={contact.id} isRead={contact.is_read} />}
                        </div>
                    </div>
                ))}
                {allContacts.length === 0 && (
                    <div className="bg-white rounded-lg p-12 text-center text-gray-400">No contact submissions yet.</div>
                )}
            </div>
        </div>
    );
}
