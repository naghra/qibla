import React, { useState } from 'react';
import { ArrowRight, ArrowLeft, CheckCircle, User, Plane, Home, CreditCard, Plus, Trash2 } from 'lucide-react';
import { countriesData } from '../data/countries';
import { ApplicationData, PlanId, TravelerData, TravelDetails } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { getCountryName } from '../utils/countryName';
import { saveApplication } from '../services/applicationStore';

const emptyTraveler = (): TravelerData => ({
  firstName: '',
  lastName: '',
  passportNumber: '',
  nationality: '',
  dateOfBirth: '',
  gender: '',
  email: '',
  phone: '',
});

const emptyTravel: TravelDetails = {
  arrivalDate: '',
  departureDate: '',
  flightNumber: '',
  purposeOfVisit: '',
  accommodationAddress: '',
  accommodationCity: '',
};

interface ApplicationWizardProps {
  initialPlan?: PlanId;
  onComplete?: () => void;
  variant?: 'page' | 'modal';
}

export const ApplicationWizard: React.FC<ApplicationWizardProps> = ({
  initialPlan = 'standard',
  onComplete,
  variant = 'page',
}) => {
  const { t, lang, dir, destination, service } = useLanguage();
  const a = t.apply;
  const plans = t.pricing.plans;

  const [step, setStep] = useState(0);
  const [submittedId, setSubmittedId] = useState<string | null>(null);
  const [data, setData] = useState<ApplicationData>({
    travelers: [emptyTraveler()],
    travel: { ...emptyTravel },
    plan: initialPlan,
  });

  const selectedPlan = plans.find((p) => p.id === data.plan)!;
  const totalPerTraveler = selectedPlan.price + selectedPlan.priorityFee;
  const total = totalPerTraveler * data.travelers.length;

  const PrevIcon = dir === 'rtl' ? ArrowRight : ArrowLeft;
  const NextIcon = dir === 'rtl' ? ArrowLeft : ArrowRight;

  const updateTraveler = (index: number, field: keyof TravelerData, value: string) => {
    const travelers = [...data.travelers];
    travelers[index] = { ...travelers[index], [field]: value };
    setData({ ...data, travelers });
  };

  const addTraveler = () => setData({ ...data, travelers: [...data.travelers, emptyTraveler()] });

  const removeTraveler = (index: number) => {
    if (data.travelers.length <= 1) return;
    setData({ ...data, travelers: data.travelers.filter((_, i) => i !== index) });
  };

  const canProceed = () => {
    if (step === 0) {
      return data.travelers.every(
        (tr) => tr.firstName && tr.lastName && tr.passportNumber && tr.nationality && tr.email
      );
    }
    if (step === 1) {
      return data.travel.arrivalDate && data.travel.flightNumber && data.travel.accommodationAddress;
    }
    return true;
  };

  const handleSubmit = () => {
    if (destination && service) {
      void saveApplication({
        lang,
        destinationSlug: destination.slug,
        destinationName: destination.name[lang],
        serviceSlug: service.slug,
        serviceName: service.shortName[lang],
        planId: data.plan,
        planName: selectedPlan.name,
        totalAmount: total,
        data,
      }).then((record) => setSubmittedId(record.id));
    }
    setStep(3);
  };

  const handleDone = () => {
    setStep(0);
    setSubmittedId(null);
    setData({ travelers: [emptyTraveler()], travel: { ...emptyTravel }, plan: initialPlan });
    onComplete?.();
  };

  const inputClass =
    'w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20';

  const sortedCountries = [...countriesData].sort((x, y) =>
    getCountryName(x, lang).localeCompare(getCountryName(y, lang), lang === 'ar' ? 'ar' : 'en')
  );

  return (
    <div className={variant === 'modal' ? 'flex max-h-[70vh] flex-col' : ''}>
      {step < 3 && (
        <div className={variant === 'page' ? 'mb-6' : 'px-1 pb-4'}>
          <p className="mb-3 text-sm text-gray-500">
            {a.stepOf(step + 1, 3, a.steps[step])}
          </p>
          <div className="flex gap-2">
            {[0, 1, 2].map((s) => (
              <div
                key={s}
                className={`h-1.5 flex-1 rounded-full transition-colors ${
                  s <= step ? 'bg-blue-500' : 'bg-gray-200'
                }`}
              />
            ))}
          </div>
        </div>
      )}

      <div className={variant === 'modal' ? 'flex-1 overflow-y-auto' : ''}>
        {step === 0 && (
          <div className="space-y-6">
            {data.travelers.map((traveler, index) => (
              <div
                key={index}
                className="rounded-4xl border border-gray-100 bg-gradient-to-tl from-white to-blue-100/30 p-5"
              >
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <User className="size-5 text-blue-500" />
                    <h3 className="font-bold text-gray-900">
                      {a.traveler(index + 1)}
                      {index === 0 && <span className="ms-2 text-xs text-blue-500">{a.primary}</span>}
                    </h3>
                  </div>
                  {index > 0 && (
                    <button
                      onClick={() => removeTraveler(index)}
                      className="rounded-lg p-1.5 text-red-500 hover:bg-red-50"
                    >
                      <Trash2 className="size-4" />
                    </button>
                  )}
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-xs font-bold text-gray-500">{a.firstName}</label>
                    <input
                      className={inputClass}
                      value={traveler.firstName}
                      onChange={(e) => updateTraveler(index, 'firstName', e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs font-bold text-gray-500">{a.lastName}</label>
                    <input
                      className={inputClass}
                      value={traveler.lastName}
                      onChange={(e) => updateTraveler(index, 'lastName', e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs font-bold text-gray-500">{a.passport}</label>
                    <input
                      className={inputClass}
                      value={traveler.passportNumber}
                      onChange={(e) => updateTraveler(index, 'passportNumber', e.target.value)}
                      placeholder="A12345678"
                      dir="ltr"
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs font-bold text-gray-500">{a.nationality}</label>
                    <select
                      className={inputClass}
                      value={traveler.nationality}
                      onChange={(e) => updateTraveler(index, 'nationality', e.target.value)}
                    >
                      <option value="">{a.selectNationality}</option>
                      {sortedCountries.map((c) => (
                        <option key={c.code} value={c.code}>
                          {getCountryName(c, lang)}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs font-bold text-gray-500">{a.dateOfBirth}</label>
                    <input
                      type="date"
                      className={inputClass}
                      value={traveler.dateOfBirth}
                      onChange={(e) => updateTraveler(index, 'dateOfBirth', e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs font-bold text-gray-500">{a.gender}</label>
                    <select
                      className={inputClass}
                      value={traveler.gender}
                      onChange={(e) => updateTraveler(index, 'gender', e.target.value)}
                    >
                      <option value="">{a.selectGender}</option>
                      <option value="male">{a.male}</option>
                      <option value="female">{a.female}</option>
                    </select>
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs font-bold text-gray-500">{a.email}</label>
                    <input
                      type="email"
                      className={inputClass}
                      value={traveler.email}
                      onChange={(e) => updateTraveler(index, 'email', e.target.value)}
                      placeholder="email@example.com"
                      dir="ltr"
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs font-bold text-gray-500">{a.phone}</label>
                    <input
                      type="tel"
                      className={inputClass}
                      value={traveler.phone}
                      onChange={(e) => updateTraveler(index, 'phone', e.target.value)}
                      placeholder="+1..."
                      dir="ltr"
                    />
                  </div>
                </div>
              </div>
            ))}
            <button
              onClick={addTraveler}
              className="flex w-full items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-gray-200 py-3 text-sm font-bold text-gray-600 hover:border-blue-300 hover:text-blue-600"
            >
              <Plus className="size-4" />
              {a.addTraveler}
            </button>
          </div>
        )}

        {step === 1 && (
          <div className="space-y-4">
            <div className="mb-2 flex items-center gap-2">
              <Plane className="size-5 text-blue-500" />
              <h3 className="font-bold text-gray-900">{a.travelDetails}</h3>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-xs font-bold text-gray-500">{a.arrivalDate}</label>
                <input
                  type="date"
                  className={inputClass}
                  value={data.travel.arrivalDate}
                  onChange={(e) => setData({ ...data, travel: { ...data.travel, arrivalDate: e.target.value } })}
                />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-bold text-gray-500">{a.departureDate}</label>
                <input
                  type="date"
                  className={inputClass}
                  value={data.travel.departureDate}
                  onChange={(e) => setData({ ...data, travel: { ...data.travel, departureDate: e.target.value } })}
                />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-bold text-gray-500">{a.flightNumber}</label>
                <input
                  className={inputClass}
                  value={data.travel.flightNumber}
                  onChange={(e) => setData({ ...data, travel: { ...data.travel, flightNumber: e.target.value } })}
                  placeholder="TG123"
                  dir="ltr"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-bold text-gray-500">{a.purpose}</label>
                <select
                  className={inputClass}
                  value={data.travel.purposeOfVisit}
                  onChange={(e) => setData({ ...data, travel: { ...data.travel, purposeOfVisit: e.target.value } })}
                >
                  <option value="">{a.selectPurpose}</option>
                  <option value="tourism">{a.tourism}</option>
                  <option value="business">{a.business}</option>
                  <option value="transit">{a.transit}</option>
                  <option value="other">{a.other}</option>
                </select>
              </div>
            </div>
            <div className="mb-2 mt-6 flex items-center gap-2">
              <Home className="size-5 text-blue-500" />
              <h3 className="font-bold text-gray-900">{a.accommodation}</h3>
            </div>
            <div className="space-y-4">
              <div>
                <label className="mb-1.5 block text-xs font-bold text-gray-500">{a.address}</label>
                <input
                  className={inputClass}
                  value={data.travel.accommodationAddress}
                  onChange={(e) =>
                    setData({ ...data, travel: { ...data.travel, accommodationAddress: e.target.value } })
                  }
                />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-bold text-gray-500">{a.city}</label>
                <input
                  className={inputClass}
                  value={data.travel.accommodationCity}
                  onChange={(e) =>
                    setData({ ...data, travel: { ...data.travel, accommodationCity: e.target.value } })
                  }
                  placeholder={lang === 'ar' ? 'بانكوك' : 'Bangkok'}
                />
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <div>
              <h3 className="mb-3 flex items-center gap-2 font-bold text-gray-900">
                <CreditCard className="size-5 text-blue-500" />
                {a.selectPlan}
              </h3>
              <div className="space-y-3">
                {plans.map((plan) => (
                  <label
                    key={plan.id}
                    className={`flex cursor-pointer items-center justify-between rounded-2xl border-2 p-4 transition-all ${
                      data.plan === plan.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-100 hover:border-gray-200'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="plan"
                        checked={data.plan === plan.id}
                        onChange={() => setData({ ...data, plan: plan.id as PlanId })}
                        className="size-4 text-blue-500"
                      />
                      <div>
                        <p className="font-bold text-gray-900">{plan.name}</p>
                        <p className="text-xs text-gray-500">{plan.time}</p>
                      </div>
                    </div>
                    <p className="font-bold text-blue-500">${plan.price + plan.priorityFee}</p>
                  </label>
                ))}
              </div>
            </div>
            <div className="space-y-3 rounded-4xl bg-gradient-to-tl from-white to-blue-100/30 p-5">
              <h4 className="font-bold text-gray-900">{a.orderSummary}</h4>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">{a.travelersCount}</span>
                <span className="font-medium">{data.travelers.length}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">{a.plan}</span>
                <span className="font-medium">{selectedPlan.name}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">{a.feePerTraveler}</span>
                <span className="font-medium">${totalPerTraveler}</span>
              </div>
              <div className="flex justify-between border-t border-gray-200 pt-3 font-bold text-gray-900">
                <span>{a.total}</span>
                <span className="text-lg text-blue-500">${total}</span>
              </div>
            </div>
            <p className="text-center text-xs text-gray-400">{a.termsNote}</p>
          </div>
        )}

        {step === 3 && (
          <div className="fade-in py-8 text-center">
            <div className="mx-auto mb-6 flex size-20 items-center justify-center rounded-full bg-green-100">
              <CheckCircle className="size-10 text-green-600" />
            </div>
            <h3 className="mb-3 text-2xl font-bold text-gray-900">{a.successTitle}</h3>
            {submittedId && (
              <p className="mb-4 rounded-xl bg-gray-50 px-4 py-2 font-mono text-sm text-gray-700" dir="ltr">
                {lang === 'en' ? 'Reference' : 'رقم الطلب'}: {submittedId}
              </p>
            )}
            <p className="mb-2 text-gray-600">{a.successThanks(data.travelers[0].firstName)}</p>
            <p className="mb-6 font-bold text-blue-500" dir="ltr">{data.travelers[0].email}</p>
            <p className="text-sm text-gray-500">
              {a.expectedTime} <strong>{selectedPlan.time}</strong>
            </p>
          </div>
        )}
      </div>

      <div className={`flex gap-3 ${variant === 'page' ? 'mt-8' : 'mt-4 border-t border-gray-100 pt-4'}`}>
        {step > 0 && step < 3 && (
          <button
            onClick={() => setStep(step - 1)}
            className="flex items-center gap-2 rounded-2xl border border-gray-200 px-5 py-3 font-bold text-gray-700 hover:bg-gray-50"
          >
            <PrevIcon className="size-4" />
            {a.prev}
          </button>
        )}
        {step < 3 ? (
          <button
            onClick={() => (step === 2 ? handleSubmit() : setStep(step + 1))}
            disabled={!canProceed()}
            className="flex flex-1 items-center justify-center gap-2 rounded-2xl border border-blue-600 bg-blue-500 px-5 py-3 font-bold text-white hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {step === 2 ? a.submit : a.next}
            <NextIcon className="size-4" />
          </button>
        ) : (
          <button
            onClick={handleDone}
            className="w-full rounded-2xl border border-blue-600 bg-blue-500 py-3 font-bold text-white hover:bg-blue-600"
          >
            {a.backToHome}
          </button>
        )}
      </div>
    </div>
  );
};
