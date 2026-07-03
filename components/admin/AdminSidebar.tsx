import React from 'react';
import { AdminSidebarContent } from './AdminSidebarContent';

interface AdminSidebarProps {
  open: boolean;
  onClose: () => void;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({ open, onClose }) => (
  <>
    {/* Desktop sidebar */}
    <aside className="admin-desktop-sidebar hidden w-64 shrink-0 flex-col border-e border-white/10 bg-gradient-to-b from-slate-900 to-slate-800 text-white md:flex">
      <AdminSidebarContent variant="dark" />
    </aside>

    {/* Mobile drawer overlay */}
    <div
      className={`admin-mobile-overlay fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity md:hidden ${
        open ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
      }`}
      aria-hidden={!open}
      onClick={onClose}
    />

    {/* Mobile drawer — slides from physical right (RTL admin) */}
    <aside
      aria-hidden={!open}
      className={`admin-mobile-drawer fixed inset-y-0 right-0 z-50 flex w-[min(18rem,88vw)] flex-col bg-gradient-to-b from-slate-900 to-slate-800 text-white shadow-2xl transition-transform duration-300 ease-out md:hidden ${
        open ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      <AdminSidebarContent variant="dark" showClose onClose={onClose} onNavigate={onClose} />
    </aside>
  </>
);
