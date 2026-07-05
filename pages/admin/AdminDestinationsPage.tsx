import React, { useMemo, useState } from 'react';
import { Globe, ExternalLink, Search } from 'lucide-react';
import { AdminPageHeader } from '../../components/admin/AdminPageHeader';
import { StatCard } from '../../components/admin/StatCard';
import { adminCard, adminInput } from '../../components/admin/adminStyles';
import { adminLabels } from '../../data/adminLabels';
import { destinations } from '../../data/destinations';

export const AdminDestinationsPage: React.FC = () => {
  const [search, setSearch] = useState('');

  const totalServices = destinations.reduce((n, d) => n + d.services.length, 0);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return destinations;
    return destinations.filter(
      (d) =>
        d.name.ar.toLowerCase().includes(q) ||
        d.name.en.toLowerCase().includes(q) ||
        d.slug.includes(q) ||
        d.services.some(
          (s) =>
            s.shortName.ar.toLowerCase().includes(q) ||
            s.name.en.toLowerCase().includes(q)
        )
    );
  }, [search]);

  return (
    <div className="w-full max-w-full p-4 sm:p-6 lg:p-8">
      <AdminPageHeader
        title={adminLabels.destinations.title}
        subtitle={adminLabels.destinations.subtitle}
        icon={Globe}
      />

      <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-2 sm:gap-4">
        <StatCard label={adminLabels.destinations.total} value={destinations.length} icon={Globe} accent="blue" />
        <StatCard label={adminLabels.destinations.totalServices} value={totalServices} icon={Globe} accent="violet" />
      </div>

      <div className="relative mb-4">
        <Search className="absolute start-3 top-1/2 size-4 -translate-y-1/2 text-gray-400" />
        <input
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={adminLabels.destinations.search}
          className={`${adminInput} ps-10`}
        />
      </div>

      <div className="admin-cards-wrap space-y-3">
        {filtered.map((dest) =>
          dest.services.map((service) => (
            <article key={`${dest.slug}-${service.slug}`} className={`${adminCard} admin-card-hover`}>
              <div className="mb-2 flex items-start justify-between gap-2">
                <div>
                  <p className="font-bold text-gray-900">{dest.name.ar}</p>
                  <p className="text-xs text-gray-500">{dest.name.en}</p>
                </div>
                <span className="rounded-full bg-gray-100 px-2 py-0.5 font-mono text-xs" dir="ltr">
                  {dest.countryCode}
                </span>
              </div>
              <p className="mb-3 text-sm font-semibold text-indigo-600">{service.shortName.ar}</p>
              <dl className="mb-3 grid grid-cols-2 gap-2 text-xs">
                <div>
                  <dt className="text-gray-400">{adminLabels.destinations.slug}</dt>
                  <dd className="font-mono" dir="ltr">/{dest.slug}/{service.slug}/</dd>
                </div>
                <div>
                  <dt className="text-gray-400">{adminLabels.destinations.priceFrom}</dt>
                  <dd className="font-bold" dir="ltr">${service.priceFrom}</dd>
                </div>
              </dl>
              <a
                href={`/en/${dest.slug}/${service.slug}/`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-l from-indigo-50 to-violet-50 py-2.5 text-sm font-semibold text-indigo-700 ring-1 ring-indigo-100/60 transition hover:from-indigo-100 hover:to-violet-100"
              >
                <ExternalLink className="size-4" />
                {adminLabels.destinations.viewSite}
              </a>
            </article>
          ))
        )}
      </div>

      <div className={`admin-table-wrap overflow-hidden ${adminCard} p-0`}>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/80 text-start text-slate-500">
                <th className="px-4 py-3 font-medium">{adminLabels.destinations.country}</th>
                <th className="px-4 py-3 font-medium">{adminLabels.destinations.code}</th>
                <th className="px-4 py-3 font-medium">{adminLabels.destinations.services}</th>
                <th className="px-4 py-3 font-medium">{adminLabels.destinations.priceFrom}</th>
                <th className="px-4 py-3 font-medium">{adminLabels.destinations.detailed}</th>
                <th className="px-4 py-3 font-medium">{adminLabels.applications.actions}</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((dest) =>
                dest.services.map((service, idx) => (
                  <tr
                    key={`${dest.slug}-${service.slug}`}
                    className="admin-table-row border-b border-slate-50 transition last:border-0"
                  >
                    {idx === 0 ? (
                      <>
                        <td className="px-4 py-3 font-medium text-gray-900" rowSpan={dest.services.length}>
                          {dest.name.ar}
                          <span className="mt-0.5 block text-xs text-gray-500">{dest.name.en}</span>
                        </td>
                        <td className="px-4 py-3 font-mono text-xs" rowSpan={dest.services.length} dir="ltr">
                          {dest.countryCode}
                        </td>
                      </>
                    ) : null}
                    <td className="px-4 py-3">
                      <p className="font-medium">{service.shortName.ar}</p>
                      <p className="text-xs text-gray-500" dir="ltr">/{dest.slug}/{service.slug}/</p>
                    </td>
                    <td className="px-4 py-3 font-medium" dir="ltr">${service.priceFrom}</td>
                    <td className="px-4 py-3">
                      <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${service.detailed ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                        {service.detailed ? adminLabels.destinations.yes : adminLabels.destinations.no}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <a
                        href={`/en/${dest.slug}/${service.slug}/`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 font-medium text-indigo-600 hover:text-indigo-700 hover:underline"
                      >
                        <ExternalLink className="size-3.5" />
                        {adminLabels.destinations.viewSite}
                      </a>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
