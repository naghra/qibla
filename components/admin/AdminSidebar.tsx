import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  FileText,
  Globe,
  LogOut,
  ExternalLink,
} from 'lucide-react';
import { useAdminAuth } from '../../context/AdminAuthContext';
import { adminLabels } from '../../data/adminLabels';

const navItems = [
  { to: '/admin', end: true, label: adminLabels.nav.dashboard, icon: LayoutDashboard },
  { to: '/admin/applications', end: false, label: adminLabels.nav.applications, icon: FileText },
  { to: '/admin/destinations', end: false, label: adminLabels.nav.destinations, icon: Globe },
];

export const AdminSidebar: React.FC = () => {
  const { logout } = useAdminAuth();
  const navigate = useNavigate();

  return (
    <aside className="flex w-64 shrink-0 flex-col border-e border-gray-200 bg-white">
      <div className="border-b border-gray-100 px-5 py-5">
        <p className="text-lg font-bold text-gray-900">{adminLabels.siteName}</p>
        <p className="text-xs text-gray-500">Admin Panel</p>
      </div>

      <nav className="flex-1 space-y-1 p-3">
        {navItems.map(({ to, end, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${
                isActive
                  ? 'bg-blue-50 text-blue-700'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`
            }
          >
            <Icon className="size-5 shrink-0" />
            {label}
          </NavLink>
        ))}
      </nav>

      <div className="space-y-1 border-t border-gray-100 p-3">
        <a
          href="/en/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-50"
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
          className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50"
        >
          <LogOut className="size-5" />
          {adminLabels.nav.logout}
        </button>
      </div>
    </aside>
  );
};
