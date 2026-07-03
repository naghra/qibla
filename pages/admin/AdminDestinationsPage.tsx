import React from 'react';
import { destinations } from '../../data/destinations';
import { adminLabels } from '../../data/adminLabels';

export const AdminDestinationsPage: React.FC = () => {

  return (
    <div className="p-6 lg:p-8" dir="rtl">
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">{adminLabels.destinations.title}</h1>
        <p className="mt-1 text-sm text-gray-500">{adminLabels.destinations.subtitle}</p>
      </header>

      <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px] text-sm">
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
