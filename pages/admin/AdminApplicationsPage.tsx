import React, { useEffect, useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Search, Trash2, Eye, Download, FileText, CheckSquare } from 'lucide-react';
import { ApplicationListCard } from '../../components/admin/ApplicationListCard';
import { AdminPageHeader } from '../../components/admin/AdminPageHeader';
import { EmptyState } from '../../components/admin/EmptyState';
import { Pagination, paginate, totalPages } from '../../components/admin/Pagination';
import { QuickStatusSelect } from '../../components/admin/QuickStatusSelect';
import { adminLabels } from '../../data/adminLabels';
import { destinations } from '../../data/destinations';
import {
  bulkUpdateStatus,
  deleteApplication,
  downloadCsv,
  exportApplicationsCsv,
  getApplications,
  seedDemoApplicationsIfEmpty,
  updateApplicationStatus,
} from '../../services/applicationStore';
import type { ApplicationSortField, ApplicationStatus, StoredApplication } from '../../types/admin';

const PER_PAGE = 10;

function sortApps(apps: StoredApplication[], sort: ApplicationSortField): StoredApplication[] {
  const copy = [...apps];
  switch (sort) {
    case 'amount':
      return copy.sort((a, b) => b.totalAmount - a.totalAmount);
    case 'name':
      return copy.sort((a, b) => {
        const na = `${a.data.travelers[0]?.lastName} ${a.data.travelers[0]?.firstName}`;
        const nb = `${b.data.travelers[0]?.lastName} ${b.data.travelers[0]?.firstName}`;
        return na.localeCompare(nb);
      });
    default:
      return copy.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }
}

