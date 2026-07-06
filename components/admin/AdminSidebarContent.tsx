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
  Sparkles,
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
      <div className={`flex items-center justify-between border-b px-4 py-5 sm:px-5 ${dark ? 'border-white/10' : 'border-gray-100'}`}>
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 shadow-lg shadow-indigo-500/30">
            <Sparkles className="size-5 text-white" />
          </div>
          <div className="min-w-0">
            <p className={`truncate text-base font-bold ${dark ? 'text-white' : 'text-gray-900'}`}>
              {adminLabels.siteName}
            </p>
            <p className={`truncate text-[11px] ${dark ? 'text-indigo-200/70' : 'text-gray-500'}`}>
              {adminLabels.siteTagline}
            </p>
          </div>
        </div>
        {showClose && (
          <button
            type="button"
            onClick={onClose}
            className={`shrink-0 rounded-xl p-2 transition ${dark ? 'text-slate-400 hover:bg-white/10 hover:text-white' : 'text-gray-500 hover:bg-gray-100'}`}
            aria-label="إغلاق"
          >
            <X className="size-5" />
          </button>
        )}
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto overscroll-contain p-3 pt-4">
        <p className={`mb-2 px-3 text-[10px] font-semibold uppercase tracking-wider ${dark ? 'text-slate-500' : 'text-gray-400'}`}>
          القائمة الرئيسية
        </p>
        {navItems.map(({ to, end, label, icon: Icon, showBadge }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            onClick={handleNav}
            className={({ isActive }) =>
              `group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200 ${
                isActive
                  ? dark
                    ? 'admin-nav-active text-white'
                    : 'bg-indigo-50 text-indigo-700'
                  : dark
                    ? 'text-slate-400 hover:bg-white/8 hover:text-white'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`
            }
          >
            <Icon className="size-[1.125rem] shrink-0 opacity-90" />
            <span className="flex-1">{label}</span>
            {showBadge && pending > 0 && (
              <span className="rounded-full bg-gradient-to-l from-amber-500 to-orange-500 px-2 py-0.5 text-[10px] font-bold text-white shadow-sm">
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
          className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${
            dark ? 'text-slate-400 hover:bg-white/8 hover:text-white' : 'text-gray-600 hover:bg-gray-50'
          }`}
        >
          <ExternalLink className="size-[1.125rem] shrink-0" />
          {adminLabels.nav.publicSite}
        </a>
        <button
          type="button"
          onClick={() => {
            logout();
            navigate('/admin/login');
          }}
          className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${
            dark ? 'text-rose-400 hover:bg-rose-500/10 hover:text-rose-300' : 'text-red-600 hover:bg-red-50'
          }`}
        >
          <LogOut className="size-[1.125rem] shrink-0" />
          {adminLabels.nav.logout}
        </button>
      </div>
    </>
  );
};
