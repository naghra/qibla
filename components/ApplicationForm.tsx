import React, { useState } from 'react';
import { X, ArrowRight, ArrowLeft, CheckCircle, User, Plane, Home, CreditCard, Plus, Trash2 } from 'lucide-react';
import { pricingPlans, countries } from '../data/content';
import { ApplicationData, PlanId, TravelerData, TravelDetails } from '../types';

interface ApplicationFormProps {
  isOpen: boolean;
  onClose: () => void;
  initialPlan?: PlanId;
}

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

const stepLabels = ['المسافرون', 'تفاصيل السفر', 'المراجعة والدفع', 'تم الإرسال'];

export const ApplicationForm: React.FC<ApplicationFormProps> = ({ isOpen, onClose, initialPlan = 'standard' }) => {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<ApplicationData>({
    travelers: [emptyTraveler()],
    travel: { ...emptyTravel },
    plan: initialPlan,
  });

  if (!isOpen) return null;

  const selectedPlan = pricingPlans.find((p) => p.id === data.plan)!;
  const totalPerTraveler = selectedPlan.price + selectedPlan.priorityFee;
  const total = totalPerTraveler * data.travelers.length;

  const updateTraveler = (index: number, field: keyof TravelerData, value: string) => {
    const travelers = [...data.travelers];
    travelers[index] = { ...travelers[index], [field]: value };
    setData({ ...data, travelers });
  };

  const addTraveler = () => {
    setData({ ...data, travelers: [...data.travelers, emptyTraveler()] });
  };

  const removeTraveler = (index: number) => {
    if (data.travelers.length <= 1) return;
    setData({ ...data, travelers: data.travelers.filter((_, i) => i !== index) });
  };

  const canProceed = () => {
    if (step === 0) {
      return data.travelers.every(
        (t) => t.firstName && t.lastName && t.passportNumber && t.nationality && t.email
      );
    }
    if (step === 1) {
      return data.travel.arrivalDate && data.travel.flightNumber && data.travel.accommodationAddress;
    }
    return true;
  };

  const handleSubmit = () => {
    setStep(3);
  };

  const handleClose = () => {
    setStep(0);
    setData({ travelers: [emptyTraveler()], travel: { ...emptyTravel }, plan: initialPlan });
    onClose();
  };

  const inputClass =
    'w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20';

  return (
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center">
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={handleClose} />

      <div className="relative w-full sm:max-w-2xl max-h-[95vh] overflow-hidden flex flex-col bg-white shadow-2xl fade-in sm:rounded-4xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-100 p-5">
          <div>
            <h2 className="text-xl font-bold text-gray-900">طلب بطاقة TDAC</h2>
            {step < 3 && (
              <p className="mt-0.5 text-sm text-gray-500">
                الخطوة {step + 1} من 3 — {stepLabels[step]}
              </p>
            )}
          </div>
          <button onClick={handleClose} className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Progress */}
        {step < 3 && (
          <div className="px-5 pt-4">
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

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6">
          {step === 0 && (
            <div className="space-y-6">
              {data.travelers.map((traveler, index) => (
                <div key={index} className="rounded-4xl border border-gray-100 bg-gradient-to-tl from-white to-blue-100/30 p-5">
                  <div className="mb-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <User className="size-5 text-blue-500" />
                      <h3 className="font-bold text-gray-900">
                        مسافر {index + 1}
                        {index === 0 && <span className="mr-2 text-xs text-blue-500">(رئيسي)</span>}
                      </h3>
                    </div>
                    {index > 0 && (
                      <button
                        onClick={() => removeTraveler(index)}
                        className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-500 mb-1.5">الاسم الأول *</label>
                      <input
                        className={inputClass}
                        value={traveler.firstName}
                        onChange={(e) => updateTraveler(index, 'firstName', e.target.value)}
                        placeholder="أحمد"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-500 mb-1.5">اسم العائلة *</label>
                      <input
                        className={inputClass}
                        value={traveler.lastName}
                        onChange={(e) => updateTraveler(index, 'lastName', e.target.value)}
                        placeholder="محمد"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-500 mb-1.5">رقم جواز السفر *</label>
                      <input
                        className={inputClass}
                        value={traveler.passportNumber}
                        onChange={(e) => updateTraveler(index, 'passportNumber', e.target.value)}
                        placeholder="A12345678"
                        dir="ltr"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-500 mb-1.5">الجنسية *</label>
                      <select
                        className={inputClass}
                        value={traveler.nationality}
                        onChange={(e) => updateTraveler(index, 'nationality', e.target.value)}
                      >
                        <option value="">اختر الجنسية</option>
                        {countries.map((c) => (
                          <option key={c} value={c}>{c}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-500 mb-1.5">تاريخ الميلاد</label>
                      <input
                        type="date"
                        className={inputClass}
                        value={traveler.dateOfBirth}
                        onChange={(e) => updateTraveler(index, 'dateOfBirth', e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-500 mb-1.5">الجنس</label>
                      <select
                        className={inputClass}
                        value={traveler.gender}
                        onChange={(e) => updateTraveler(index, 'gender', e.target.value)}
                      >
                        <option value="">اختر</option>
                        <option value="male">ذكر</option>
                        <option value="female">أنثى</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-500 mb-1.5">البريد الإلكتروني *</label>
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
                      <label className="block text-xs font-bold text-gray-500 mb-1.5">رقم الهاتف</label>
                      <input
                        type="tel"
                        className={inputClass}
                        value={traveler.phone}
                        onChange={(e) => updateTraveler(index, 'phone', e.target.value)}
                        placeholder="+966..."
                        dir="ltr"
                      />
                    </div>
                  </div>
                </div>
              ))}

              <button
                onClick={addTraveler}
                className="flex w-full items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-gray-200 py-3 text-sm font-bold text-gray-600 transition-colors hover:border-blue-300 hover:text-blue-600"
              >
                <Plus className="w-4 h-4" />
                إضافة مسافر
              </button>
            </div>
          )}

          {step === 1 && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-2">
                <Plane className="size-5 text-blue-500" />
                <h3 className="font-bold text-gray-900">تفاصيل الرحلة</h3>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-500 mb-1.5">تاريخ الوصول *</label>
                  <input
                    type="date"
                    className={inputClass}
                    value={data.travel.arrivalDate}
                    onChange={(e) => setData({ ...data, travel: { ...data.travel, arrivalDate: e.target.value } })}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 mb-1.5">تاريخ المغادرة</label>
                  <input
                    type="date"
                    className={inputClass}
                    value={data.travel.departureDate}
                    onChange={(e) => setData({ ...data, travel: { ...data.travel, departureDate: e.target.value } })}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 mb-1.5">رقم رحلة الوصول *</label>
                  <input
                    className={inputClass}
                    value={data.travel.flightNumber}
                    onChange={(e) => setData({ ...data, travel: { ...data.travel, flightNumber: e.target.value } })}
                    placeholder="TG123"
                    dir="ltr"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 mb-1.5">غرض الزيارة</label>
                  <select
                    className={inputClass}
                    value={data.travel.purposeOfVisit}
                    onChange={(e) => setData({ ...data, travel: { ...data.travel, purposeOfVisit: e.target.value } })}
                  >
                    <option value="">اختر الغرض</option>
                    <option value="tourism">سياحة</option>
                    <option value="business">أعمال</option>
                    <option value="transit">عبور</option>
                    <option value="other">أخرى</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center gap-2 mt-6 mb-2">
                <Home className="size-5 text-blue-500" />
                <h3 className="font-bold text-gray-900">الإقامة في تايلاند</h3>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-gray-500 mb-1.5">عنوان الإقامة *</label>
                  <input
                    className={inputClass}
                    value={data.travel.accommodationAddress}
                    onChange={(e) => setData({ ...data, travel: { ...data.travel, accommodationAddress: e.target.value } })}
                    placeholder="اسم الفندق أو العنوان الكامل"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 mb-1.5">المدينة</label>
                  <input
                    className={inputClass}
                    value={data.travel.accommodationCity}
                    onChange={(e) => setData({ ...data, travel: { ...data.travel, accommodationCity: e.target.value } })}
                    placeholder="بانكوك"
                  />
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div>
                <h3 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
                  <CreditCard className="size-5 text-blue-500" />
                  اختر خطة المعالجة
                </h3>
                <div className="space-y-3">
                  {pricingPlans.map((plan) => (
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
                      <p className="font-bold text-blue-500">
                        ${plan.price + plan.priorityFee}
                      </p>
                    </label>
                  ))}
                </div>
              </div>

              <div className="space-y-3 rounded-4xl bg-gradient-to-tl from-white to-blue-100/30 p-5">
                <h4 className="font-bold text-gray-900">ملخص الطلب</h4>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">عدد المسافرين</span>
                  <span className="font-medium">{data.travelers.length}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">الخطة</span>
                  <span className="font-medium">{selectedPlan.name}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">رسوم لكل مسافر</span>
                  <span className="font-medium">${totalPerTraveler}</span>
                </div>
                <div className="flex justify-between border-t border-gray-200 pt-3 font-bold text-gray-900">
                  <span>الإجمالي</span>
                  <span className="text-lg text-blue-500">${total}</span>
                </div>
              </div>

              <p className="text-center text-xs text-gray-400">
                بالمتابعة، أنت توافق على شروط الخدمة. هذا نموذج تجريبي — لن تتم معالجة دفع حقيقي.
              </p>
            </div>
          )}

          {step === 3 && (
            <div className="text-center py-8 fade-in">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-10 h-10 text-green-600" />
              </div>
              <h3 className="mb-3 text-2xl font-bold text-gray-900">تم إرسال طلبك بنجاح!</h3>
              <p className="mb-2 text-gray-600">
                شكراً {data.travelers[0].firstName}! سنراجع طلبك ونرسل بطاقة TDAC إلى:
              </p>
              <p className="mb-6 font-bold text-blue-500" dir="ltr">{data.travelers[0].email}</p>
              <p className="text-sm text-gray-500">
                وقت المعالجة المتوقع: <strong>{selectedPlan.time}</strong>
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        {step < 3 && (
          <div className="flex gap-3 border-t border-gray-100 p-5">
            {step > 0 && (
              <button
                onClick={() => setStep(step - 1)}
                className="flex items-center gap-2 rounded-2xl border border-gray-200 px-5 py-3 font-bold text-gray-700 transition-colors hover:bg-gray-50"
              >
                <ArrowRight className="size-4" />
                السابق
              </button>
            )}
            <button
              onClick={() => (step === 2 ? handleSubmit() : setStep(step + 1))}
              disabled={!canProceed()}
              className="flex flex-1 items-center justify-center gap-2 rounded-2xl border border-blue-600 bg-blue-500 px-5 py-3 font-bold text-white transition active:scale-95 hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {step === 2 ? 'إرسال الطلب' : 'التالي'}
              <ArrowLeft className="size-4" />
            </button>
          </div>
        )}

        {step === 3 && (
          <div className="border-t border-gray-100 p-5">
            <button
              onClick={handleClose}
              className="w-full rounded-2xl border border-blue-600 bg-blue-500 py-3 font-bold text-white transition hover:bg-blue-600"
            >
              إغلاق
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
