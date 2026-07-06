import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Loader2, Plane } from 'lucide-react';
import { ApplyStepper } from './ApplyStepper';
import { TripDetailsStep } from './TripDetailsStep';
import { YourInfoStep } from './YourInfoStep';
import { ResumeStep } from './ResumeStep';
import { ApplySuccessScreen } from './ApplySuccessScreen';
import { getDialPrefix } from './PhoneCountrySelect';
import { travelerDateParts, passportScanToUpdates } from './TravelerInfoCard';
import type { PassportScanData } from '../../services/passportScanService';
import { applyBtnPrevious, applyBtnPrimary } from './applyStyles';
import { ApplicationData, PlanId, TravelerData, TravelDetails } from '../../types';
import { useLanguage } from '../../context/LanguageContext';
import { saveApplication } from '../../services/applicationStore';
import { CheckoutError, createCheckoutSession, fetchCheckoutConfig, verifyCheckoutSession } from '../../services/paymentService';
import { buildPaymentPath } from '../../data/destinations';
import { saveCheckoutCache } from '../../services/checkoutCache';
import { preloadStripe } from '../../services/stripeLoader';
import { trackGoogleAdsPurchase } from '../../utils/googleAds';
import { computeEstimatedProcessing } from '../../utils/estimatedProcessing';
import {
  DateParts,
  datePartsToIso,
  defaultDateParts,
} from '../../utils/dateParts';
import { useAutoPhoneCountry } from '../../hooks/useAutoPhoneCountry';

const defaultCountry = (lang: string) => (lang === 'ar' ? 'EG' : 'NL');

const emptyTraveler = (lang: string): TravelerData => {
  const country = defaultCountry(lang);
  return {
    firstName: '',
    lastName: '',
    passportNumber: '',
    passportCountry: country,
    passportIssueDate: '',
    passportExpiryDate: '',
    nationality: country,
    dateOfBirth: '',
    gender: '',
    email: '',
    phone: '',
    phoneCountry: lang === 'ar' ? 'EG' : 'FR',
  };
};

const emptyTravel: TravelDetails = {
  arrivalDate: '',
  departureDate: '',
  flightNumber: '',
  purposeOfVisit: '',
  accommodationAddress: '',
  accommodationCity: '',
};

function syncTravelerDates(traveler: TravelerData): TravelerData {
  const dob = travelerDateParts(traveler, 'dateOfBirth');
  const issue = travelerDateParts(traveler, 'passportIssueDate');
  const expiry = travelerDateParts(traveler, 'passportExpiryDate');
  return {
    ...traveler,
    dateOfBirth: traveler.dateOfBirth || datePartsToIso(dob),
    passportIssueDate: traveler.passportIssueDate || datePartsToIso(issue),
    passportExpiryDate: traveler.passportExpiryDate || datePartsToIso(expiry),
  };
}

function hasDateParts(parts?: DateParts): boolean {
  return Boolean(parts?.year && parts?.month && parts?.day);
}

function createTravelerBundle(lang: string) {
  const traveler = syncTravelerDates(emptyTraveler(lang));
  return {
    traveler,
    dob: travelerDateParts(traveler, 'dateOfBirth'),
    issue: travelerDateParts(traveler, 'passportIssueDate'),
    expiry: travelerDateParts(traveler, 'passportExpiryDate'),
  };
}

interface ApplyApplicationWizardProps {
  initialPlan?: PlanId;
  onComplete?: () => void;
  onSubmitted?: (submitted: boolean) => void;
}

