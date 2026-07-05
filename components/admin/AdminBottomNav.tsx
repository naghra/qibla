import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, FileText, Globe, Settings } from 'lucide-react';
import { adminLabels } from '../../data/adminLabels';
import { usePendingCount } from '../../hooks/usePendingCount';

const items = [
  { to: '/admin', end: true, label: adminLabels.nav.dashboard, icon: LayoutDashboard },
  { to: '/admin/applications', end: false, label: adminLabels.nav.applications, icon: FileText, badge: true },
  { to: '/admin/destinations', end: false, label: adminLabels.nav.destinations, icon: Globe },
  { to: '/admin/settings', end: false, label: adminLabels.nav.settings, icon: Settings },
];

export const AdminBottomNav: React.FC = () => {
  const pending = usePendingCount();

  return (
    <nav className="admin-bottom-nav admin-bottom-glass fixed inset-x-0 bottom-0 z-30 border-t border-slate-200/70 shadow-[0_-4px_24px_rgba(15,23,42,0.06)] md:hidden">
      <ul className="flex pb-[env(safe-area-inset-bottom)]">
        {items.map(({ to, end, label, icon: Icon, badge }) => (
          <li key={to} className="min-w-0 flex-1">
            <NavLink
              to={to}
              end={end}
              className={({ isActive }) =>
                `relative flex flex-col items-center gap-0.5 px-1 py-2.5 text-[10px] font-semibold transition active:scale-95 sm:text-[11px] ${
                  isActive ? 'admin-bottom-nav-active text-indigo-600' : 'text-slate-500'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <Icon className={`size-5 shrink-0 ${isActive ? 'text-indigo-600' : 'text-slate-500'}`} />
                  <span className="max-w-full truncate">{label}</span>
                  {badge && pending > 0 && (
                    <span className="absolute end-[20%] top-1 flex size-4 min-w-4 items-center justify-center rounded-full bg-gradient-to-l from-amber-500 to-orange-500 px-0.5 text-[9px] font-bold leading-none text-white shadow-sm">
                      {pending > 9 ? '9+' : pending}
                    </span>
                  )}
                </>
              )}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};
