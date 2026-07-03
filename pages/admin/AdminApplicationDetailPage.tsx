import React, { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
  ArrowRight,
  Copy,
  Check,
  Mail,
  Phone,
  Printer,
  CheckCircle,
  XCircle,
  Clock,
} from 'lucide-react';
import { StatusBadge } from '../../components/admin/StatusBadge';
import { ActivityTimeline } from '../../components/admin/ActivityTimeline';
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
  const [copied, setCopied] = useState(false);

  if (!app) {
    return (
      <div className="p-8 text-center">
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

  const quickStatus = (s: ApplicationStatus) => {
    setStatus(s);
    updateApplicationStatus(app.id, s, notes);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const copyId = async () => {
    await navigator.clipboard.writeText(app.id);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleString('ar-EG', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <button
        type="button"
        onClick={() => navigate('/admin/applications')}
        className="mb-4 flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-blue-600"
      >
        <ArrowRight className="size-4" />
        {adminLabels.detail.back}
      </button>

      <header className="mb-6 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm sm:p-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="min-w-0">
            <h1 className="text-xl font-bold text-gray-900 sm:text-2xl">{adminLabels.detail.title}</h1>
            <div className="mt-2 flex flex-wrap items-center gap-2">
              <p className="break-all font-mono text-xs text-gray-500 sm:text-sm" dir="ltr">{app.id}</p>
              <button
                type="button"
                onClick={copyId}
                className="flex items-center gap-1 rounded-lg bg-gray-100 px-2 py-1 text-xs font-medium text-gray-600 hover:bg-gray-200"
              >
                {copied ? <Check className="size-3 text-green-600" /> : <Copy className="size-3" />}
                {copied ? adminLabels.applications.copied : adminLabels.detail.copyId}
              </button>
            </div>
            <p className="mt-1 text-xs text-gray-400">
              {adminLabels.detail.created}: {formatDate(app.createdAt)}
            </p>
          </div>
          <StatusBadge status={app.status} />
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => quickStatus('processing')}
            className="flex items-center gap-1.5 rounded-xl bg-blue-50 px-3 py-2 text-xs font-medium text-blue-700 hover:bg-blue-100 sm:text-sm"
          >
            <Clock className="size-4" />
            {adminLabels.detail.quickProcess}
          </button>
          <button
            type="button"
            onClick={() => quickStatus('approved')}
            className="flex items-center gap-1.5 rounded-xl bg-emerald-50 px-3 py-2 text-xs font-medium text-emerald-700 hover:bg-emerald-100 sm:text-sm"
          >
            <CheckCircle className="size-4" />
            {adminLabels.detail.quickApprove}
          </button>
          <button
            type="button"
            onClick={() => quickStatus('rejected')}
            className="flex items-center gap-1.5 rounded-xl bg-red-50 px-3 py-2 text-xs font-medium text-red-700 hover:bg-red-100 sm:text-sm"
          >
            <XCircle className="size-4" />
            {adminLabels.detail.quickReject}
          </button>
          {primary?.email && (
            <a
              href={`mailto:${primary.email}?subject=${encodeURIComponent(app.id)}`}
              className="flex items-center gap-1.5 rounded-xl border border-gray-200 px-3 py-2 text-xs font-medium text-gray-700 hover:bg-gray-50 sm:text-sm"
            >
              <Mail className="size-4" />
              {adminLabels.detail.sendEmail}
            </a>
          )}
          {primary?.phone && (
            <a
              href={`tel:${primary.phone.replace(/\s/g, '')}`}
              className="flex items-center gap-1.5 rounded-xl border border-gray-200 px-3 py-2 text-xs font-medium text-gray-700 hover:bg-gray-50 sm:text-sm"
            >
              <Phone className="size-4" />
              {adminLabels.detail.call}
            </a>
          )}
          <button
            type="button"
            onClick={() => window.print()}
            className="flex items-center gap-1.5 rounded-xl border border-gray-200 px-3 py-2 text-xs font-medium text-gray-700 hover:bg-gray-50 sm:text-sm"
          >
            <Printer className="size-4" />
            {adminLabels.detail.print}
          </button>
        </div>
      </header>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <section className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm sm:p-5">
            <h2 className="mb-4 font-bold text-gray-900">{adminLabels.detail.travelers}</h2>
            {app.data.travelers.map((traveler, i) => (
              <div key={i} className={i > 0 ? 'mt-4 border-t border-gray-100 pt-4' : ''}>
                <p className="mb-2 text-sm font-medium text-blue-600">
                  {adminLabels.detail.primaryTraveler} {i + 1}
                </p>
                <dl className="grid gap-3 sm:grid-cols-2 text-sm">
                  <div>
                    <dt className="text-gray-500">{adminLabels.detail.applicant}</dt>
                    <dd className="font-medium">{traveler.firstName} {traveler.lastName}</dd>
                  </div>
                  <div>
                    <dt className="text-gray-500">{adminLabels.detail.email}</dt>
                    <dd dir="ltr" className="break-all">{traveler.email}</dd>
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

          <section className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm sm:p-5">
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

          <section className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm sm:p-5">
            <h2 className="mb-4 font-bold text-gray-900">{adminLabels.detail.timeline}</h2>
            <ActivityTimeline
              history={app.statusHistory ?? [{ status: app.status, at: app.createdAt }]}
              createdAt={app.createdAt}
            />
          </section>
        </div>

        <div className="space-y-6">
          <section className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm sm:p-5">
            <h2 className="mb-4 font-bold text-gray-900">{adminLabels.detail.orderSummary}</h2>
            <dl className="space-y-2 text-sm">
              <div className="flex justify-between gap-2">
                <dt className="text-gray-500">{adminLabels.applications.destination}</dt>
                <dd className="font-medium text-end">{app.destinationName}</dd>
              </div>
              <div className="flex justify-between gap-2">
                <dt className="text-gray-500">{adminLabels.applications.service}</dt>
                <dd className="text-end">{app.serviceName}</dd>
              </div>
              <div className="flex justify-between gap-2">
                <dt className="text-gray-500">{adminLabels.applications.plan}</dt>
                <dd className="text-end">{app.planName}</dd>
              </div>
              <div className="flex justify-between gap-2">
                <dt className="text-gray-500">{adminLabels.detail.lang}</dt>
                <dd className="uppercase" dir="ltr">{app.lang}</dd>
              </div>
              <div className="flex justify-between gap-2 border-t border-gray-100 pt-2 font-bold">
                <dt>{adminLabels.applications.amount}</dt>
                <dd dir="ltr" className="text-blue-600">${app.totalAmount}</dd>
              </div>
            </dl>
          </section>

          <section className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm sm:p-5 lg:sticky lg:top-24">
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
            <p className="mt-2 text-center text-xs text-gray-400">
              {adminLabels.detail.updated}: {formatDate(app.updatedAt)}
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};
