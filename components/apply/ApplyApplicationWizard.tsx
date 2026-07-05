import React, { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, Plane } from 'lucide-react';
import { ApplyStepper } from './ApplyStepper';
import { TripDetailsStep } from './TripDetailsStep';
import { YourInfoStep } from './YourInfoStep';
import { ResumeStep } from './ResumeStep';
import { ApplySuccessScreen } from './ApplySuccessScreen';
import { getDialPrefix } from './PhoneCountrySelect';
import { travelerDateParts } from './TravelerInfoCard';
import { applyBtnPrevious, applyBtnPrimary } from './applyStyles';
import { ApplicationData, PlanId, TravelerData, TravelDetails } from '../../types';
import { useLanguage } from '../../context/LanguageContext';
import { saveApplication } from '../../services/applicationStore';
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
  const a = t.apply;
  const plans = t.pricing.plans;

  const [step, setStep] = useState(0);
  const [submittedId, setSubmittedId] = useState<string | null>(null);
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
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [step]);

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
    const travelers = [...data.travelers];
    travelers[index] = { ...travelers[index], [field]: value };
    setData({ ...data, travelers });
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
      const plan = plans.find((p) => p.id === synced.plan)!;
      const amount = (plan.price + plan.priorityFee) * synced.travelers.length;
      if (destination && service) {
        void saveApplication({
          lang,
          destinationSlug: destination.slug,
          destinationName: destination.name[lang],
          serviceSlug: service.slug,
          serviceName: service.shortName[lang],
          planId: synced.plan,
          planName: plan.name,
          totalAmount: amount,
          data: synced,
        }).then((record) => setSubmittedId(record.id));
      }
      onSubmitted?.(true);
      setStep(3);
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
            const next = [...dobParts];
            next[i] = parts;
            setDobParts(next);
            updateTraveler(i, 'dateOfBirth', datePartsToIso(parts));
          }}
          onIssueChange={(i, parts) => {
            const next = [...issueParts];
            next[i] = parts;
            setIssueParts(next);
            updateTraveler(i, 'passportIssueDate', datePartsToIso(parts));
          }}
          onExpiryChange={(i, parts) => {
            const next = [...expiryParts];
            next[i] = parts;
            setExpiryParts(next);
            updateTraveler(i, 'passportExpiryDate', datePartsToIso(parts));
          }}
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
          disabled={!canProceed()}
          className={applyBtnPrimary}
        >
          {step === 2 ? (
            <>
              {a.submit}
              <Plane className="size-5" />
            </>
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
