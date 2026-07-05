import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, FileText, Globe } from 'lucide-react';
import { adminLabels } from '../../data/adminLabels';
import { usePendingCount } from '../../hooks/usePendingCount';

const items = [
  { to: '/admin', end: true, label: adminLabels.nav.dashboard, icon: LayoutDashboard },
  { to: '/admin/applications', end: false, label: adminLabels.nav.applications, icon: FileText, badge: true },
  { to: '/admin/destinations', end: false, label: adminLabels.nav.destinations, icon: Globe },
];

export const AdminBottomNav: React.FC = () => {
  const pending = usePendingCount();

  return (
    <nav className="admin-bottom-nav fixed inset-x-0 bottom-0 z-30 border-t border-gray-200 bg-white/95 backdrop-blur md:hidden">
      <ul className="flex pb-[env(safe-area-inset-bottom)]">
        {items.map(({ to, end, label, icon: Icon, badge }) => (
          <li key={to} className="min-w-0 flex-1">
            <NavLink
              to={to}
              end={end}
              className={({ isActive }) =>
                `relative flex flex-col items-center gap-0.5 px-1 py-2.5 text-[10px] font-medium transition active:scale-95 sm:text-xs ${
                  isActive ? 'text-blue-600' : 'text-gray-500'
                }`
              }
            >
              <Icon className="size-5 shrink-0" />
              <span className="max-w-full truncate">{label}</span>
              {badge && pending > 0 && (
                <span className="absolute end-[22%] top-1 flex size-4 min-w-4 items-center justify-center rounded-full bg-amber-500 px-0.5 text-[9px] font-bold leading-none text-white">
                  {pending > 9 ? '9+' : pending}
                </span>
              )}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};
