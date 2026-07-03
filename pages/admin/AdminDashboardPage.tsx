import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FileText,
  Clock,
  CheckCircle,
  DollarSign,
  TrendingUp,
} from 'lucide-react';
import { StatCard } from '../../components/admin/StatCard';
import { StatusBadge } from '../../components/admin/StatusBadge';
import { ApplicationListCard } from '../../components/admin/ApplicationListCard';
import { adminLabels } from '../../data/adminLabels';
import {
  getApplications,
  getDashboardStats,
  seedDemoApplicationsIfEmpty,
} from '../../services/applicationStore';
import type { StoredApplication } from '../../types/admin';

export const AdminDashboardPage: React.FC = () => {
  const [stats, setStats] = useState(getDashboardStats());
  const [recent, setRecent] = useState<StoredApplication[]>([]);

  useEffect(() => {
    seedDemoApplicationsIfEmpty();
    setStats(getDashboardStats());
    setRecent(getApplications().slice(0, 8));
  }, []);

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleString('ar-EG', {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit',
    });

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <header className="mb-6 lg:mb-8">
        <h1 className="text-xl font-bold text-gray-900 sm:text-2xl">{adminLabels.dashboard.title}</h1>
        <p className="mt-1 text-sm text-gray-500">{adminLabels.dashboard.subtitle}</p>
      </header>

      <div className="mb-6 grid grid-cols-2 gap-3 sm:gap-4 lg:mb-8 xl:grid-cols-4">
        <StatCard label={adminLabels.dashboard.totalApplications} value={stats.total} icon={FileText} />
        <StatCard label={adminLabels.dashboard.todayApplications} value={stats.todayCount} icon={TrendingUp} accent="green" />
        <StatCard label={adminLabels.dashboard.pending} value={stats.pending} icon={Clock} accent="amber" />
        <StatCard label={adminLabels.dashboard.revenue} value={`$${stats.totalRevenue.toFixed(0)}`} icon={DollarSign} accent="green" />
      </div>

      <div className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4 lg:mb-8">
        <StatCard label={adminLabels.dashboard.processing} value={stats.processing} icon={Clock} accent="blue" />
        <StatCard label={adminLabels.dashboard.approved} value={stats.approved} icon={CheckCircle} accent="green" />
        <StatCard label={adminLabels.dashboard.rejected} value={stats.rejected} icon={FileText} accent="red" />
      </div>

      <section className="rounded-2xl border border-gray-100 bg-white shadow-sm">
        <div className="flex items-center justify-between gap-2 border-b border-gray-100 px-4 py-3 sm:px-5 sm:py-4">
          <h2 className="text-sm font-bold text-gray-900 sm:text-base">{adminLabels.dashboard.recentApplications}</h2>
          <Link to="/admin/applications" className="shrink-0 text-xs font-medium text-blue-600 hover:underline sm:text-sm">
            {adminLabels.dashboard.viewAll}
          </Link>
        </div>

        {recent.length === 0 ? (
          <p className="p-8 text-center text-sm text-gray-500">{adminLabels.dashboard.noApplications}</p>
        ) : (
          <>
            <div className="space-y-3 p-4 md:hidden">
              {recent.map((app) => (
                <ApplicationListCard
                  key={app.id}
                  app={app}
                  formatDate={formatDate}
                  onDelete={() => {}}
                  compact
                />
              ))}
            </div>
            <div className="hidden overflow-x-auto md:block">
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
