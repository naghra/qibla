import React, { useState } from 'react';
import { CheckCircle } from 'lucide-react';
import { ApplyStepper } from './ApplyStepper';
import { TripDetailsStep } from './TripDetailsStep';
import { getDialPrefix } from './PhoneCountrySelect';
import { ApplicationData, PlanId, TravelerData, TravelDetails } from '../../types';
import { useLanguage } from '../../context/LanguageContext';
import { saveApplication } from '../../services/applicationStore';
import {
  DateParts,
  datePartsToIso,
  defaultDateParts,
} from '../../utils/dateParts';

const emptyTraveler = (): TravelerData => ({
  firstName: '',
  lastName: '',
  passportNumber: '',
  nationality: '',
  dateOfBirth: '',
  gender: '',
  email: '',
  phone: '',
  phoneCountry: 'FR',
});

const emptyTravel: TravelDetails = {
  arrivalDate: '',
  departureDate: '',
  flightNumber: '',
  purposeOfVisit: '',
  accommodationAddress: '',
  accommodationCity: '',
};

interface TdacApplicationWizardProps {
  initialPlan?: PlanId;
  onComplete?: () => void;
}

export const TdacApplicationWizard: React.FC<TdacApplicationWizardProps> = ({
  initialPlan = 'standard',
  onComplete,
}) => {
  const { t, lang, destination, service } = useLanguage();
  const a = t.apply;
  const plans = t.pricing.plans;

  const [step, setStep] = useState(0);
  const [submittedId, setSubmittedId] = useState<string | null>(null);
  const [arrival, setArrival] = useState<DateParts>(() => defaultDateParts(7));
  const [departure, setDeparture] = useState<DateParts>(() => defaultDateParts(14));
  const [email, setEmail] = useState('');
  const [phoneCountry, setPhoneCountry] = useState(lang === 'ar' ? 'EG' : 'FR');
  const [phone, setPhone] = useState('');

  const [data, setData] = useState<ApplicationData>({
    travelers: [emptyTraveler()],
    travel: { ...emptyTravel },
    plan: initialPlan,
  });

  const selectedPlan = plans.find((p) => p.id === data.plan)!;
  const total = (selectedPlan.price + selectedPlan.priorityFee) * data.travelers.length;

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
    return true;
  };

  const handleContinue = () => {
    const synced = syncTripToData();
    setData(synced);

    if (step === 2) {
      if (destination && service) {
        const record = saveApplication({
          lang,
          destinationSlug: destination.slug,
          destinationName: destination.name[lang],
          serviceSlug: service.slug,
          serviceName: service.shortName[lang],
          planId: synced.plan,
          planName: selectedPlan.name,
          totalAmount: total,
          data: synced,
        });
        setSubmittedId(record.id);
      }
      setStep(3);
      return;
    }

    setStep(step + 1);
  };

  const handleDone = () => {
    setStep(0);
    setSubmittedId(null);
    setEmail('');
    setPhone('');
    setArrival(defaultDateParts(7));
    setDeparture(defaultDateParts(14));
    setData({ travelers: [emptyTraveler()], travel: { ...emptyTravel }, plan: initialPlan });
    onComplete?.();
  };

  const formSteps = a.formSteps;

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
        <p className="mb-2 text-gray-600">{a.successThanks('')}</p>
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
        <div className="rounded-lg border border-dashed border-gray-200 bg-gray-50 px-4 py-12 text-center">
          <p className="text-sm font-medium text-gray-700">{a.stepPlaceholderTitle}</p>
          <p className="mt-2 text-xs text-gray-500">{a.stepPlaceholderSubtitle}</p>
        </div>
      )}

      {step === 2 && (
        <div className="rounded-lg border border-dashed border-gray-200 bg-gray-50 px-4 py-12 text-center">
          <p className="text-sm font-medium text-gray-700">{a.stepPlaceholderTitle}</p>
          <p className="mt-2 text-xs text-gray-500">{a.stepPlaceholderSubtitle}</p>
        </div>
      )}

      <div className="mt-8 space-y-3">
        <button
          type="button"
          onClick={handleContinue}
          disabled={!canProceed()}
          className="w-full rounded-lg bg-gray-900 py-3.5 text-sm font-bold text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-40"
        >
          {step === 2 ? a.submit : a.saveAndContinue}
        </button>
        {step > 0 && (
          <button
            type="button"
            onClick={() => setStep(step - 1)}
            className="w-full rounded-lg border border-gray-200 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            {a.prev}
          </button>
        )}
      </div>
    </div>
  );
};
