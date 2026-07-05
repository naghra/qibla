import React from 'react';
import type { StoredApplication } from '../../types/admin';
import type { TravelerData } from '../../types';
import { adminLabels } from '../../data/adminLabels';
import {
  countryLabel,
  displayValue,
  formatAdminDate,
  formatCurrency,
  formatGender,
  formatPhoneDisplay,
  formatPurpose,
} from '../../utils/adminFormatters';
import './applicationPrint.css';

const LOGO_SRC = '/images/logo.webp';

interface ApplicationPrintSheetProps {
  app: StoredApplication;
  notes?: string;
}

function PrintField({
  label,
  value,
  mono = false,
  full = false,
}: {
  label: string;
  value: string;
  mono?: boolean;
  full?: boolean;
}) {
  const empty = value === 'غير متوفر';
  return (
    <div className={`print-field${full ? ' print-field--full' : ''}`}>
      <dt>{label}</dt>
      <dd className={`${mono ? 'mono' : ''}${empty ? ' muted' : ''}`} dir={mono ? 'ltr' : undefined}>
        {value}
      </dd>
    </div>
  );
}

const TravelerSection: React.FC<{
  traveler: TravelerData;
  index: number;
  total: number;
  lang: 'ar' | 'en';
}> = ({ traveler, index, total, lang }) => {
  const L = adminLabels.detail;
  const title =
    total > 1 ? `${L.primaryTraveler} ${index + 1}` : L.applicantTitle;

  return (
    <section className="print-section">
      <div className="print-section-head">
        <span className="print-section-icon">{index + 1}</span>
        <h3 className="print-section-title">{title}</h3>
        <span className="print-section-line" aria-hidden />
      </div>
      <div className="print-section-body">
        <dl className="print-grid">
          <PrintField
            label={L.applicant}
            value={displayValue(`${traveler.firstName} ${traveler.lastName}`.trim())}
          />
          <PrintField label={L.email} value={displayValue(traveler.email)} mono />
          <PrintField
            label={L.phone}
            value={formatPhoneDisplay(traveler.phone, traveler.phoneCountry, lang)}
            mono
          />
          <PrintField label={L.dateOfBirth} value={formatAdminDate(traveler.dateOfBirth)} mono />
          <PrintField label={L.gender} value={formatGender(traveler.gender)} />
          <PrintField label={L.nationality} value={countryLabel(traveler.nationality, lang)} />
          <PrintField label={L.passport} value={displayValue(traveler.passportNumber)} mono />
          <PrintField label={L.passportCountry} value={countryLabel(traveler.passportCountry, lang)} />
          <PrintField label={L.passportIssue} value={formatAdminDate(traveler.passportIssueDate)} mono />
          <PrintField label={L.passportExpiry} value={formatAdminDate(traveler.passportExpiryDate)} mono />
        </dl>
      </div>
    </section>
  );
};

