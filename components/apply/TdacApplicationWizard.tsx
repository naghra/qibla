import React, { useEffect, useState } from 'react';
import { CheckCircle, ChevronLeft, ChevronRight, Plane } from 'lucide-react';
import { ApplyStepper } from './ApplyStepper';
import { TripDetailsStep } from './TripDetailsStep';
import { YourInfoStep } from './YourInfoStep';
import { ResumeStep } from './ResumeStep';
import { travelerDateParts } from './TravelerInfoCard';
import { getDialPrefix } from './PhoneCountrySelect';
import { ApplicationData, PlanId, TravelerData, TravelDetails } from '../../types';
import { useLanguage } from '../../context/LanguageContext';
import { saveApplication } from '../../services/applicationStore';
import { computeEstimatedProcessing } from '../../utils/estimatedProcessing';
import {
  DateParts,
  datePartsToIso,
  defaultDateParts,
} from '../../utils/dateParts';

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

function initDateParts(travelers: TravelerData[], field: 'dateOfBirth' | 'passportIssueDate' | 'passportExpiryDate'): DateParts[] {
  return travelers.map((t) => travelerDateParts(t, field));
}

interface TdacApplicationWizardProps {
  initialPlan?: PlanId;
  onComplete?: () => void;
}

export const TdacApplicationWizard: React.FC<TdacApplicationWizardProps> = ({
  initialPlan = 'standard',
  onComplete,
}) => {
  const { t, lang, dir, destination, service } = useLanguage();
  const a = t.apply;
  const plans = t.pricing.plans;

  const [step, setStep] = useState(0);
  const [submittedId, setSubmittedId] = useState<string | null>(null);
  const [arrival, setArrival] = useState<DateParts>(() => defaultDateParts(7));
  const [departure, setDeparture] = useState<DateParts>(() => defaultDateParts(14));
  const [email, setEmail] = useState('');
  const [phoneCountry, setPhoneCountry] = useState(lang === 'ar' ? 'EG' : 'FR');
  const [phone, setPhone] = useState('');

  const [data, setData] = useState<ApplicationData>(() => ({
    travelers: [emptyTraveler(lang)],
    travel: { ...emptyTravel },
    plan: initialPlan,
  }));

  const [dobParts, setDobParts] = useState<DateParts[]>(() => initDateParts([emptyTraveler(lang)], 'dateOfBirth'));
  const [issueParts, setIssueParts] = useState<DateParts[]>(() => initDateParts([emptyTraveler(lang)], 'passportIssueDate'));
  const [expiryParts, setExpiryParts] = useState<DateParts[]>(() => initDateParts([emptyTraveler(lang)], 'passportExpiryDate'));

  const selectedPlan = plans.find((p) => p.id === data.plan)!;
  const total = (selectedPlan.price + selectedPlan.priorityFee) * data.travelers.length;
  const estimatedAt = computeEstimatedProcessing(data.plan, lang);
  const destinationLabel = destination?.name[lang] ?? (lang === 'ar' ? 'تايلاند' : 'Thailand');

  useEffect(() => {
    if (step === 2 && data.plan === 'standard') {
      setData((d) => ({ ...d, plan: 'fast' }));
    }
  }, [step, data.plan]);

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
    const next = emptyTraveler(lang);
    setData({ ...data, travelers: [...data.travelers, next] });
    setDobParts((p) => [...p, travelerDateParts(next, 'dateOfBirth')]);
    setIssueParts((p) => [...p, travelerDateParts(next, 'passportIssueDate')]);
    setExpiryParts((p) => [...p, travelerDateParts(next, 'passportExpiryDate')]);
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
        (tr) =>
          tr.firstName.trim() &&
          tr.lastName.trim() &&
          tr.gender &&
          tr.passportCountry &&
          tr.nationality &&
          tr.passportNumber.trim() &&
          tr.dateOfBirth &&
          tr.passportIssueDate &&
          tr.passportExpiryDate
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
        const record = saveApplication({
          lang,
          destinationSlug: destination.slug,
          destinationName: destination.name[lang],
          serviceSlug: service.slug,
          serviceName: service.shortName[lang],
          planId: synced.plan,
          planName: plan.name,
          totalAmount: amount,
          data: synced,
        });
        setSubmittedId(record.id);
      }
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
    setStep(0);
    setSubmittedId(null);
    setEmail('');
    setPhone('');
    setArrival(defaultDateParts(7));
    setDeparture(defaultDateParts(14));
    const fresh = emptyTraveler(lang);
    setData({ travelers: [fresh], travel: { ...emptyTravel }, plan: initialPlan });
    setDobParts(initDateParts([fresh], 'dateOfBirth'));
    setIssueParts(initDateParts([fresh], 'passportIssueDate'));
    setExpiryParts(initDateParts([fresh], 'passportExpiryDate'));
    onComplete?.();
  };

  const formSteps = a.formSteps;
  const primaryBtnClass =
    step === 0
      ? 'bg-gray-900 hover:bg-gray-800'
      : 'bg-blue-600 hover:bg-blue-700';

  if (step === 3) {
    return (
      <div className="fade-in py-10 text-center">
        <div className="mx-auto mb-6 flex size-20 items-center justify-center rounded-full bg-green-100">
          <CheckCircle className="size-10 text-green-600" />
        </div>
        <h3 className="mb-3 text-2xl font-bold text-gray-900">{a.successTitle}</h3>
        {submittedId && (
          <p className="mb-4 rounded-lg bg-gray-50 px-4 py-2 font-mono text-sm text-gray-700" dir="ltr">
            {lang === 'en' ? 'Reference' : 'رقم الطلب'}: {submittedId}
          </p>
        )}
        <p className="mb-2 text-gray-600">{a.successThanks(data.travelers[0]?.firstName ?? '')}</p>
        <p className="mb-6 font-bold text-blue-600" dir="ltr">{email}</p>
        <button
          type="button"
          onClick={handleDone}
          className="w-full rounded-lg bg-gray-900 py-3.5 text-sm font-bold text-white hover:bg-gray-800"
        >
          {a.backToHome}
        </button>
      </div>
    );
  }

  return (
    <div>
      <ApplyStepper steps={formSteps} current={step} />

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

      <div className="mt-8 space-y-3">
        <button
          type="button"
          onClick={handleContinue}
          disabled={!canProceed()}
          className={`flex w-full items-center justify-center gap-2 rounded-lg py-3.5 text-sm font-bold text-white transition disabled:cursor-not-allowed disabled:opacity-40 ${primaryBtnClass}`}
        >
          {step === 2 ? (
            <>
              {a.submit}
              <Plane className="size-4" />
            </>
          ) : (
            <>
              {a.saveAndContinue}
              <NextChevron className="size-4" />
            </>
          )}
        </button>
        {step > 0 && (
          <button
            type="button"
            onClick={handleBack}
            className="flex w-full items-center justify-center gap-1 py-2 text-sm font-medium text-gray-600 hover:text-gray-900"
          >
            <PrevChevron className="size-4" />
            {a.previousStep}
          </button>
        )}
      </div>
    </div>
  );
};