export const AdminApplicationsPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [apps, setApps] = useState<StoredApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState(searchParams.get('q') ?? '');
  const [statusFilter, setStatusFilter] = useState<ApplicationStatus | 'all'>(
    (searchParams.get('status') as ApplicationStatus) || 'all'
  );
  const [destFilter, setDestFilter] = useState('all');
  const [sort, setSort] = useState<ApplicationSortField>('date');
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [bulkStatus, setBulkStatus] = useState<ApplicationStatus>('processing');

  const refresh = () => {
    void getApplications().then(setApps);
  };

  useEffect(() => {
    void (async () => {
      await seedDemoApplicationsIfEmpty();
      setApps(await getApplications());
      setLoading(false);
    })();
  }, []);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    const list = apps.filter((app) => {
      if (statusFilter !== 'all' && app.status !== statusFilter) return false;
      if (destFilter !== 'all' && app.destinationSlug !== destFilter) return false;
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
    return sortApps(list, sort);
  }, [apps, search, statusFilter, destFilter, sort]);

  const pages = totalPages(filtered.length, PER_PAGE);
  const paged: StoredApplication[] = paginate(filtered, page, PER_PAGE);

  const handleDelete = (id: string) => {
    if (!window.confirm(adminLabels.applications.confirmDelete)) return;
    void deleteApplication(id).then(() => {
      selected.delete(id);
      setSelected(new Set(selected));
      refresh();
    });
  };

  const handleStatusChange = (id: string, status: ApplicationStatus) => {
    void updateApplicationStatus(id, status).then(refresh);
  };

  const handleBulkApply = () => {
    if (selected.size === 0) return;
    void bulkUpdateStatus([...selected], bulkStatus).then(() => {
      setSelected(new Set());
      refresh();
    });
  };

  const handleExport = () => {
    downloadCsv(`qibla-export-${Date.now()}.csv`, exportApplicationsCsv(filtered));
  };

  const toggleAll = () => {
    if (selected.size === paged.length) {
      setSelected(new Set());
    } else {
      setSelected(new Set(paged.map((a) => a.id)));
    }
  };

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleString('ar-EG', { day: 'numeric', month: 'short', year: 'numeric' });

  return (
    <div className="w-full max-w-full p-3 sm:p-6 lg:p-8">
      {loading ? (
        <div className="py-12 text-center text-gray-500">جاري التحميل...</div>
      ) : (
        <>
      <AdminPageHeader
        title={adminLabels.applications.title}
        subtitle={adminLabels.applications.subtitle}
        icon={FileText}
        actions={
          <button
            type="button"
            onClick={handleExport}
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 sm:w-auto"
          >
            <Download className="size-4" />
            {adminLabels.applications.exportFiltered}
          </button>
        }
      />

      <div className="mb-4 space-y-3">
        <div className="relative">
          <Search className="absolute start-3 top-1/2 size-4 -translate-y-1/2 text-gray-400" />
          <input
            type="search"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            placeholder={adminLabels.applications.search}
            className="w-full rounded-xl border border-gray-200 bg-white py-2.5 ps-10 pe-4 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          />
        </div>

        <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value as ApplicationStatus | 'all');
              setPage(1);
            }}
            className="rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm shadow-sm focus:border-blue-500 focus:outline-none"
          >
            <option value="all">{adminLabels.applications.filterAll}</option>
            {(Object.keys(adminLabels.status) as ApplicationStatus[]).map((s) => (
              <option key={s} value={s}>{adminLabels.status[s]}</option>
            ))}
          </select>
          <select
            value={destFilter}
            onChange={(e) => { setDestFilter(e.target.value); setPage(1); }}
            className="rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm shadow-sm focus:border-blue-500 focus:outline-none"
          >
            <option value="all">{adminLabels.applications.filterDestination}</option>
            {destinations.map((d) => (
              <option key={d.slug} value={d.slug}>{d.name.ar}</option>
            ))}
          </select>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as ApplicationSortField)}
            className="rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm shadow-sm focus:border-blue-500 focus:outline-none"
          >
            <option value="date">{adminLabels.applications.sortDate}</option>
            <option value="amount">{adminLabels.applications.sortAmount}</option>
            <option value="name">{adminLabels.applications.sortName}</option>
          </select>
        </div>
      </div>

      <div className="mb-4 flex flex-wrap items-center justify-between gap-2 text-sm text-gray-500">
        <span>{filtered.length} {adminLabels.applications.resultsCount}</span>
        {selected.size > 0 && (
          <span className="font-medium text-blue-600">{selected.size} {adminLabels.applications.selected}</span>
        )}
      </div>

      {selected.size > 0 && (
        <div className="mb-4 flex flex-wrap items-center gap-2 rounded-xl border border-blue-100 bg-blue-50 p-3">
          <CheckSquare className="size-4 text-blue-600" />
          <QuickStatusSelect value={bulkStatus} onChange={setBulkStatus} size="sm" />
          <button
            type="button"
            onClick={handleBulkApply}
            className="rounded-lg bg-blue-600 px-4 py-1.5 text-sm font-bold text-white hover:bg-blue-700"
          >
            {adminLabels.applications.bulkApply}
          </button>
        </div>
      )}

      {filtered.length === 0 ? (
        <EmptyState icon={FileText} title={adminLabels.applications.noResults} />
      ) : (
        <>
          <div className="admin-cards-toolbar mb-3 flex items-center gap-2">
            <input
              type="checkbox"
              checked={selected.size === paged.length && paged.length > 0}
              onChange={toggleAll}
              className="size-4 rounded border-gray-300 text-blue-600"
            />
            <span className="text-xs text-gray-500">{adminLabels.applications.selectAll}</span>
          </div>

          <div className="admin-cards-wrap mb-4 space-y-3">
            {paged.map((app) => (
              <ApplicationListCard
                key={app.id}
                app={app}
                formatDate={formatDate}
                onDelete={handleDelete}
                onStatusChange={handleStatusChange}
                selectable
                selected={selected.has(app.id)}
                onSelect={(id, checked) => {
                  const next = new Set(selected);
                  if (checked) next.add(id); else next.delete(id);
                  setSelected(next);
                }}
              />
            ))}
          </div>

          <div className="admin-table-wrap mb-4 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100 bg-gray-50 text-start text-gray-500">
                    <th className="px-4 py-3">
                      <input
                        type="checkbox"
                        checked={selected.size === paged.length && paged.length > 0}
                        onChange={toggleAll}
                        className="size-4 rounded border-gray-300 text-blue-600"
                      />
                    </th>
                    <th className="px-4 py-3 font-medium">{adminLabels.applications.id}</th>
                    <th className="px-4 py-3 font-medium">{adminLabels.applications.applicant}</th>
                    <th className="px-4 py-3 font-medium">{adminLabels.applications.destination}</th>
                    <th className="px-4 py-3 font-medium">{adminLabels.applications.amount}</th>
                    <th className="px-4 py-3 font-medium">{adminLabels.applications.status}</th>
                    <th className="px-4 py-3 font-medium">{adminLabels.applications.date}</th>
                    <th className="px-4 py-3 font-medium">{adminLabels.applications.actions}</th>
                  </tr>
                </thead>
                <tbody>
                  {paged.map((app) => (
                    <tr key={app.id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50">
                      <td className="px-4 py-3">
                        <input
                          type="checkbox"
                          checked={selected.has(app.id)}
                          onChange={(e) => {
                            const next = new Set(selected);
                            if (e.target.checked) next.add(app.id); else next.delete(app.id);
                            setSelected(next);
                          }}
                          className="size-4 rounded border-gray-300 text-blue-600"
                        />
                      </td>
                      <td className="px-4 py-3 font-mono text-xs" dir="ltr">{app.id}</td>
                      <td className="px-4 py-3">
                        <p className="font-medium text-gray-900">
                          {app.data.travelers[0]?.firstName} {app.data.travelers[0]?.lastName}
                        </p>
                        <p className="text-xs text-gray-500" dir="ltr">{app.data.travelers[0]?.email}</p>
                      </td>
                      <td className="px-4 py-3 text-gray-600">{app.destinationName}</td>
                      <td className="px-4 py-3 font-medium" dir="ltr">${app.totalAmount}</td>
                      <td className="px-4 py-3">
                        <QuickStatusSelect
                          value={app.status}
                          onChange={(s) => handleStatusChange(app.id, s)}
                          size="sm"
                        />
                      </td>
                      <td className="px-4 py-3 text-gray-500">{formatDate(app.createdAt)}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1">
                          <Link to={`/admin/applications/${app.id}`} className="rounded-lg p-2 text-blue-600 hover:bg-blue-50" title={adminLabels.applications.view}>
                            <Eye className="size-4" />
                          </Link>
                          <button type="button" onClick={() => handleDelete(app.id)} className="rounded-lg p-2 text-red-600 hover:bg-red-50" title={adminLabels.applications.delete}>
                            <Trash2 className="size-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <Pagination page={page} totalPages={pages} onPageChange={setPage} />
        </>
      )}
        </>
      )}
    </div>
  );
};
