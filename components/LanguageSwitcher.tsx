import { useLanguage } from '../context/LanguageContext';

type Variant = 'dark' | 'light';

export default function LanguageSwitcher({
  className = '',
  variant = 'dark',
}: {
  className?: string;
  variant?: Variant;
}) {
  const { lang, setLang } = useLanguage();

  const shell =
    variant === 'dark'
      ? 'border-white/20 bg-white/10 backdrop-blur-sm'
      : 'border-gray-200 bg-gray-50';
  const active = variant === 'dark' ? 'bg-white text-[#162456]' : 'bg-blue-500 text-white';
  const inactive =
    variant === 'dark' ? 'text-white/80 hover:text-white' : 'text-gray-600 hover:text-gray-900';

  return (
    <div
      className={`inline-flex rounded-lg border p-0.5 text-xs font-bold ${shell} ${className}`}
      role="group"
      aria-label="Language"
    >
      <button
        type="button"
        onClick={() => setLang('ar')}
        className={`rounded-md px-2.5 py-1 transition-colors ${lang === 'ar' ? active : inactive}`}
      >
        AR
      </button>
      <button
        type="button"
        onClick={() => setLang('en')}
        className={`rounded-md px-2.5 py-1 transition-colors ${lang === 'en' ? active : inactive}`}
      >
        EN
      </button>
    </div>
  );
}
