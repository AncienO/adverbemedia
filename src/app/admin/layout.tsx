import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { AdminSidebar } from '@/components/admin/admin-sidebar';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  return (
    // <div className="min-h-screen bg-[#FAFAF9] flex font-inter">
    <div className="admin-layout min-h-screen bg-[#FAFAF9] flex">
      <AdminSidebar userEmail={user.email || ''} />

      {/* Main Content */}
      <main className="flex-1 md:ml-[260px] p-6 md:p-10 lg:p-12">
        {children}
      </main>
    </div>
  );
}
