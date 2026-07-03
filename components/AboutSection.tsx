import React from 'react';
import { Clock, Calendar, Plane, MapPin, Globe, QrCode } from 'lucide-react';
import { stats } from '../data/content';

const infoCards = [
  {
    icon: Clock,
    title: 'وقت المعالجة',
    value: 'فوري',
    description: 'تُنشأ بطاقتك ورمز QR مباشرة بعد الإرسال.',
  },
  {
    icon: Calendar,
    title: 'الصلاحية',
    value: 'حتى الوصول',
    description: 'صالحة حتى تاريخ الوصول المحدد في البطاقة.',
  },
  {
    icon: Plane,
    title: 'مدة الإقامة',
    value: 'حسب التأشيرة',
    description: 'تُحدد حسب حالة التأشيرة وقرار ضابط الهجرة.',
  },
  {
    icon: Globe,
    title: 'الدخول',
    value: 'دخول واحد',
    description: 'لمرة واحدة — قدّم طلباً جديداً لكل دخول.',
  },
  {
    icon: MapPin,
    title: 'كيفية التقديم',
    value: '100% عبر الإنترنت',
    description: 'من أي جهاز قبل رحلتك إلى تايلاند.',
  },
  {
    icon: QrCode,
    title: 'عند الوصول',
    value: 'اعرض رمز QR',
    description: 'من هاتفك أو البريد الإلكتروني. الطباعة اختيارية كنسخة احتياطية.',
  },
];

export const AboutSection: React.FC = () => {
  return (
    <section id="how-to-apply" className="py-16 lg:py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-extrabold text-slate-900 mb-4">
            عن بطاقة الوصول الرقمية TDAC
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            نظرة سريعة على بطاقة الوصول الرقمية التايلاندية — متطلب إلزامي لدخول تايلاند بدون تأشيرة.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {infoCards.map((card) => (
            <div
              key={card.title}
              className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="w-12 h-12 bg-brand-50 rounded-xl flex items-center justify-center mb-4">
                <card.icon className="w-6 h-6 text-brand-600" />
              </div>
              <p className="text-xs font-bold text-brand-600 uppercase tracking-wider mb-1">{card.title}</p>
              <p className="text-xl font-bold text-slate-900 mb-2">{card.value}</p>
              <p className="text-sm text-slate-600 leading-relaxed">{card.description}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="bg-white rounded-2xl p-6 text-center border border-slate-100 shadow-sm"
            >
              <p className="text-3xl lg:text-4xl font-extrabold text-brand-600 mb-1">{stat.value}</p>
              <p className="text-sm text-slate-600 font-medium">{stat.label}</p>
            </div>
          ))}
        </div>
        <p className="text-center text-xs text-slate-400 mt-4">
          *تعتمد الموافقة على الجهة المختصة ودقة المعلومات المقدمة.
        </p>
      </div>
    </section>
  );
};
