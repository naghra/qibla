import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  FileText,
  Globe,
  LogOut,
  ExternalLink,
  X,
  Settings,
} from 'lucide-react';
import { useAdminAuth } from '../../context/AdminAuthContext';
import { adminLabels } from '../../data/adminLabels';
import { usePendingCount } from '../../hooks/usePendingCount';

const navItems = [
  { to: '/admin', end: true, label: adminLabels.nav.dashboard, icon: LayoutDashboard },
  { to: '/admin/applications', end: false, label: adminLabels.nav.applications, icon: FileText, showBadge: true },
  { to: '/admin/destinations', end: false, label: adminLabels.nav.destinations, icon: Globe },
  { to: '/admin/settings', end: false, label: adminLabels.nav.settings, icon: Settings },
];

interface AdminSidebarContentProps {
  onNavigate?: () => void;
  showClose?: boolean;
  onClose?: () => void;
  variant?: 'dark' | 'light';
}

export const AdminSidebarContent: React.FC<AdminSidebarContentProps> = ({
  onNavigate,
  showClose = false,
  onClose,
  variant = 'dark',
}) => {
  const { logout } = useAdminAuth();
  const navigate = useNavigate();
  const pending = usePendingCount();
  const dark = variant === 'dark';

  const handleNav = () => onNavigate?.();

  return (
    <>
      <div className={`flex items-center justify-between border-b px-4 py-4 sm:px-5 sm:py-5 ${dark ? 'border-white/10' : 'border-gray-100'}`}>
        <div className="min-w-0">
          <p className={`truncate text-lg font-bold ${dark ? 'text-white' : 'text-gray-900'}`}>
            {adminLabels.siteName}
          </p>
          <p className={`truncate text-xs ${dark ? 'text-slate-400' : 'text-gray-500'}`}>
            {adminLabels.siteTagline}
          </p>
        </div>
        {showClose && (
          <button
            type="button"
            onClick={onClose}
            className={`shrink-0 rounded-lg p-2 ${dark ? 'text-slate-400 hover:bg-white/10' : 'text-gray-500 hover:bg-gray-100'}`}
            aria-label="إغلاق"
          >
            <X className="size-5" />
          </button>
        )}
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto overscroll-contain p-3">
        {navItems.map(({ to, end, label, icon: Icon, showBadge }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            onClick={handleNav}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition ${
                isActive
                  ? dark
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/30'
                    : 'bg-blue-50 text-blue-700'
                  : dark
                    ? 'text-slate-300 hover:bg-white/10 hover:text-white'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
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

      <div className={`space-y-1 border-t p-3 ${dark ? 'border-white/10' : 'border-gray-100'}`}>
        <a
          href="/en/"
          target="_blank"
          rel="noopener noreferrer"
          className={`flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium ${
            dark ? 'text-slate-300 hover:bg-white/10 hover:text-white' : 'text-gray-600 hover:bg-gray-50'
          }`}
        >
          <ExternalLink className="size-5 shrink-0" />
          {adminLabels.nav.publicSite}
        </a>
        <button
          type="button"
          onClick={() => {
            logout();
            navigate('/admin/login');
          }}
          className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium ${
            dark ? 'text-red-400 hover:bg-red-500/10' : 'text-red-600 hover:bg-red-50'
          }`}
        >
          <LogOut className="size-5 shrink-0" />
          {adminLabels.nav.logout}
        </button>
      </div>
    </>
  );
};
