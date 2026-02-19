'use client';

import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import { Loader2, LogOut } from 'lucide-react';
import { useState } from 'react';

export function SignOutButton() {
    const router = useRouter();
    const supabase = createClient();
    const [loading, setLoading] = useState(false);

    const handleSignOut = async () => {
        setLoading(true);
        await supabase.auth.signOut();
        router.push('/login');
        router.refresh();
        setLoading(false);
    };

    return (
        <button
            className="w-full flex items-center gap-3 px-3 py-2.5 text-[13px] font-medium text-white/40 rounded-lg
                hover:bg-white/[0.06] hover:text-[#E4192B] transition-all duration-150"
            onClick={handleSignOut}
            disabled={loading}
        >
            {loading ? <Loader2 className="w-[18px] h-[18px] animate-spin" /> : <LogOut className="w-[18px] h-[18px]" />}
            Sign Out
        </button>
    );
}
