import React, { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { StatusBadge } from '../../components/admin/StatusBadge';
import { adminLabels } from '../../data/adminLabels';
import { getApplication, updateApplicationStatus } from '../../services/applicationStore';
import type { ApplicationStatus } from '../../types/admin';
import { getCountryName } from '../../utils/countryName';
import { countriesData } from '../../data/countries';

export const AdminApplicationDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const app = id ? getApplication(id) : undefined;

  const [status, setStatus] = useState<ApplicationStatus>(app?.status ?? 'pending');
  const [notes, setNotes] = useState(app?.adminNotes ?? '');
  const [saved, setSaved] = useState(false);

  if (!app) {
    return (
      <div className="p-8 text-center" dir="rtl">
        <p className="text-gray-500">{adminLabels.detail.notFound}</p>
        <Link to="/admin/applications" className="mt-4 inline-block text-blue-600 hover:underline">
          {adminLabels.detail.back}
        </Link>
      </div>
    );
  }

  const primary = app.data.travelers[0];
  const travel = app.data.travel;

  const nationalityLabel = (code: string) => {
    const c = countriesData.find((x) => x.code === code);
    return c ? getCountryName(c, app.lang) : code;
  };

  const handleSave = () => {
    updateApplicationStatus(app.id, status, notes);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="p-6 lg:p-8" dir="rtl">
      <button
        type="button"
        onClick={() => navigate('/admin/applications')}
        className="mb-6 flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-blue-600"
      >
        <ArrowRight className="size-4" />
        {adminLabels.detail.back}
      </button>

      <header className="mb-6 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{adminLabels.detail.title}</h1>
          <p className="mt-1 font-mono text-sm text-gray-500" dir="ltr">{app.id}</p>
        </div>
        <StatusBadge status={app.status} />
      </header>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <section className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
            <h2 className="mb-4 font-bold text-gray-900">{adminLabels.detail.travelers}</h2>
            {app.data.travelers.map((traveler, i) => (
              <div key={i} className={i > 0 ? 'mt-4 border-t border-gray-100 pt-4' : ''}>
                <p className="mb-2 text-sm font-medium text-blue-600">
                  {adminLabels.detail.primaryTraveler} {i + 1}
                </p>
                <dl className="grid gap-2 sm:grid-cols-2 text-sm">
                  <div>
                    <dt className="text-gray-500">{adminLabels.detail.applicant}</dt>
                    <dd className="font-medium">{traveler.firstName} {traveler.lastName}</dd>
                  </div>
                  <div>
                    <dt className="text-gray-500">{adminLabels.detail.email}</dt>
                    <dd dir="ltr">{traveler.email}</dd>
                  </div>
                  <div>
                    <dt className="text-gray-500">{adminLabels.detail.phone}</dt>
                    <dd dir="ltr">{traveler.phone || '—'}</dd>
                  </div>
                  <div>
                    <dt className="text-gray-500">{adminLabels.detail.passport}</dt>
                    <dd dir="ltr">{traveler.passportNumber}</dd>
                  </div>
                  <div>
                    <dt className="text-gray-500">{adminLabels.detail.nationality}</dt>
                    <dd>{nationalityLabel(traveler.nationality)}</dd>
                  </div>
                </dl>
              </div>
            ))}
          </section>

          <section className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
            <h2 className="mb-4 font-bold text-gray-900">{adminLabels.detail.travelDetails}</h2>
            <dl className="grid gap-3 sm:grid-cols-2 text-sm">
              <div>
                <dt className="text-gray-500">{adminLabels.detail.arrival}</dt>
                <dd dir="ltr">{travel.arrivalDate}</dd>
              </div>
              <div>
                <dt className="text-gray-500">{adminLabels.detail.departure}</dt>
                <dd dir="ltr">{travel.departureDate || '—'}</dd>
              </div>
              <div>
                <dt className="text-gray-500">{adminLabels.detail.flight}</dt>
                <dd dir="ltr">{travel.flightNumber}</dd>
              </div>
              <div>
                <dt className="text-gray-500">{adminLabels.detail.purpose}</dt>
                <dd>{travel.purposeOfVisit || '—'}</dd>
              </div>
              <div className="sm:col-span-2">
                <dt className="text-gray-500">{adminLabels.detail.accommodation}</dt>
                <dd>{travel.accommodationAddress}{travel.accommodationCity ? `, ${travel.accommodationCity}` : ''}</dd>
              </div>
            </dl>
          </section>
        </div>

        <div className="space-y-6">
          <section className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
            <h2 className="mb-4 font-bold text-gray-900">{adminLabels.detail.orderSummary}</h2>
            <dl className="space-y-2 text-sm">
              <div className="flex justify-between">
                <dt className="text-gray-500">{adminLabels.applications.destination}</dt>
                <dd className="font-medium">{app.destinationName}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-gray-500">{adminLabels.applications.service}</dt>
                <dd>{app.serviceName}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-gray-500">{adminLabels.applications.plan}</dt>
                <dd>{app.planName}</dd>
              </div>
              <div className="flex justify-between border-t border-gray-100 pt-2 font-bold">
                <dt>{adminLabels.applications.amount}</dt>
                <dd dir="ltr" className="text-blue-600">${app.totalAmount}</dd>
              </div>
            </dl>
          </section>

          <section className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
            <h2 className="mb-4 font-bold text-gray-900">{adminLabels.detail.status}</h2>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as ApplicationStatus)}
              className="mb-4 w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm focus:border-blue-500 focus:outline-none"
            >
              {(Object.keys(adminLabels.status) as ApplicationStatus[]).map((s) => (
                <option key={s} value={s}>{adminLabels.status[s]}</option>
              ))}
            </select>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">
              {adminLabels.detail.adminNotes}
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={4}
              placeholder={adminLabels.detail.notesPlaceholder}
              className="mb-4 w-full rounded-xl border border-gray-200 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
            />
            <button
              type="button"
              onClick={handleSave}
              className="w-full rounded-xl bg-blue-600 py-2.5 text-sm font-bold text-white hover:bg-blue-700"
            >
              {saved ? '✓ تم الحفظ' : adminLabels.detail.saveStatus}
            </button>
          </section>
        </div>
      </div>
    </div>
  );
};
