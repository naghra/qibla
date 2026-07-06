import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  FileText,
  Clock,
  DollarSign,
  TrendingUp,
  LayoutDashboard,
  Download,
  ArrowLeft,
  Zap,
} from 'lucide-react';
import { StatCard } from '../../components/admin/StatCard';
import { StatusBadge } from '../../components/admin/StatusBadge';
import { ApplicationListCard } from '../../components/admin/ApplicationListCard';
import { AdminPageHeader } from '../../components/admin/AdminPageHeader';
import { AdminLoading } from '../../components/admin/AdminLoading';
import { StatusBarChart } from '../../components/admin/StatusBarChart';
import { WeeklyChart } from '../../components/admin/WeeklyChart';
import { DestinationBreakdown } from '../../components/admin/DestinationBreakdown';
import { adminBtnPrimary, adminCard, adminSectionTitle } from '../../components/admin/adminStyles';
import { adminLabels } from '../../data/adminLabels';
import {
  downloadCsv,
  exportApplicationsCsv,
  getApplications,
  getDailyCounts,
  getDashboardStats,
  getTopDestinations,
  seedDemoApplicationsIfEmpty,
} from '../../services/applicationStore';
import type { ApplicationStatus, StoredApplication } from '../../types/admin';
import { formatAdminDate } from '../../utils/adminFormatters';

