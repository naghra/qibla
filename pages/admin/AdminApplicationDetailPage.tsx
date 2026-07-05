import React, { useEffect, useState } from 'react';
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
  User,
  Plane,
  FileText,
  Globe,
  CreditCard,
  MapPin,
  Calendar,
} from 'lucide-react';
import { StatusBadge } from '../../components/admin/StatusBadge';
import { ActivityTimeline } from '../../components/admin/ActivityTimeline';
import { DetailField, DetailGrid, DetailSection } from '../../components/admin/DetailSection';
import { adminLabels } from '../../data/adminLabels';
import { getApplication, updateApplicationStatus } from '../../services/applicationStore';
import type { ApplicationStatus, StoredApplication } from '../../types/admin';
import type { TravelerData } from '../../types';
import {
  countryLabel,
  displayValue,
  formatAdminDate,
  formatApplicationAsText,
  formatCurrency,
  formatGender,
  formatPhoneDisplay,
  formatPurpose,
  travelerInitials,
} from '../../utils/adminFormatters';

export const AdminApplicationDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [app, setApp] = useState<StoredApplication | undefined>();
  const [loading, setLoading] = useState(true);

  const [status, setStatus] = useState<ApplicationStatus>('pending');
  const [notes, setNotes] = useState('');
  const [saved, setSaved] = useState(false);
  const [copied, setCopied] = useState(false);
  const [copiedAll, setCopiedAll] = useState(false);

  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }
    void getApplication(id).then((found) => {
      setApp(found);
      if (found) {
        setStatus(found.status);
        setNotes(found.adminNotes ?? '');
      }
      setLoading(false);
    });
  }, [id]);

  if (loading) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center p-8">
        <div className="text-center">
          <div className="mx-auto mb-3 size-8 animate-spin rounded-full border-2 border-blue-600 border-t-transparent" />
          <p className="text-sm text-gray-500">جاري تحميل الطلب...</p>
        </div>
      </div>
    );
  }

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
  const applicantName = primary
    ? `${primary.firstName} ${primary.lastName}`.trim()
    : adminLabels.detail.applicantTitle;

  const handleSave = () => {
    void updateApplicationStatus(app.id, status, notes).then((updated) => {
      if (updated) setApp(updated);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    });
  };

  const quickStatus = (s: ApplicationStatus) => {
    setStatus(s);
    void updateApplicationStatus(app.id, s, notes).then((updated) => {
      if (updated) setApp(updated);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    });
  };

  const copyId = async () => {
    await navigator.clipboard.writeText(app.id);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const copyAll = async () => {
    await navigator.clipboard.writeText(formatApplicationAsText(app));
    setCopiedAll(true);
    setTimeout(() => setCopiedAll(false), 2500);
  };

  const renderTravelerFields = (traveler: TravelerData, lang: 'ar' | 'en') => {
    const phone = formatPhoneDisplay(traveler.phone, traveler.phoneCountry, lang);
    return (
    <DetailGrid>
      <DetailField label={adminLabels.detail.applicant} value={displayValue(`${traveler.firstName} ${traveler.lastName}`.trim())} copyText={displayValue(`${traveler.firstName} ${traveler.lastName}`.trim())} />
      <DetailField label={adminLabels.detail.email} value={displayValue(traveler.email)} mono copyText={traveler.email} />
      <DetailField label={adminLabels.detail.phone} value={phone} mono copyText={phone !== 'غير متوفر' ? phone : undefined} />
      <DetailField label={adminLabels.detail.dateOfBirth} value={formatAdminDate(traveler.dateOfBirth)} mono />
      <DetailField label={adminLabels.detail.gender} value={formatGender(traveler.gender)} />
      <DetailField label={adminLabels.detail.nationality} value={countryLabel(traveler.nationality, lang)} />
      <DetailField label={adminLabels.detail.passport} value={displayValue(traveler.passportNumber)} mono copyText={traveler.passportNumber} />
      <DetailField label={adminLabels.detail.passportCountry} value={countryLabel(traveler.passportCountry, lang)} />
      <DetailField label={adminLabels.detail.passportIssue} value={formatAdminDate(traveler.passportIssueDate)} mono />
      <DetailField label={adminLabels.detail.passportExpiry} value={formatAdminDate(traveler.passportExpiryDate)} mono />
    </DetailGrid>
    );
  };

  return (
    <div className="w-full max-w-full p-3 sm:p-6 lg:p-8">
      <button
        type="button"
        onClick={() => navigate('/admin/applications')}
        className="mb-4 flex items-center gap-2 text-sm font-medium text-gray-600 transition hover:text-blue-600"
      >
        <ArrowRight className="size-4" />
        {adminLabels.detail.back}
      </button>

      {/* Hero header */}
      <header className="mb-6 overflow-hidden rounded-2xl border border-gray-100 bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900 p-5 text-white shadow-lg sm:p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex min-w-0 items-start gap-4">
            {primary && (
              <div className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-white/15 text-lg font-bold ring-1 ring-white/20 backdrop-blur">
                {travelerInitials(primary.firstName, primary.lastName)}
              </div>
            )}
            <div className="min-w-0">
              <div className="mb-2 flex flex-wrap items-center gap-2">
                <StatusBadge status={app.status} />
                <span className="rounded-full bg-white/10 px-2.5 py-0.5 text-xs font-medium text-blue-100">
                  {app.lang.toUpperCase()}
                </span>
              </div>
              <h1 className="text-xl font-bold sm:text-2xl">{applicantName}</h1>
              <p className="mt-1 text-sm text-blue-100/90">
                {app.destinationName} · {app.serviceName} · {app.planName}
              </p>
              <div className="mt-3 flex flex-wrap items-center gap-2">
                <span className="rounded-lg bg-black/20 px-2.5 py-1 font-mono text-xs text-white/90" dir="ltr">
                  {app.id}
                </span>
                <button
                  type="button"
                  onClick={copyId}
                  className="flex items-center gap-1 rounded-lg bg-white/10 px-2 py-1 text-xs font-medium hover:bg-white/20"
                >
                  {copied ? <Check className="size-3 text-emerald-300" /> : <Copy className="size-3" />}
                  {copied ? adminLabels.applications.copied : adminLabels.detail.copyId}
                </button>
              </div>
              <p className="mt-2 text-xs text-white/60">
                {adminLabels.detail.created}: {formatAdminDate(app.createdAt, true)}
              </p>
            </div>
          </div>
          <div className="shrink-0 rounded-2xl bg-white/10 px-5 py-4 ring-1 ring-white/15 backdrop-blur">
            <p className="text-xs text-blue-100/80">{adminLabels.applications.amount}</p>
            <p className="mt-0.5 text-2xl font-bold" dir="ltr">{formatCurrency(app.totalAmount)}</p>
            <p className="mt-1 text-xs text-white/50">
              {app.data.travelers.length} {app.data.travelers.length === 1 ? 'مسافر' : 'مسافرين'}
            </p>
          </div>
        </div>

        <div className="mt-5 flex flex-wrap gap-2 border-t border-white/10 pt-4">
          <button type="button" onClick={() => quickStatus('processing')} className="action-btn action-btn--blue">
            <Clock className="size-4" />
            {adminLabels.detail.quickProcess}
          </button>
          <button type="button" onClick={() => quickStatus('approved')} className="action-btn action-btn--green">
            <CheckCircle className="size-4" />
            {adminLabels.detail.quickApprove}
          </button>
          <button type="button" onClick={() => quickStatus('rejected')} className="action-btn action-btn--red">
            <XCircle className="size-4" />
            {adminLabels.detail.quickReject}
          </button>
          {primary?.email && (
            <a href={`mailto:${primary.email}?subject=${encodeURIComponent(app.id)}`} className="action-btn action-btn--ghost">
              <Mail className="size-4" />
              {adminLabels.detail.sendEmail}
            </a>
          )}
          {primary?.phone && (
            <a href={`tel:${primary.phone.replace(/\s/g, '')}`} className="action-btn action-btn--ghost">
              <Phone className="size-4" />
              {adminLabels.detail.call}
            </a>
          )}
          <button type="button" onClick={copyAll} className="action-btn action-btn--ghost">
            {copiedAll ? <Check className="size-4 text-emerald-300" /> : <Copy className="size-4" />}
            {copiedAll ? adminLabels.detail.copiedAll : adminLabels.detail.copyAll}
          </button>
          <button type="button" onClick={() => window.print()} className="action-btn action-btn--ghost">
            <Printer className="size-4" />
            {adminLabels.detail.print}
          </button>
        </div>
      </header>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          {app.data.travelers.map((traveler, i) => (
            <DetailSection
              key={i}
              title={`${adminLabels.detail.primaryTraveler} ${app.data.travelers.length > 1 ? i + 1 : ''}`.trim()}
              icon={User}
            >
              {renderTravelerFields(traveler, app.lang)}
            </DetailSection>
          ))}

          <DetailSection title={adminLabels.detail.travelDetails} icon={Plane}>
            <DetailGrid>
              <DetailField label={adminLabels.detail.arrival} value={formatAdminDate(travel.arrivalDate)} mono />
              <DetailField label={adminLabels.detail.departure} value={formatAdminDate(travel.departureDate)} mono />
              <DetailField label={adminLabels.detail.flight} value={displayValue(travel.flightNumber)} mono />
              <DetailField label={adminLabels.detail.purpose} value={formatPurpose(travel.purposeOfVisit)} />
              <DetailField
                label={adminLabels.detail.accommodation}
                value={displayValue(
                  [travel.accommodationAddress, travel.accommodationCity].filter(Boolean).join('، ') || undefined
                )}
              />
            </DetailGrid>
          </DetailSection>

          <DetailSection title={adminLabels.detail.timeline} icon={Clock}>
            <ActivityTimeline
              history={app.statusHistory ?? [{ status: app.status, at: app.createdAt }]}
              createdAt={app.createdAt}
            />
          </DetailSection>
        </div>

        <div className="space-y-6">
          <DetailSection title={adminLabels.detail.orderSummary} icon={FileText}>
            <ul className="space-y-3">
              {[
                { icon: Globe, label: adminLabels.applications.destination, value: app.destinationName },
                { icon: FileText, label: adminLabels.applications.service, value: app.serviceName },
                { icon: CreditCard, label: adminLabels.applications.plan, value: app.planName },
                { icon: MapPin, label: adminLabels.detail.lang, value: app.lang.toUpperCase(), mono: true },
              ].map(({ icon: Icon, label, value, mono }) => (
                <li key={label} className="flex items-center gap-3 rounded-xl bg-gray-50 px-3 py-2.5">
                  <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-white text-gray-500 ring-1 ring-gray-100">
                    <Icon className="size-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs text-gray-500">{label}</p>
                    <p className={`truncate text-sm font-semibold text-gray-900 ${mono ? 'font-mono' : ''}`} dir={mono ? 'ltr' : undefined}>
                      {value}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-4 flex items-center justify-between rounded-xl bg-blue-50 px-4 py-3 ring-1 ring-blue-100">
              <span className="text-sm font-bold text-blue-900">{adminLabels.applications.amount}</span>
              <span className="text-lg font-bold text-blue-700" dir="ltr">{formatCurrency(app.totalAmount)}</span>
            </div>
          </DetailSection>

          <DetailSection title={adminLabels.detail.status} icon={Calendar}>
            <label className="mb-1.5 block text-xs font-medium text-gray-500">{adminLabels.applications.status}</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as ApplicationStatus)}
              className="mb-4 w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm font-medium focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-100"
            >
              {(Object.keys(adminLabels.status) as ApplicationStatus[]).map((s) => (
                <option key={s} value={s}>{adminLabels.status[s]}</option>
              ))}
            </select>
            <label className="mb-1.5 block text-xs font-medium text-gray-500">
              {adminLabels.detail.adminNotes}
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={4}
              placeholder={adminLabels.detail.notesPlaceholder}
              className="mb-4 w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-100"
            />
            <button
              type="button"
              onClick={handleSave}
              className="w-full rounded-xl bg-blue-600 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-blue-700 active:scale-[0.99]"
            >
              {saved ? '✓ تم الحفظ بنجاح' : adminLabels.detail.saveStatus}
            </button>
            <p className="mt-3 text-center text-xs text-gray-400">
              {adminLabels.detail.updated}: {formatAdminDate(app.updatedAt, true)}
            </p>
          </DetailSection>
        </div>
      </div>

      <style>{`
        .action-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.375rem;
          border-radius: 0.75rem;
          padding: 0.5rem 0.75rem;
          font-size: 0.75rem;
          font-weight: 600;
          transition: background 0.15s;
        }
        @media (min-width: 640px) { .action-btn { font-size: 0.875rem; } }
        .action-btn--blue { background: rgba(59,130,246,0.25); color: #dbeafe; }
        .action-btn--blue:hover { background: rgba(59,130,246,0.4); }
        .action-btn--green { background: rgba(16,185,129,0.25); color: #d1fae5; }
        .action-btn--green:hover { background: rgba(16,185,129,0.4); }
        .action-btn--red { background: rgba(239,68,68,0.25); color: #fee2e2; }
        .action-btn--red:hover { background: rgba(239,68,68,0.4); }
        .action-btn--ghost { background: rgba(255,255,255,0.1); color: #fff; ring: 1px solid rgba(255,255,255,0.15); }
        .action-btn--ghost:hover { background: rgba(255,255,255,0.18); }
      `}</style>
    </div>
  );
};
