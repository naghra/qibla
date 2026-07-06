import type { Lang } from './i18n/types';

export interface ServiceDef {
  slug: string;
  name: Record<Lang, string>;
  shortName: Record<Lang, string>;
  description: Record<Lang, string>;
  priceFrom: number;
  /** Full detailed landing (glance, pricing tiers, countries list) */
  detailed: boolean;
}

export interface DestinationDef {
  slug: string;
  countryCode: string;
  name: Record<Lang, string>;
  priceFrom: number;
  services: ServiceDef[];
}

export const destinations: DestinationDef[] = [
  {
    slug: 'aruba',
    countryCode: 'AW',
    name: { en: 'Aruba', ar: 'أروبا' },
    priceFrom: 65,
    services: [{
      slug: 'ed-card',
      name: { en: 'ED Card', ar: 'بطاقة ED' },
      shortName: { en: 'Aruba ED Card', ar: 'بطاقة ED أروبا' },
      description: {
        en: 'Aruba ED Card — the visa-free online travel form required for all travelers entering Aruba. Apply online today.',
        ar: 'بطاقة ED أروبا — النموذج الإلكتروني المطلوب لجميع المسافرين إلى أروبا. قدّم عبر الإنترنت اليوم.',
      },
      priceFrom: 65,
      detailed: false,
    }],
  },
  {
    slug: 'barbados',
    countryCode: 'BB',
    name: { en: 'Barbados', ar: 'باربادوس' },
    priceFrom: 65,
    services: [{
      slug: 'ed-card',
      name: { en: 'ED Card', ar: 'بطاقة ED' },
      shortName: { en: 'Barbados ED Card', ar: 'بطاقة ED باربادوس' },
      description: {
        en: 'Barbados ED Card — the mandatory online immigration form for travelers entering Barbados.',
        ar: 'بطاقة ED باربادوس — نموذج الهجرة الإلكتروني الإلزامي للمسافرين إلى باربادوس.',
      },
      priceFrom: 65,
      detailed: false,
    }],
  },
  {
    slug: 'bermuda',
    countryCode: 'BM',
    name: { en: 'Bermuda', ar: 'برمودا' },
    priceFrom: 65,
    services: [{
      slug: 'arrival-card',
      name: { en: 'Arrival Card', ar: 'بطاقة الوصول' },
      shortName: { en: 'Bermuda Arrival Card', ar: 'بطاقة وصول برمودا' },
      description: {
        en: 'Bermuda Arrival Card — required online travel authorization for visitors to Bermuda.',
        ar: 'بطاقة وصول برمودا — تصريح سفر إلكتروني مطلوب لزوار برمودا.',
      },
      priceFrom: 65,
      detailed: false,
    }],
  },
  {
    slug: 'belize',
    countryCode: 'BZ',
    name: { en: 'Belize', ar: 'بيليز' },
    priceFrom: 40,
    services: [{
      slug: 'travel-form',
      name: { en: 'Travel Form', ar: 'نموذج السفر' },
      shortName: { en: 'Belize Travel Form', ar: 'نموذج سفر بيليز' },
      description: {
        en: 'Belize Travel Form — complete your mandatory online entry form before arrival.',
        ar: 'نموذج سفر بيليز — أكمل نموذج الدخول الإلكتروني الإلزامي قبل الوصول.',
      },
      priceFrom: 40,
      detailed: false,
    }],
  },
  {
    slug: 'colombia',
    countryCode: 'CO',
    name: { en: 'Colombia', ar: 'كولومبيا' },
    priceFrom: 65,
    services: [{
      slug: 'check-mig',
      name: { en: 'Check-MIG', ar: 'Check-MIG' },
      shortName: { en: 'Colombia Check-MIG', ar: 'Check-MIG كولومبيا' },
      description: {
        en: 'Colombia Check-MIG — mandatory pre-registration for all travelers entering Colombia.',
        ar: 'Check-MIG كولومبيا — التسجيل المسبق الإلزامي لجميع المسافرين إلى كولومبيا.',
      },
      priceFrom: 65,
      detailed: false,
    }],
  },
  {
    slug: 'curacao',
    countryCode: 'CW',
    name: { en: 'Curaçao', ar: 'كوراساو' },
    priceFrom: 65,
    services: [{
      slug: 'digital-inmigration-card',
      name: { en: 'Digital Inmigration Card', ar: 'بطاقة الهجرة الرقمية' },
      shortName: { en: 'Curaçao DI Card', ar: 'بطاقة DI كوراساو' },
      description: {
        en: 'Curaçao Digital Immigration Card — required online form for all incoming travelers.',
        ar: 'بطاقة الهجرة الرقمية لكوراساو — نموذج إلكتروني مطلوب لجميع المسافرين الوافدين.',
      },
      priceFrom: 65,
      detailed: false,
    }],
  },
  {
    slug: 'dominican-republic',
    countryCode: 'DO',
    name: { en: 'Dominican Republic', ar: 'جمهورية الدومينيكان' },
    priceFrom: 65,
    services: [{
      slug: 'eticket',
      name: { en: 'E-Ticket', ar: 'التذكرة الإلكترونية' },
      shortName: { en: 'Dominican E-Ticket', ar: 'E-Ticket الدومينيكان' },
      description: {
        en: 'Dominican Republic E-Ticket — mandatory electronic ticket for entry and exit.',
        ar: 'E-Ticket جمهورية الدومينيكان — التذكرة الإلكترونية الإلزامية للدخول والمغادرة.',
      },
      priceFrom: 65,
      detailed: false,
    }],
  },
  {
    slug: 'indonesia',
    countryCode: 'ID',
    name: { en: 'Indonesia', ar: 'إندونيسيا' },
    priceFrom: 65,
    services: [{
      slug: 'arrival-card',
      name: { en: 'Arrival Card', ar: 'بطاقة الوصول' },
      shortName: { en: 'Indonesia Arrival Card', ar: 'بطاقة وصول إندونيسيا' },
      description: {
        en: 'Indonesia Arrival Card — complete your online customs and immigration declaration.',
        ar: 'بطاقة وصول إندونيسيا — أكمل إقرار الجمارك والهجرة عبر الإنترنت.',
      },
      priceFrom: 65,
      detailed: false,
    }],
  },
  {
    slug: 'india',
    countryCode: 'IN',
    name: { en: 'India', ar: 'الهند' },
    priceFrom: 55,
    services: [{
      slug: 'arrival-card',
      name: { en: 'Arrival Card', ar: 'بطاقة الوصول' },
      shortName: { en: 'India Arrival Card', ar: 'بطاقة وصول الهند' },
      description: {
        en: 'India Arrival Card — mandatory online form for international travelers to India.',
        ar: 'بطاقة وصول الهند — نموذج إلكتروني إلزامي للمسافرين الدوليين إلى الهند.',
      },
      priceFrom: 55,
      detailed: false,
    }],
  },
  {
    slug: 'jamaica',
    countryCode: 'JM',
    name: { en: 'Jamaica', ar: 'جَمَيكَا' },
    priceFrom: 65,
    services: [{
      slug: 'c5-form',
      name: { en: 'C5 Form', ar: 'نموذج C5' },
      shortName: { en: 'Jamaica C5 Form', ar: 'نموذج C5 جَمَيكَا' },
      description: {
        en: 'Jamaica C5 Form — required customs declaration for all travelers entering Jamaica.',
        ar: 'نموذج C5 جَمَيكَا — إقرار الجمارك المطلوب لجميع المسافرين إلى جَمَيكَا.',
      },
      priceFrom: 65,
      detailed: false,
    }],
  },
  {
    slug: 'cambodia',
    countryCode: 'KH',
    name: { en: 'Cambodia', ar: 'كمبوديا' },
    priceFrom: 65,
    services: [{
      slug: 'e-visa',
      name: { en: 'E-Visa', ar: 'تأشيرة إلكترونية' },
      shortName: { en: 'Cambodia E-Visa', ar: 'تأشيرة كمبوديا الإلكترونية' },
      description: {
        en: 'Cambodia E-Visa — apply online for your tourist visa before traveling to Cambodia.',
        ar: 'تأشيرة كمبوديا الإلكترونية — قدّم طلب تأشيرة سياحية عبر الإنترنت قبل السفر.',
      },
      priceFrom: 65,
      detailed: false,
    }],
  },
  {
    slug: 'south-korea',
    countryCode: 'KR',
    name: { en: 'South Korea', ar: 'كوريا الجنوبية' },
    priceFrom: 55,
    services: [{
      slug: 'k-eta',
      name: { en: 'K-ETA', ar: 'K-ETA' },
      shortName: { en: 'South Korea K-ETA', ar: 'K-ETA كوريا الجنوبية' },
      description: {
        en: 'K-ETA — Korea Electronic Travel Authorization for visa-free travelers.',
        ar: 'K-ETA — تصريح السفر الإلكتروني لكوريا للمسافرين المعفيين من التأشيرة.',
      },
      priceFrom: 55,
      detailed: false,
    }],
  },
  {
    slug: 'maldives',
    countryCode: 'MV',
    name: { en: 'Maldives', ar: 'المالديف' },
    priceFrom: 65,
    services: [{
      slug: 'traveller-declaration',
      name: { en: 'Traveller Declaration', ar: 'إقرار المسافر' },
      shortName: { en: 'Maldives Traveller Declaration', ar: 'إقرار مسافر المالديف' },
      description: {
        en: 'Maldives Traveller Declaration — mandatory online health and immigration form.',
        ar: 'إقرار مسافر المالديف — نموذج صحة وهجرة إلكتروني إلزامي.',
      },
      priceFrom: 65,
      detailed: false,
    }],
  },
  {
    slug: 'malaysia',
    countryCode: 'MY',
    name: { en: 'Malaysia', ar: 'ماليزيا' },
    priceFrom: 65,
    services: [{
      slug: 'mdac',
      name: { en: 'MDAC', ar: 'MDAC' },
      shortName: { en: 'Malaysia MDAC', ar: 'MDAC ماليزيا' },
      description: {
        en: 'Malaysia Digital Arrival Card (MDAC) — mandatory for all foreign nationals entering Malaysia.',
        ar: 'بطاقة الوصول الرقمية الماليزية (MDAC) — إلزامية لجميع الأجانب الداخلين إلى ماليزيا.',
      },
      priceFrom: 65,
      detailed: false,
    }],
  },
  {
    slug: 'singapore',
    countryCode: 'SG',
    name: { en: 'Singapore', ar: 'سنغافورة' },
    priceFrom: 65,
    services: [{
      slug: 'sg-arrival-card',
      name: { en: 'Arrival Card', ar: 'بطاقة الوصول' },
      shortName: { en: 'Singapore SGAC', ar: 'SGAC سنغافورة' },
      description: {
        en: 'Singapore SGAC — the visa-free online arrival card required for immigration clearance in Singapore.',
        ar: 'SGAC سنغافورة — بطاقة الوصول الإلكترونية المطلوبة للتخليص الجمركي في سنغافورة.',
      },
      priceFrom: 65,
      detailed: false,
    }],
  },
  {
    slug: 'thailand',
    countryCode: 'TH',
    name: { en: 'Thailand', ar: 'تايلاند' },
    priceFrom: 65,
    services: [{
      slug: 'tdac',
      name: { en: 'Digital Arrival Card', ar: 'بطاقة الوصول الرقمية' },
      shortName: { en: 'Thailand TDAC', ar: 'TDAC تايلاند' },
      description: {
        en: 'Thailand TDAC — the mandatory online digital arrival card for non-Thai nationals entering Thailand.',
        ar: 'TDAC تايلاند — بطاقة الوصول الرقمية الإلزامية لغير التايلانديين الداخلين إلى تايلاند.',
      },
      priceFrom: 65,
      detailed: true,
    }],
  },
  {
    slug: 'taiwan',
    countryCode: 'TW',
    name: { en: 'Taiwan', ar: 'تايوان' },
    priceFrom: 65,
    services: [{
      slug: 'arrival-card',
      name: { en: 'Arrival Card', ar: 'بطاقة الوصول' },
      shortName: { en: 'Taiwan Arrival Card', ar: 'بطاقة وصول تايوان' },
      description: {
        en: 'Taiwan Arrival Card — complete your online arrival declaration before landing in Taiwan.',
        ar: 'بطاقة وصول تايوان — أكمل إقرار الوصول الإلكتروني قبل الهبوط في تايوان.',
      },
      priceFrom: 65,
      detailed: false,
    }],
  },
];

export function getDestination(slug: string): DestinationDef | undefined {
  return destinations.find((d) => d.slug === slug);
}

export function getService(dest: DestinationDef, serviceSlug: string): ServiceDef | undefined {
  return dest.services.find((s) => s.slug === serviceSlug);
}

export type PageScope =
  | { type: 'hub' }
  | { type: 'country'; destination: DestinationDef }
  | { type: 'service'; destination: DestinationDef; service: ServiceDef };

export function buildPath(
  lang: Lang,
  destination?: string,
  service?: string,
  apply?: boolean
): string {
  let path = `/${lang}`;
  if (destination) path += `/${destination}`;
  if (service) path += `/${service}`;
  if (apply) path += '/apply';
  return path;
}

export function buildPaymentPath(lang: Lang, destination: string, service: string): string {
  return `/${lang}/${destination}/${service}/payment`;
}

export function swapLangInPath(pathname: string, newLang: Lang): string {
  return pathname.replace(/^\/(ar|en)(?=\/|$)/, `/${newLang}`);
}