export const ApplyApplicationWizard: React.FC<ApplyApplicationWizardProps> = ({
  initialPlan = 'standard',
  onComplete,
  onSubmitted,
}) => {
  const { t, lang, dir, destination, service } = useLanguage();
  const navigate = useNavigate();
  const a = t.apply;
  const plans = t.pricing.plans;
  const [searchParams, setSearchParams] = useSearchParams();

  const [step, setStep] = useState(0);
  const [submittedId, setSubmittedId] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);
  const [arrival, setArrival] = useState<DateParts>(() => defaultDateParts(7));
  const [departure, setDeparture] = useState<DateParts>(() => defaultDateParts(14));
  const [email, setEmail] = useState('');
  const { phoneCountry, setPhoneCountry, resetPhoneCountry } = useAutoPhoneCountry(lang);
  const [phone, setPhone] = useState('');

  const initialBundle = createTravelerBundle(lang);

  const [data, setData] = useState<ApplicationData>(() => ({
    travelers: [initialBundle.traveler],
    travel: { ...emptyTravel },
    plan: initialPlan,
  }));

  const [dobParts, setDobParts] = useState<DateParts[]>(() => [initialBundle.dob]);
  const [issueParts, setIssueParts] = useState<DateParts[]>(() => [initialBundle.issue]);
  const [expiryParts, setExpiryParts] = useState<DateParts[]>(() => [initialBundle.expiry]);

  const selectedPlan = plans.find((p) => p.id === data.plan)!;
  const total = (selectedPlan.price + selectedPlan.priorityFee) * data.travelers.length;
  const estimatedAt = computeEstimatedProcessing(data.plan, lang);
  const destinationLabel =
    destination?.name[lang] ?? service?.shortName[lang] ?? (lang === 'ar' ? 'وجهتك' : 'your destination');

  useEffect(() => {
    if (step === 2 && data.plan === 'standard') {
      setData((d) => ({ ...d, plan: 'fast' }));
    }
  }, [step, data.plan]);

  useEffect(() => {
    if (step !== 2) return;
    void fetchCheckoutConfig().then((config) => {
      if (config?.publishableKey) preloadStripe(config.publishableKey);
    });
  }, [step]);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [step]);

  useEffect(() => {
    const sessionId = searchParams.get('session_id');
    if (sessionId) {
      setVerifying(true);
      setPaymentError(null);
      void verifyCheckoutSession(sessionId)
        .then((result) => {
          if (result.paid && result.application) {
            const primary = result.application.data.travelers[0];
            trackGoogleAdsPurchase({
              transactionId: result.application.id,
              value: Number(result.application.totalAmount),
            });
            setSubmittedId(result.application.id);
            if (primary?.email) setEmail(primary.email);
            setStep(3);
            onSubmitted?.(true);
          } else {
            setPaymentError(a.paymentPending);
          }
        })
        .catch(() => setPaymentError(a.paymentError))
        .finally(() => {
          setVerifying(false);
          const next = new URLSearchParams(searchParams);
          next.delete('session_id');
          setSearchParams(next, { replace: true });
        });
      return;
    }

    if (searchParams.get('payment_cancelled') === '1') {
      setPaymentError(a.paymentCancelled);
      const next = new URLSearchParams(searchParams);
      next.delete('payment_cancelled');
      setSearchParams(next, { replace: true });
    }
  }, [searchParams, setSearchParams, a.paymentError, a.paymentPending, onSubmitted]);

  const PrevChevron = dir === 'rtl' ? ChevronRight : ChevronLeft;
  const NextChevron = dir === 'rtl' ? ChevronLeft : ChevronRight;

  const syncTripToData = (): ApplicationData => {
    const fullPhone = phone.trim() ? `${getDialPrefix(phoneCountry)} ${phone.trim()}` : '';
    const travel: TravelDetails = {
      ...data.travel,
      arrivalDate: datePartsToIso(arrival),
      departureDate: datePartsToIso(departure),
    };
    const travelers = [...data.travelers];
    travelers[0] = {
      ...travelers[0],
      email,
      phone: fullPhone,
      phoneCountry,
    };
    return { ...data, travel, travelers };
  };

  const updateTraveler = (index: number, field: keyof TravelerData, value: string) => {
    setData((d) => {
      const travelers = [...d.travelers];
      travelers[index] = { ...travelers[index], [field]: value };
      return { ...d, travelers };
    });
  };

  const applyPassportScan = (index: number, scan: PassportScanData) => {
    const { patch, dob, issue, expiry } = passportScanToUpdates(scan);

    setData((d) => {
      const travelers = [...d.travelers];
      travelers[index] = { ...travelers[index], ...patch };
      return { ...d, travelers };
    });

    if (dob) {
      setDobParts((parts) => {
        const next = [...parts];
        next[index] = dob;
        return next;
      });
    }
    if (issue) {
      setIssueParts((parts) => {
        const next = [...parts];
        next[index] = issue;
        return next;
      });
    }
    if (expiry) {
      setExpiryParts((parts) => {
        const next = [...parts];
        next[index] = expiry;
        return next;
      });
    }
  };

  const addTraveler = () => {
    const bundle = createTravelerBundle(lang);
    setData({ ...data, travelers: [...data.travelers, bundle.traveler] });
    setDobParts((p) => [...p, bundle.dob]);
    setIssueParts((p) => [...p, bundle.issue]);
    setExpiryParts((p) => [...p, bundle.expiry]);
  };

  const removeTraveler = (index: number) => {
    if (data.travelers.length <= 1) return;
    setData({ ...data, travelers: data.travelers.filter((_, i) => i !== index) });
    setDobParts((p) => p.filter((_, i) => i !== index));
    setIssueParts((p) => p.filter((_, i) => i !== index));
    setExpiryParts((p) => p.filter((_, i) => i !== index));
  };

  const canProceed = () => {
    if (step === 0) {
      const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
      return (
        arrival.year && arrival.month && arrival.day &&
        departure.year && departure.month && departure.day &&
        emailOk &&
        phoneCountry &&
        phone.trim().length >= 4
      );
    }
    if (step === 1) {
      return data.travelers.every(
        (tr, i) =>
          tr.firstName.trim() &&
          tr.lastName.trim() &&
          tr.gender &&
          tr.passportCountry &&
          tr.nationality &&
          tr.passportNumber.trim() &&
          hasDateParts(dobParts[i]) &&
          hasDateParts(issueParts[i]) &&
          hasDateParts(expiryParts[i])
      );
    }
    return true;
  };

  const handleContinue = () => {
    let synced = syncTripToData();
    if (step === 1) synced = { ...data, travelers: data.travelers.map((tr, i) => ({
      ...tr,
      dateOfBirth: datePartsToIso(dobParts[i] ?? travelerDateParts(tr, 'dateOfBirth')),
      passportIssueDate: datePartsToIso(issueParts[i] ?? travelerDateParts(tr, 'passportIssueDate')),
      passportExpiryDate: datePartsToIso(expiryParts[i] ?? travelerDateParts(tr, 'passportExpiryDate')),
    })) };
    setData(synced);

    if (step === 2) {
      if (!destination || !service) return;

      const plan = plans.find((p) => p.id === synced.plan)!;
      const amount = (plan.price + plan.priorityFee) * synced.travelers.length;
      const input = {
        lang,
        destinationSlug: destination.slug,
        destinationName: destination.name[lang],
        serviceSlug: service.slug,
        serviceName: service.shortName[lang],
        planId: synced.plan,
        planName: plan.name,
        totalAmount: amount,
        data: synced,
      };

      setSubmitting(true);
      setPaymentError(null);

      void createCheckoutSession(input)
        .then((session) => {
          preloadStripe(session.publishableKey);
          const application = session.application ?? {
            serviceName: input.serviceName,
            destinationName: input.destinationName,
            totalAmount: input.totalAmount,
          };
          const payload = { checkout: session, application };
          saveCheckoutCache(session.sessionId, payload);
          navigate(
            `${buildPaymentPath(lang, destination.slug, service.slug)}?session_id=${encodeURIComponent(session.sessionId)}`,
            { state: payload }
          );
        })
        .catch(async (err: unknown) => {
          const isStripeMissing =
            err instanceof CheckoutError &&
            err.status === 503 &&
            err.code === 'stripe_not_configured';

          if (isStripeMissing && !import.meta.env.PROD) {
            const record = await saveApplication(input);
            setSubmittedId(record.id);
            onSubmitted?.(true);
            setStep(3);
            return;
          }

          setPaymentError(err instanceof Error ? err.message : a.paymentError);
        })
        .finally(() => setSubmitting(false));
      return;
    }

    if (step === 0) setData(synced);
    setStep(step + 1);
  };

  const handleBack = () => {
    if (step === 1) setData(syncTripToData());
    setStep(step - 1);
  };

  const handleDone = () => {
    onSubmitted?.(false);
    setStep(0);
    setSubmittedId(null);
    setEmail('');
    setPhone('');
    resetPhoneCountry();
    setArrival(defaultDateParts(7));
    setDeparture(defaultDateParts(14));
    const fresh = createTravelerBundle(lang);
    setData({ travelers: [fresh.traveler], travel: { ...emptyTravel }, plan: initialPlan });
    setDobParts([fresh.dob]);
    setIssueParts([fresh.issue]);
    setExpiryParts([fresh.expiry]);
    onComplete?.();
  };

  const formSteps = a.formSteps;

  if (verifying) {
    return (
      <div className="flex min-h-[40vh] flex-col items-center justify-center gap-4 py-16 text-center">
        <Loader2 className="size-10 animate-spin text-blue-500" />
        <p className="text-sm font-medium text-gray-600">{a.paymentVerifying}</p>
      </div>
    );
  }

  if (step === 3) {
    return (
      <ApplySuccessScreen
        submittedId={submittedId}
        applicantName={`${data.travelers[0]?.firstName ?? ''} ${data.travelers[0]?.lastName ?? ''}`.trim()}
        email={email}
        destinationName={destination?.name[lang] ?? destinationLabel}
        serviceName={service?.shortName[lang] ?? destinationLabel}
        planName={selectedPlan.name}
        travelerCount={data.travelers.length}
        total={total}
        estimatedAt={estimatedAt}
        onDone={handleDone}
      />
    );
  }

  return (
    <div data-apply-form-inner className="mb-0 flex flex-col items-start gap-8">
      {(paymentError) && (
        <div
          className="w-full rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800"
          role="alert"
        >
          {paymentError}
        </div>
      )}

      <div className="w-full">
        <ApplyStepper steps={formSteps} current={step} />
      </div>

      <div className="w-full space-y-12">
      {step === 0 && (
        <TripDetailsStep
          a={a}
          lang={lang}
          arrival={arrival}
          departure={departure}
          onArrivalChange={setArrival}
          onDepartureChange={setDeparture}
          email={email}
          onEmailChange={setEmail}
          phoneCountry={phoneCountry}
          onPhoneCountryChange={setPhoneCountry}
          phone={phone}
          onPhoneChange={setPhone}
        />
      )}

      {step === 1 && (
        <YourInfoStep
          a={a}
          lang={lang}
          travelers={data.travelers}
          onUpdateTraveler={updateTraveler}
          onAddTraveler={addTraveler}
          onRemoveTraveler={removeTraveler}
          dobParts={dobParts}
          issueParts={issueParts}
          expiryParts={expiryParts}
          onDobChange={(i, parts) => {
            setDobParts((prev) => {
              const next = [...prev];
              next[i] = parts;
              return next;
            });
            updateTraveler(i, 'dateOfBirth', datePartsToIso(parts));
          }}
          onIssueChange={(i, parts) => {
            setIssueParts((prev) => {
              const next = [...prev];
              next[i] = parts;
              return next;
            });
            updateTraveler(i, 'passportIssueDate', datePartsToIso(parts));
          }}
          onExpiryChange={(i, parts) => {
            setExpiryParts((prev) => {
              const next = [...prev];
              next[i] = parts;
              return next;
            });
            updateTraveler(i, 'passportExpiryDate', datePartsToIso(parts));
          }}
          onPassportExtracted={applyPassportScan}
        />
      )}

      {step === 2 && (
        <ResumeStep
          a={a}
          plans={plans}
          selectedPlanId={data.plan}
          onPlanChange={(id) => setData({ ...data, plan: id })}
          travelerCount={data.travelers.length}
          total={total}
          estimatedAt={estimatedAt}
          destinationName={destinationLabel}
        />
      )}

      <div className="mx-auto flex w-full flex-col gap-4">
        <button
          type="button"
          onClick={handleContinue}
          disabled={!canProceed() || submitting}
          className={applyBtnPrimary}
        >
          {step === 2 ? (
            submitting ? (
              <>
                <Loader2 className="size-5 animate-spin" />
                {a.paymentProcessing}
              </>
            ) : (
              <>
                {a.submit}
                <Plane className="size-5" />
              </>
            )
          ) : (
            <>
              {a.saveAndContinue}
              <NextChevron className="size-5" />
            </>
          )}
        </button>
        {step > 0 && (
          <button type="button" onClick={handleBack} className={applyBtnPrevious}>
            <PrevChevron className="size-4" />
            {a.previousStep}
          </button>
        )}
      </div>
      </div>
    </div>
  );
};
