import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  FileText,
  Globe,
  LogOut,
  ExternalLink,
  X,
} from 'lucide-react';
import { useAdminAuth } from '../../context/AdminAuthContext';
import { adminLabels } from '../../data/adminLabels';
import { getPendingCount } from '../../services/applicationStore';

const navItems = [
  { to: '/admin', end: true, label: adminLabels.nav.dashboard, icon: LayoutDashboard },
  { to: '/admin/applications', end: false, label: adminLabels.nav.applications, icon: FileText, showBadge: true },
  { to: '/admin/destinations', end: false, label: adminLabels.nav.destinations, icon: Globe },
];

interface AdminSidebarProps {
  open: boolean;
  onClose: () => void;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({ open, onClose }) => {
  const { logout } = useAdminAuth();
  const navigate = useNavigate();
  const pending = getPendingCount();

  const handleNav = () => onClose();

  return (
    <>
      {open && (
        <button
          type="button"
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
          aria-label="إغلاق القائمة"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed inset-y-0 start-0 z-50 flex w-72 max-w-[85vw] flex-col border-e border-white/10 bg-gradient-to-b from-slate-900 to-slate-800 text-white shadow-2xl transition-transform duration-300 ease-out lg:static lg:z-auto lg:w-64 lg:max-w-none lg:translate-x-0 lg:shadow-none ${
          open ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'
        } ${!open ? 'pointer-events-none lg:pointer-events-auto' : ''}`}
      >
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-5">
          <div>
            <p className="text-lg font-bold">{adminLabels.siteName}</p>
            <p className="text-xs text-slate-400">{adminLabels.siteTagline}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-slate-400 hover:bg-white/10 lg:hidden"
            aria-label="إغلاق"
          >
            <X className="size-5" />
          </button>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto p-3">
          {navItems.map(({ to, end, label, icon: Icon, showBadge }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              onClick={handleNav}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/30'
                    : 'text-slate-300 hover:bg-white/10 hover:text-white'
                }`
              }
            >
              <Icon className="size-5 shrink-0" />
              <span className="flex-1">{label}</span>
              {showBadge && pending > 0 && (
                <span className="rounded-full bg-amber-500 px-2 py-0.5 text-xs font-bold text-white">
                  {pending}
                </span>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="space-y-1 border-t border-white/10 p-3">
          <a
            href="/en/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-300 hover:bg-white/10 hover:text-white"
          >
            <ExternalLink className="size-5" />
            {adminLabels.nav.publicSite}
          </a>
          <button
            type="button"
            onClick={() => {
              logout();
              navigate('/admin/login');
            }}
            className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-red-400 hover:bg-red-500/10"
          >
            <LogOut className="size-5" />
            {adminLabels.nav.logout}
          </button>
        </div>
      </aside>
    </>
  );
};
