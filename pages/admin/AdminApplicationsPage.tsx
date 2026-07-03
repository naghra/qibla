import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Trash2, Eye } from 'lucide-react';
import { StatusBadge } from '../../components/admin/StatusBadge';
import { adminLabels } from '../../data/adminLabels';
import {
  deleteApplication,
  getApplications,
  seedDemoApplicationsIfEmpty,
} from '../../services/applicationStore';
import type { ApplicationStatus, StoredApplication } from '../../types/admin';

export const AdminApplicationsPage: React.FC = () => {
  const [apps, setApps] = useState<StoredApplication[]>(() => {
    seedDemoApplicationsIfEmpty();
    return getApplications();
  });
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<ApplicationStatus | 'all'>('all');

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return apps.filter((app) => {
      if (statusFilter !== 'all' && app.status !== statusFilter) return false;
      if (!q) return true;
      const traveler = app.data.travelers[0];
      return (
        app.id.toLowerCase().includes(q) ||
        app.destinationName.toLowerCase().includes(q) ||
        app.serviceName.toLowerCase().includes(q) ||
        traveler?.email.toLowerCase().includes(q) ||
        `${traveler?.firstName} ${traveler?.lastName}`.toLowerCase().includes(q)
      );
    });
  }, [apps, search, statusFilter]);

  const handleDelete = (id: string) => {
    if (!window.confirm(adminLabels.applications.confirmDelete)) return;
    deleteApplication(id);
    setApps(getApplications());
  };

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleString('ar-EG', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });

  return (
    <div className="p-6 lg:p-8">
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">{adminLabels.applications.title}</h1>
        <p className="mt-1 text-sm text-gray-500">{adminLabels.applications.subtitle}</p>
      </header>

      <div className="mb-4 flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute start-3 top-1/2 size-4 -translate-y-1/2 text-gray-400" />
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={adminLabels.applications.search}
            className="w-full rounded-xl border border-gray-200 py-2.5 ps-10 pe-4 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as ApplicationStatus | 'all')}
          className="rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:border-blue-500 focus:outline-none"
        >
          <option value="all">{adminLabels.applications.filterAll}</option>
          {(Object.keys(adminLabels.status) as ApplicationStatus[]).map((s) => (
            <option key={s} value={s}>
              {adminLabels.status[s]}
            </option>
          ))}
        </select>
      </div>

      <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50 text-start text-gray-500">
                <th className="px-4 py-3 font-medium">{adminLabels.applications.id}</th>
                <th className="px-4 py-3 font-medium">{adminLabels.applications.applicant}</th>
                <th className="px-4 py-3 font-medium">{adminLabels.applications.destination}</th>
                <th className="px-4 py-3 font-medium">{adminLabels.applications.service}</th>
                <th className="px-4 py-3 font-medium">{adminLabels.applications.plan}</th>
                <th className="px-4 py-3 font-medium">{adminLabels.applications.amount}</th>
                <th className="px-4 py-3 font-medium">{adminLabels.applications.status}</th>
                <th className="px-4 py-3 font-medium">{adminLabels.applications.date}</th>
                <th className="px-4 py-3 font-medium">{adminLabels.applications.actions}</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((app) => (
                <tr key={app.id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50">
                  <td className="px-4 py-3 font-mono text-xs" dir="ltr">{app.id}</td>
                  <td className="px-4 py-3">
                    <p className="font-medium text-gray-900">
                      {app.data.travelers[0]?.firstName} {app.data.travelers[0]?.lastName}
                    </p>
                    <p className="text-xs text-gray-500" dir="ltr">{app.data.travelers[0]?.email}</p>
                  </td>
                  <td className="px-4 py-3 text-gray-600">{app.destinationName}</td>
                  <td className="px-4 py-3 text-gray-600">{app.serviceName}</td>
                  <td className="px-4 py-3">{app.planName}</td>
                  <td className="px-4 py-3 font-medium" dir="ltr">${app.totalAmount}</td>
                  <td className="px-4 py-3">
                    <StatusBadge status={app.status} />
                  </td>
                  <td className="px-4 py-3 text-gray-500">{formatDate(app.createdAt)}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <Link
                        to={`/admin/applications/${app.id}`}
                        className="rounded-lg p-2 text-blue-600 hover:bg-blue-50"
                        title={adminLabels.applications.view}
                      >
                        <Eye className="size-4" />
                      </Link>
                      <button
                        type="button"
                        onClick={() => handleDelete(app.id)}
                        className="rounded-lg p-2 text-red-600 hover:bg-red-50"
                        title={adminLabels.applications.delete}
                      >
                        <Trash2 className="size-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && (
          <p className="p-8 text-center text-sm text-gray-500">{adminLabels.applications.noResults}</p>
        )}
      </div>
    </div>
  );
};
