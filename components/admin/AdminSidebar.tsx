import React from 'react';
import { AdminSidebarContent } from './AdminSidebarContent';

interface AdminSidebarProps {
  open: boolean;
  onClose: () => void;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({ open, onClose }) => (
  <>
    {/* Desktop sidebar */}
    <aside className="admin-desktop-sidebar admin-sidebar-glow hidden w-[17rem] shrink-0 flex-col border-e border-white/5 text-white shadow-2xl shadow-indigo-950/30 md:flex">
      <AdminSidebarContent variant="dark" />
    </aside>

    {/* Mobile drawer overlay */}
    <div
      className={`admin-mobile-overlay fixed inset-0 z-40 bg-slate-950/60 backdrop-blur-sm transition-opacity duration-300 md:hidden ${
        open ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
      }`}
      aria-hidden={!open}
      onClick={onClose}
    />

    {/* Mobile drawer — slides from physical right (RTL admin) */}
    <aside
      aria-hidden={!open}
      className={`admin-mobile-drawer admin-sidebar-glow fixed inset-y-0 right-0 z-50 flex w-[min(18rem,88vw)] flex-col text-white shadow-2xl transition-transform duration-300 ease-out md:hidden ${
        open ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      <AdminSidebarContent variant="dark" showClose onClose={onClose} onNavigate={onClose} />
    </aside>
  </>
);
