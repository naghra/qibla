import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell, Download, Search } from 'lucide-react';
import { adminLabels } from '../../data/adminLabels';
import { usePendingCount } from '../../hooks/usePendingCount';
import { adminBtnSecondary } from './adminStyles';
import {
  downloadCsv,
  exportApplicationsCsv,
  getApplications,
} from '../../services/applicationStore';

export const AdminTopBar: React.FC = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const pendingCount = usePendingCount();

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
    void getApplications().then((apps) => {
      downloadCsv(`qibla-applications-${Date.now()}.csv`, exportApplicationsCsv(apps));
    });
  };

  return (
    <header className="admin-desktop-bar admin-topbar-glass sticky top-0 z-20 hidden border-b border-slate-200/60 md:flex">
      <div className="flex w-full min-w-0 items-center gap-4 px-5 py-3 lg:px-7">
        <form onSubmit={handleSearch} className="relative min-w-0 flex-1 lg:max-w-lg">
          <Search className="pointer-events-none absolute start-3.5 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={adminLabels.topBar.search}
            className="w-full rounded-xl border border-slate-200/70 bg-slate-50/80 py-2.5 ps-10 pe-4 text-sm text-slate-800 transition placeholder:text-slate-400 focus:border-indigo-300 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/15"
          />
        </form>

        <div className="ms-auto flex shrink-0 items-center gap-2">
          {pendingCount > 0 && (
            <button
              type="button"
              onClick={() => navigate('/admin/applications?status=pending')}
              className="flex items-center gap-2 rounded-xl bg-gradient-to-l from-amber-50 to-orange-50 px-3.5 py-2 text-sm font-semibold text-amber-800 ring-1 ring-amber-200/60 transition hover:from-amber-100 hover:to-orange-100"
            >
              <Bell className="size-4 shrink-0" />
              <span className="hidden sm:inline">
                {pendingCount} {adminLabels.topBar.pending}
              </span>
              <span className="sm:hidden">{pendingCount}</span>
            </button>
          )}
          <button type="button" onClick={handleExport} className={adminBtnSecondary}>
            <Download className="size-4 shrink-0" />
            <span className="hidden sm:inline">{adminLabels.topBar.export}</span>
          </button>
        </div>
      </div>
    </header>
  );
};
