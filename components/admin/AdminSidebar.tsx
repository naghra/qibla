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

const navItems = [
  { to: '/admin', end: true, label: adminLabels.nav.dashboard, icon: LayoutDashboard },
  { to: '/admin/applications', end: false, label: adminLabels.nav.applications, icon: FileText },
  { to: '/admin/destinations', end: false, label: adminLabels.nav.destinations, icon: Globe },
];

interface AdminSidebarProps {
  open: boolean;
  onClose: () => void;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({ open, onClose }) => {
  const { logout } = useAdminAuth();
  const navigate = useNavigate();

  const handleNav = () => onClose();

  return (
    <>
      {open && (
        <button
          type="button"
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          aria-label="إغلاق القائمة"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed inset-y-0 end-0 z-50 flex w-72 max-w-[88vw] flex-col border-s border-gray-200 bg-white shadow-xl transition-transform duration-300 lg:static lg:z-auto lg:w-64 lg:max-w-none lg:translate-x-0 lg:shadow-none ${
          open ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'
        } ${!open ? 'pointer-events-none lg:pointer-events-auto' : ''}`}
      >
        <div className="flex items-center justify-between border-b border-gray-100 px-5 py-5">
          <div>
            <p className="text-lg font-bold text-gray-900">{adminLabels.siteName}</p>
            <p className="text-xs text-gray-500">Admin Panel</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 lg:hidden"
            aria-label="إغلاق"
          >
            <X className="size-5" />
          </button>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto p-3">
          {navItems.map(({ to, end, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              onClick={handleNav}
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
    </>
  );
};
