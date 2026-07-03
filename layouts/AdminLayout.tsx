import React from 'react';
import { Outlet } from 'react-router-dom';
import { AdminSidebar } from '../components/admin/AdminSidebar';

export const AdminLayout: React.FC = () => (
  <div className="flex min-h-screen bg-gray-50" dir="rtl">
    <AdminSidebar />
    <main className="min-w-0 flex-1 overflow-auto">
      <Outlet />
    </main>
  </div>
);
