import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { AdminSidebar } from '../components/admin/AdminSidebar';
import { AdminMobileHeader } from '../components/admin/AdminMobileHeader';
import { AdminTopBar } from '../components/admin/AdminTopBar';
import { AdminBottomNav } from '../components/admin/AdminBottomNav';
import { adminLabels } from '../data/adminLabels';
import { useBodyScrollLock } from '../hooks/useBodyScrollLock';

const pageTitles: Record<string, string> = {
  '/admin': adminLabels.dashboard.title,
  '/admin/applications': adminLabels.applications.title,
  '/admin/destinations': adminLabels.destinations.title,
  '/admin/settings': adminLabels.settings.title,
};

function resolveTitle(pathname: string): string {
  if (pathname.startsWith('/admin/applications/') && pathname !== '/admin/applications') {
    return adminLabels.detail.title;
  }
  return pageTitles[pathname] ?? adminLabels.siteName;
}

export const AdminLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { pathname } = useLocation();
  const title = resolveTitle(pathname);

  useBodyScrollLock(sidebarOpen);

  return (
    <div
      data-admin-layout
      className="admin-root flex h-[100dvh] w-full overflow-hidden bg-slate-100"
      dir="rtl"
      style={{ maxWidth: '100vw' }}
    >
      <AdminSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex min-h-0 min-w-0 flex-1 flex-col">
        <AdminMobileHeader title={title} onMenuClick={() => setSidebarOpen(true)} />
        <AdminTopBar />
        <main className="admin-main min-h-0 flex-1 overflow-x-hidden overflow-y-auto overscroll-y-auto pb-[calc(4.5rem+env(safe-area-inset-bottom))] md:pb-0">
          <div className="admin-fade-in">
            <Outlet />
          </div>
        </main>
        <AdminBottomNav />
      </div>
    </div>
  );
};
