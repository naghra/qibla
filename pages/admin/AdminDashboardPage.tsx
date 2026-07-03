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
    <div className="p-6 lg:p-8">
      <header className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">{adminLabels.dashboard.title}</h1>
        <p className="mt-1 text-sm text-gray-500">{adminLabels.dashboard.subtitle}</p>
      </header>

      <div className="mb-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label={adminLabels.dashboard.totalApplications}
          value={stats.total}
          icon={FileText}
        />
        <StatCard
          label={adminLabels.dashboard.todayApplications}
          value={stats.todayCount}
          icon={TrendingUp}
          accent="green"
        />
        <StatCard
          label={adminLabels.dashboard.pending}
          value={stats.pending}
          icon={Clock}
          accent="amber"
        />
        <StatCard
          label={adminLabels.dashboard.revenue}
          value={`$${stats.totalRevenue.toFixed(0)}`}
          icon={DollarSign}
          accent="green"
        />
      </div>

      <div className="mb-8 grid gap-4 sm:grid-cols-3">
        <StatCard
          label={adminLabels.dashboard.processing}
          value={stats.processing}
          icon={Clock}
          accent="blue"
        />
        <StatCard
          label={adminLabels.dashboard.approved}
          value={stats.approved}
          icon={CheckCircle}
          accent="green"
        />
        <StatCard
          label={adminLabels.dashboard.rejected}
          value={stats.rejected}
          icon={FileText}
          accent="red"
        />
      </div>

      <section className="rounded-2xl border border-gray-100 bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
          <h2 className="font-bold text-gray-900">{adminLabels.dashboard.recentApplications}</h2>
          <Link to="/admin/applications" className="text-sm font-medium text-blue-600 hover:underline">
            {adminLabels.dashboard.viewAll}
          </Link>
        </div>

        {recent.length === 0 ? (
          <p className="p-8 text-center text-sm text-gray-500">{adminLabels.dashboard.noApplications}</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] text-sm">
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
        )}
      </section>
    </div>
  );
};