export const AdminDashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState<Awaited<ReturnType<typeof getDashboardStats>> | null>(null);
  const [recent, setRecent] = useState<StoredApplication[]>([]);
  const [daily, setDaily] = useState<Awaited<ReturnType<typeof getDailyCounts>>>([]);
  const [destinations, setDestinations] = useState<Awaited<ReturnType<typeof getTopDestinations>>>([]);

  useEffect(() => {
    void (async () => {
      await seedDemoApplicationsIfEmpty();
      const [s, apps, d, dest] = await Promise.all([
        getDashboardStats(),
        getApplications(),
        getDailyCounts(),
        getTopDestinations(),
      ]);
      setStats(s);
      setRecent(apps.slice(0, 6));
      setDaily(d);
      setDestinations(dest);
    })();
  }, []);

  const formatDate = (iso: string) => formatAdminDate(iso, true);

  const handleExport = () => {
    void getApplications().then((apps) => {
      downloadCsv(`qibla-applications-${Date.now()}.csv`, exportApplicationsCsv(apps));
    });
  };

  if (!stats) {
    return <AdminLoading />;
  }

  const statusData: Record<ApplicationStatus, number> = {
    pending: stats.pending,
    processing: stats.processing,
    approved: stats.approved,
    rejected: stats.rejected,
  };

  return (
    <div className="w-full max-w-full p-4 sm:p-6 lg:p-8 xl:p-10">
      <AdminPageHeader
        title={adminLabels.dashboard.title}
        subtitle={adminLabels.dashboard.subtitle}
        icon={LayoutDashboard}
        actions={
          <button type="button" onClick={handleExport} className={`${adminBtnPrimary} w-full sm:w-auto`}>
            <Download className="size-4" />
            {adminLabels.dashboard.exportAll}
          </button>
        }
      />

      <div className="mb-6 grid grid-cols-2 gap-3 sm:gap-4 xl:grid-cols-4">
        <StatCard
          label={adminLabels.dashboard.totalApplications}
          value={stats.total}
          icon={FileText}
          onClick={() => navigate('/admin/applications')}
        />
        <StatCard
          label={adminLabels.dashboard.todayApplications}
          value={stats.todayCount}
          icon={TrendingUp}
          accent="green"
          hint={`${adminLabels.dashboard.weekApplications}: ${stats.weekCount}`}
        />
        <StatCard
          label={adminLabels.dashboard.pending}
          value={stats.pending}
          icon={Clock}
          accent="amber"
          onClick={() => navigate('/admin/applications?status=pending')}
        />
        <StatCard
          label={adminLabels.dashboard.revenue}
          value={`$${stats.totalRevenue.toFixed(0)}`}
          icon={DollarSign}
          accent="violet"
          hint={`${adminLabels.dashboard.weekRevenue}: $${stats.weekRevenue.toFixed(0)}`}
        />
      </div>

      <div className="mb-6 grid grid-cols-1 gap-4 lg:grid-cols-3">
        <section className={`${adminCard} lg:col-span-2`}>
          <h2 className={`mb-5 ${adminSectionTitle}`}>{adminLabels.dashboard.weeklyChart}</h2>
          <WeeklyChart data={daily} />
        </section>

        <section className={adminCard}>
          <div className="mb-4 flex items-center gap-2">
            <Zap className="size-4 text-indigo-500" />
            <h2 className={adminSectionTitle}>{adminLabels.dashboard.quickActions}</h2>
          </div>
          <div className="space-y-2">
            <button
              type="button"
              onClick={() => navigate('/admin/applications?status=pending')}
              className="flex w-full items-center justify-between rounded-xl bg-gradient-to-l from-amber-50 to-orange-50 px-4 py-3 text-sm font-semibold text-amber-900 ring-1 ring-amber-200/50 transition hover:from-amber-100 hover:to-orange-100"
            >
              {adminLabels.dashboard.viewPending}
              <span className="rounded-full bg-gradient-to-l from-amber-500 to-orange-500 px-2.5 py-0.5 text-xs font-bold text-white shadow-sm">
                {stats.pending}
              </span>
            </button>
            <button
              type="button"
              onClick={() => navigate('/admin/applications?status=processing')}
              className="flex w-full items-center justify-between rounded-xl bg-gradient-to-l from-indigo-50 to-violet-50 px-4 py-3 text-sm font-semibold text-indigo-900 ring-1 ring-indigo-200/50 transition hover:from-indigo-100 hover:to-violet-100"
            >
              {adminLabels.dashboard.viewProcessing}
              <span className="rounded-full bg-gradient-to-l from-indigo-500 to-violet-500 px-2.5 py-0.5 text-xs font-bold text-white shadow-sm">
                {stats.processing}
              </span>
            </button>
            <div className="grid grid-cols-2 gap-2 pt-1">
              <div className="rounded-xl bg-gradient-to-br from-emerald-50 to-teal-50 px-3 py-3 text-center ring-1 ring-emerald-200/40">
                <p className="text-xs font-medium text-emerald-700">{adminLabels.dashboard.approved}</p>
                <p className="mt-0.5 text-lg font-bold text-emerald-900">{stats.approved}</p>
              </div>
              <div className="rounded-xl bg-gradient-to-br from-indigo-50 to-violet-50 px-3 py-3 text-center ring-1 ring-indigo-200/40">
                <p className="text-xs font-medium text-indigo-700">{adminLabels.dashboard.approvalRate}</p>
                <p className="mt-0.5 text-lg font-bold text-indigo-900">{stats.approvalRate}%</p>
              </div>
            </div>
          </div>
        </section>
      </div>

      <div className="mb-6 grid grid-cols-1 gap-4 lg:grid-cols-2">
        <section className={adminCard}>
          <h2 className={`mb-5 ${adminSectionTitle}`}>{adminLabels.dashboard.statusBreakdown}</h2>
          <StatusBarChart data={statusData} total={stats.total} />
        </section>

        <section className={adminCard}>
          <h2 className={`mb-5 ${adminSectionTitle}`}>{adminLabels.dashboard.topDestinations}</h2>
          <DestinationBreakdown items={destinations} />
        </section>
      </div>

      <section className={`${adminCard} overflow-hidden p-0`}>
        <div className="flex items-center justify-between gap-2 border-b border-slate-100 bg-gradient-to-l from-slate-50/80 to-white px-4 py-3.5 sm:px-5 sm:py-4">
          <h2 className={adminSectionTitle}>{adminLabels.dashboard.recentApplications}</h2>
          <Link
            to="/admin/applications"
            className="flex shrink-0 items-center gap-1 text-xs font-semibold text-indigo-600 transition hover:text-indigo-700 hover:underline sm:text-sm"
          >
            {adminLabels.dashboard.viewAll}
            <ArrowLeft className="size-3.5" />
          </Link>
        </div>

        {recent.length === 0 ? (
          <p className="p-10 text-center text-sm text-slate-500">{adminLabels.dashboard.noApplications}</p>
        ) : (
          <>
            <div className="admin-cards-wrap space-y-3 p-3 sm:p-4">
              {recent.map((app) => (
                <ApplicationListCard key={app.id} app={app} formatDate={formatDate} onDelete={() => {}} compact />
              ))}
            </div>
            <div className="admin-table-wrap overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-100 bg-slate-50/50 text-start text-slate-500">
                    <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide">{adminLabels.applications.id}</th>
                    <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide">{adminLabels.applications.applicant}</th>
                    <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide">{adminLabels.applications.destination}</th>
                    <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide">{adminLabels.applications.amount}</th>
                    <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide">{adminLabels.applications.status}</th>
                    <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide">{adminLabels.applications.date}</th>
                  </tr>
                </thead>
                <tbody>
                  {recent.map((app) => (
                    <tr key={app.id} className="admin-table-row border-b border-slate-50 transition last:border-0">
                      <td className="px-5 py-3.5">
                        <Link
                          to={`/admin/applications/${app.id}`}
                          className="font-mono text-xs font-medium text-indigo-600 hover:text-indigo-700 hover:underline"
                          dir="ltr"
                        >
                          {app.id}
                        </Link>
                      </td>
                      <td className="px-5 py-3.5 font-medium text-slate-900">
                        {app.data.travelers[0]?.firstName} {app.data.travelers[0]?.lastName}
                      </td>
                      <td className="px-5 py-3.5 text-slate-600">{app.destinationName}</td>
                      <td className="px-5 py-3.5 font-semibold text-slate-800" dir="ltr">
                        ${app.totalAmount}
                      </td>
                      <td className="px-5 py-3.5">
                        <StatusBadge status={app.status} />
                      </td>
                      <td className="px-5 py-3.5 text-slate-500">{formatDate(app.createdAt)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </section>
    </div>
  );
};