export const ApplicationPrintSheet: React.FC<ApplicationPrintSheetProps> = ({ app, notes }) => {
  const L = adminLabels;
  const D = L.detail;
  const travel = app.data.travel;
  const primary = app.data.travelers[0];
  const applicantName = primary
    ? `${primary.firstName} ${primary.lastName}`.trim()
    : D.applicantTitle;
  const accommodation = [travel.accommodationAddress, travel.accommodationCity]
    .filter(Boolean)
    .join('، ');
  const printedAt = formatAdminDate(new Date().toISOString(), true);
  const history = app.statusHistory?.length
    ? app.statusHistory
    : [{ status: app.status, at: app.createdAt }];

  return (
    <div className="application-print-sheet" aria-hidden="true">
      <article className="print-doc" dir="rtl">
        <header className="print-hero">
          <div className="print-hero-glow" aria-hidden />
          <div className="print-hero-inner">
            <div className="print-hero-brand">
              <div className="print-logo-wrap">
                <img src={LOGO_SRC} alt="DacGateway" className="print-logo" />
              </div>
              <div>
                <h1 className="print-brand">DacGateway</h1>
                <p className="print-brand-sub">{L.siteTagline}</p>
              </div>
            </div>
            <div className="print-hero-meta">
              <p className="print-meta-label">{D.printedAt}</p>
              <p className="print-meta-value" dir="ltr">
                {printedAt}
              </p>
            </div>
          </div>
          <div className="print-hero-rule" aria-hidden />
        </header>

        <div className="print-title-card">
          <div className="print-title-main-wrap">
            <p className="print-title-eyebrow">{D.printTitle}</p>
            <h2 className="print-title-main">{applicantName}</h2>
            <p className="print-title-sub">
              {app.destinationName} · {app.serviceName}
            </p>
          </div>
          <div className="print-ref-box">
            <p className="print-ref-label">{D.reference}</p>
            <p className="print-ref-id" dir="ltr">
              {app.id}
            </p>
            <span className={`print-status print-status--${app.status}`}>
              {L.status[app.status]}
            </span>
          </div>
        </div>

        <p className="print-summary-heading">{D.orderSummary}</p>
        <div className="print-summary">
          <div className="print-summary-item">
            <p className="print-summary-label">{L.applications.destination}</p>
            <p className="print-summary-value">{app.destinationName}</p>
          </div>
          <div className="print-summary-item">
            <p className="print-summary-label">{L.applications.service}</p>
            <p className="print-summary-value">{app.serviceName}</p>
          </div>
          <div className="print-summary-item">
            <p className="print-summary-label">{L.applications.plan}</p>
            <p className="print-summary-value">{app.planName}</p>
          </div>
          <div className="print-summary-item">
            <p className="print-summary-label">{L.applications.amount}</p>
            <p className="print-summary-value print-summary-value--amount" dir="ltr">
              {formatCurrency(app.totalAmount)}
            </p>
          </div>
        </div>

        <div className="print-summary print-summary--meta">
          <div className="print-summary-item">
            <p className="print-summary-label">{D.created}</p>
            <p className="print-summary-value" dir="ltr">
              {formatAdminDate(app.createdAt, true)}
            </p>
          </div>
          <div className="print-summary-item">
            <p className="print-summary-label">{D.updated}</p>
            <p className="print-summary-value" dir="ltr">
              {formatAdminDate(app.updatedAt, true)}
            </p>
          </div>
          <div className="print-summary-item">
            <p className="print-summary-label">{D.lang}</p>
            <p className="print-summary-value" dir="ltr">
              {app.lang.toUpperCase()}
            </p>
          </div>
          <div className="print-summary-item">
            <p className="print-summary-label">{D.travelers}</p>
            <p className="print-summary-value">{app.data.travelers.length}</p>
          </div>
        </div>

        {app.data.travelers.map((traveler, i) => (
          <TravelerSection
            key={i}
            traveler={traveler}
            index={i}
            total={app.data.travelers.length}
            lang={app.lang}
          />
        ))}

        <section className="print-section">
          <div className="print-section-head">
            <span className="print-section-icon">T</span>
            <h3 className="print-section-title">{D.travelDetails}</h3>
            <span className="print-section-line" aria-hidden />
          </div>
          <div className="print-section-body">
            <dl className="print-grid">
              <PrintField label={D.arrival} value={formatAdminDate(travel.arrivalDate)} mono />
              <PrintField label={D.departure} value={formatAdminDate(travel.departureDate)} mono />
              <PrintField label={D.flight} value={displayValue(travel.flightNumber)} mono />
              <PrintField label={D.purpose} value={formatPurpose(travel.purposeOfVisit)} />
              <PrintField
                label={D.accommodation}
                value={displayValue(accommodation || undefined)}
                full
              />
            </dl>
          </div>
        </section>

        {notes?.trim() && (
          <section className="print-section">
            <div className="print-section-head">
              <span className="print-section-icon">N</span>
              <h3 className="print-section-title">{D.adminNotes}</h3>
              <span className="print-section-line" aria-hidden />
            </div>
            <div className="print-notes">{notes.trim()}</div>
          </section>
        )}

        <section className="print-section">
          <div className="print-section-head">
            <span className="print-section-icon">H</span>
            <h3 className="print-section-title">{D.timeline}</h3>
            <span className="print-section-line" aria-hidden />
          </div>
          <div className="print-section-body print-section-body--flush">
            <table className="print-timeline">
              <thead>
                <tr>
                  <th>{L.applications.status}</th>
                  <th>{D.created}</th>
                  <th>{D.timelineNote}</th>
                </tr>
              </thead>
              <tbody>
                {history.map((entry, i) => (
                  <tr key={`${entry.at}-${i}`}>
                    <td>
                      <span className={`print-status print-status--${entry.status}`}>
                        {L.status[entry.status]}
                      </span>
                    </td>
                    <td dir="ltr">{formatAdminDate(entry.at, true)}</td>
                    <td>{entry.note?.trim() || '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <footer className="print-footer">
          <div className="print-footer-brand">
            <img src={LOGO_SRC} alt="" className="print-footer-logo" aria-hidden />
            <span className="print-footer-name">DacGateway</span>
          </div>
          <span className="print-footer-note">{D.printConfidential}</span>
        </footer>
      </article>
    </div>
  );
};
