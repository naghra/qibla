import React from 'react';
import { destinations } from '../../data/destinations';
import { adminLabels } from '../../data/adminLabels';

export const AdminDestinationsPage: React.FC = () => {
  return (
    <div className="p-4 sm:p-6 lg:p-8" dir="rtl">
      <header className="mb-4 sm:mb-6">
        <h1 className="text-xl font-bold text-gray-900 sm:text-2xl">{adminLabels.destinations.title}</h1>
        <p className="mt-1 text-sm text-gray-500">{adminLabels.destinations.subtitle}</p>
      </header>

      <div className="space-y-3 md:hidden">
        {destinations.map((dest) =>
          dest.services.map((service) => (
            <article
              key={`${dest.slug}-${service.slug}`}
              className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm"
            >
              <div className="mb-2 flex items-start justify-between gap-2">
                <div>
                  <p className="font-bold text-gray-900">{dest.name.ar}</p>
                  <p className="text-xs text-gray-500">{dest.name.en}</p>
                </div>
                <span className="rounded-full bg-gray-100 px-2 py-0.5 font-mono text-xs" dir="ltr">
                  {dest.countryCode}
                </span>
              </div>
              <p className="mb-2 text-sm font-medium text-blue-600">{service.shortName.ar}</p>
              <dl className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <dt className="text-gray-400">{adminLabels.destinations.slug}</dt>
                  <dd className="font-mono" dir="ltr">/{dest.slug}/{service.slug}/</dd>
                </div>
                <div>
                  <dt className="text-gray-400">{adminLabels.destinations.priceFrom}</dt>
                  <dd className="font-bold" dir="ltr">${service.priceFrom}</dd>
                </div>
              </dl>
            </article>
          ))
        )}
      </div>

      <div className="hidden overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm md:block">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50 text-start text-gray-500">
                <th className="px-4 py-3 font-medium">{adminLabels.destinations.country}</th>
                <th className="px-4 py-3 font-medium">{adminLabels.destinations.code}</th>
                <th className="px-4 py-3 font-medium">{adminLabels.destinations.slug}</th>
                <th className="px-4 py-3 font-medium">{adminLabels.destinations.services}</th>
                <th className="px-4 py-3 font-medium">{adminLabels.destinations.priceFrom}</th>
                <th className="px-4 py-3 font-medium">{adminLabels.destinations.detailed}</th>
              </tr>
            </thead>
            <tbody>
              {destinations.map((dest) =>
                dest.services.map((service, idx) => (
                  <tr
                    key={`${dest.slug}-${service.slug}`}
                    className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50"
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
                        <td className="px-4 py-3 font-mono text-xs" rowSpan={dest.services.length} dir="ltr">
                          /{dest.slug}/
                        </td>
                      </>
                    ) : null}
                    <td className="px-4 py-3">
                      <p className="font-medium">{service.shortName.ar}</p>
                      <p className="text-xs text-gray-500">{service.name.en}</p>
                    </td>
                    <td className="px-4 py-3 font-medium" dir="ltr">${service.priceFrom}</td>
                    <td className="px-4 py-3">
                      {service.detailed ? adminLabels.destinations.yes : adminLabels.destinations.no}
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
