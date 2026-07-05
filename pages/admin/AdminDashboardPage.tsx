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
} from 'lucide-react';
import { StatCard } from '../../components/admin/StatCard';
import { StatusBadge } from '../../components/admin/StatusBadge';
import { ApplicationListCard } from '../../components/admin/ApplicationListCard';
import { AdminPageHeader } from '../../components/admin/AdminPageHeader';
import { StatusBarChart } from '../../components/admin/StatusBarChart';
import { WeeklyChart } from '../../components/admin/WeeklyChart';
import { DestinationBreakdown } from '../../components/admin/DestinationBreakdown';
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

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleString('ar-EG', {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit',
    });

  const handleExport = () => {
    void getApplications().then((apps) => {
      downloadCsv(`qibla-applications-${Date.now()}.csv`, exportApplicationsCsv(apps));
    });
  };

  if (!stats) {
    return <div className="p-8 text-center text-gray-500">جاري التحميل...</div>;
  }

  const statusData: Record<ApplicationStatus, number> = {
    pending: stats.pending,
    processing: stats.processing,
    approved: stats.approved,
    rejected: stats.rejected,
  };

  return (
    <div className="w-full max-w-full p-3 sm:p-6 lg:p-8">
      <AdminPageHeader
        title={adminLabels.dashboard.title}
        subtitle={adminLabels.dashboard.subtitle}
        icon={LayoutDashboard}
        actions={
          <button
            type="button"
            onClick={handleExport}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-bold text-white hover:bg-blue-700 sm:w-auto"
          >
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
        <section className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm sm:p-5 lg:col-span-2">
          <h2 className="mb-4 text-sm font-bold text-gray-900 sm:text-base">
            {adminLabels.dashboard.weeklyChart}
          </h2>
          <WeeklyChart data={daily} />
        </section>

        <section className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm sm:p-5">
          <h2 className="mb-4 text-sm font-bold text-gray-900 sm:text-base">
            {adminLabels.dashboard.quickActions}
          </h2>
          <div className="space-y-2">
            <button
              type="button"
              onClick={() => navigate('/admin/applications?status=pending')}
              className="flex w-full items-center justify-between rounded-xl bg-amber-50 px-4 py-3 text-sm font-medium text-amber-900 hover:bg-amber-100"
            >
              {adminLabels.dashboard.viewPending}
              <span className="rounded-full bg-amber-200 px-2 py-0.5 text-xs font-bold">{stats.pending}</span>
            </button>
            <button
              type="button"
              onClick={() => navigate('/admin/applications?status=processing')}
              className="flex w-full items-center justify-between rounded-xl bg-blue-50 px-4 py-3 text-sm font-medium text-blue-900 hover:bg-blue-100"
            >
              {adminLabels.dashboard.viewProcessing}
              <span className="rounded-full bg-blue-200 px-2 py-0.5 text-xs font-bold">{stats.processing}</span>
            </button>
            <div className="grid grid-cols-2 gap-2 pt-1">
              <div className="rounded-xl bg-emerald-50 px-3 py-2.5 text-center">
                <p className="text-xs text-emerald-700">{adminLabels.dashboard.approved}</p>
                <p className="text-lg font-bold text-emerald-900">{stats.approved}</p>
              </div>
              <div className="rounded-xl bg-blue-50 px-3 py-2.5 text-center">
                <p className="text-xs text-blue-700">{adminLabels.dashboard.approvalRate}</p>
                <p className="text-lg font-bold text-blue-900">{stats.approvalRate}%</p>
              </div>
            </div>
          </div>
        </section>
      </div>

      <div className="mb-6 grid grid-cols-1 gap-4 lg:grid-cols-2">
        <section className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm sm:p-5">
          <h2 className="mb-4 text-sm font-bold text-gray-900 sm:text-base">
            {adminLabels.dashboard.statusBreakdown}
          </h2>
          <StatusBarChart data={statusData} total={stats.total} />
        </section>

        <section className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm sm:p-5">
          <h2 className="mb-4 text-sm font-bold text-gray-900 sm:text-base">
            {adminLabels.dashboard.topDestinations}
          </h2>
          <DestinationBreakdown items={destinations} />
        </section>
      </div>

      <section className="rounded-2xl border border-gray-100 bg-white shadow-sm">
        <div className="flex items-center justify-between gap-2 border-b border-gray-100 px-4 py-3 sm:px-5 sm:py-4">
          <h2 className="text-sm font-bold text-gray-900 sm:text-base">{adminLabels.dashboard.recentApplications}</h2>
          <Link
            to="/admin/applications"
            className="flex shrink-0 items-center gap-1 text-xs font-medium text-blue-600 hover:underline sm:text-sm"
          >
            {adminLabels.dashboard.viewAll}
            <ArrowLeft className="size-3.5" />
          </Link>
        </div>

        {recent.length === 0 ? (
          <p className="p-8 text-center text-sm text-gray-500">{adminLabels.dashboard.noApplications}</p>
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
                  <tr className="border-b border-gray-50 text-start text-gray-500">
                    <th className="px-5 py-3 font-medium">{adminLabels.applications.id}</th>
                    <th className="px-5 py-3 font-medium">{adminLabels.applications.applicant}</th>
                    <th className="px-5 py-3 font-medium">{adminLabels.applications.destination}</th>
                    <th className="px-5 py-3 font-medium">{adminLabels.applications.amount}</th>
                    <th className="px-5 py-3 font-medium">{adminLabels.applications.status}</th>
                    <th className="px-5 py-3 font-medium">{adminLabels.applications.date}</th>
                  </tr>
                </thead>
                <tbody>
                  {recent.map((app) => (
                    <tr key={app.id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50">
                      <td className="px-5 py-3">
                        <Link to={`/admin/applications/${app.id}`} className="font-mono text-xs text-blue-600 hover:underline" dir="ltr">
                          {app.id}
                        </Link>
                      </td>
                      <td className="px-5 py-3 font-medium text-gray-900">
                        {app.data.travelers[0]?.firstName} {app.data.travelers[0]?.lastName}
                      </td>
                      <td className="px-5 py-3 text-gray-600">{app.destinationName}</td>
                      <td className="px-5 py-3 font-medium" dir="ltr">${app.totalAmount}</td>
                      <td className="px-5 py-3">
                        <StatusBadge status={app.status} />
                      </td>
                      <td className="px-5 py-3 text-gray-500">{formatDate(app.createdAt)}</td>
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
