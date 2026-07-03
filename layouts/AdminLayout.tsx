import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { AdminSidebar } from '../components/admin/AdminSidebar';
import { AdminMobileHeader } from '../components/admin/AdminMobileHeader';
import { AdminTopBar } from '../components/admin/AdminTopBar';
import { AdminBottomNav } from '../components/admin/AdminBottomNav';
import { adminLabels } from '../data/adminLabels';

const pageTitles: Record<string, string> = {
  '/admin': adminLabels.dashboard.title,
  '/admin/applications': adminLabels.applications.title,
  '/admin/destinations': adminLabels.destinations.title,
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

  return (
    <div className="flex min-h-screen bg-slate-50" dir="rtl">
      <AdminSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex min-w-0 flex-1 flex-col">
        <AdminMobileHeader title={title} onMenuClick={() => setSidebarOpen(true)} />
        <AdminTopBar title={title} />
        <main className="flex-1 overflow-x-hidden overflow-y-auto pb-20 lg:pb-0">
          <Outlet />
        </main>
        <AdminBottomNav />
      </div>
    </div>
  );
};
