import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell, Download, Search } from 'lucide-react';
import { adminLabels } from '../../data/adminLabels';
import {
  downloadCsv,
  exportApplicationsCsv,
  getApplications,
  getPendingCount,
} from '../../services/applicationStore';

interface AdminTopBarProps {
  title?: string;
}

export const AdminTopBar: React.FC<AdminTopBarProps> = ({ title }) => {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const pendingCount = useMemo(() => getPendingCount(), []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const q = query.trim();
    if (q) {
      navigate(`/admin/applications?q=${encodeURIComponent(q)}`);
    } else {
      navigate('/admin/applications');
    }
  };

  const handleExport = () => {
    const csv = exportApplicationsCsv(getApplications());
    downloadCsv(`qibla-applications-${Date.now()}.csv`, csv);
  };

  return (
    <header className="admin-desktop-bar sticky top-0 z-20 hidden border-b border-gray-200 bg-white/95 backdrop-blur md:flex">
      <div className="flex w-full min-w-0 items-center gap-4 px-4 py-3 lg:px-6">
        {title && (
          <h2 className="hidden shrink-0 text-base font-bold text-gray-900 lg:block">{title}</h2>
        )}

        <form onSubmit={handleSearch} className="relative min-w-0 flex-1 lg:max-w-md">
          <Search className="pointer-events-none absolute start-3 top-1/2 size-4 -translate-y-1/2 text-gray-400" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={adminLabels.topBar.search}
            className="w-full rounded-xl border border-gray-200 bg-gray-50 py-2 ps-10 pe-4 text-sm focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          />
        </form>

        <div className="ms-auto flex shrink-0 items-center gap-2">
          {pendingCount > 0 && (
            <button
              type="button"
              onClick={() => navigate('/admin/applications?status=pending')}
              className="flex items-center gap-2 rounded-xl bg-amber-50 px-3 py-2 text-sm font-medium text-amber-800 hover:bg-amber-100"
            >
              <Bell className="size-4 shrink-0" />
              <span className="hidden sm:inline">{pendingCount} {adminLabels.topBar.pending}</span>
              <span className="sm:hidden">{pendingCount}</span>
            </button>
          )}
          <button
            type="button"
            onClick={handleExport}
            className="flex items-center gap-2 rounded-xl border border-gray-200 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            <Download className="size-4 shrink-0" />
            <span className="hidden sm:inline">{adminLabels.topBar.export}</span>
          </button>
        </div>
      </div>
    </header>
  );
};
