'use client';

import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import { Loader2, LogOut } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

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
        <Button
            variant="ghost"
            className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50 gap-3"
            onClick={handleSignOut}
            disabled={loading}
        >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <LogOut className="w-5 h-5" />}
            Sign Out
        </Button>
    );
}
