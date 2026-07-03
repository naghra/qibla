import React from 'react';
import { ListChecks, Headphones, Shield, Users, CheckCircle, Star } from 'lucide-react';
import { features } from '../data/content';

const iconMap = {
  list: ListChecks,
  headphones: Headphones,
  shield: Shield,
  users: Users,
  check: CheckCircle,
};

interface FeaturesProps {
  onApply: () => void;
}

export const Features: React.FC<FeaturesProps> = ({ onApply }) => {
  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-brand-600 font-bold text-sm uppercase tracking-wider mb-2">لماذا يختارنا المسافرون</p>
          <h2 className="text-3xl lg:text-4xl font-extrabold text-slate-900 mb-4">
            الطريقة الذكية لتقديم بطاقة TDAC
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            نبسّط عملية التقديم بإرشاد خبير وتحقق فوري ودعم بشري — لتتفرغ لتخطيط رحلتك.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {features.map((feature) => {
            const Icon = iconMap[feature.icon as keyof typeof iconMap];
            return (
              <div
                key={feature.title}
                className="group p-6 rounded-2xl border border-slate-100 hover:border-brand-200 hover:shadow-lg hover:shadow-brand-500/5 transition-all"
              >
                <div className="w-12 h-12 bg-brand-50 group-hover:bg-brand-100 rounded-xl flex items-center justify-center mb-4 transition-colors">
                  <Icon className="w-6 h-6 text-brand-600" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{feature.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{feature.description}</p>
              </div>
            );
          })}
        </div>

        <div className="bg-gradient-to-br from-brand-600 to-brand-800 rounded-3xl p-8 lg:p-12 text-white text-center">
          <div className="flex items-center justify-center gap-1 mb-4">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 text-accent-400 fill-accent-400" />
            ))}
          </div>
          <p className="text-blue-100 mb-2">موثوق من مسافرين حول العالم</p>
          <h3 className="text-2xl lg:text-3xl font-extrabold mb-6">ابدأ طلبك الآن</h3>
          <button
            onClick={onApply}
            className="inline-flex items-center px-8 py-4 bg-accent-500 hover:bg-accent-400 text-slate-900 font-bold rounded-xl transition-all shadow-xl active:scale-95"
          >
            ابدأ التقديم
          </button>
          <p className="text-sm text-blue-200 mt-4">
            معدل موافقة يصل إلى 99.9% · دعم خبير 24/7 · استرداد جزئي قبل المعالجة
          </p>
        </div>
      </div>
    </section>
  );
};
