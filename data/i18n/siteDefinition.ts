import type { Lang } from './types';

/** Official site definition / disclaimer shown in the public footer. */
export const siteDefinition: Record<Lang, string> = {
  en: 'DacGateway is an independent private company that provides professional assistance with online travel document applications. We are not affiliated with, endorsed by, or operated by any government authority or agency. Whenever available, applicants may choose to submit their applications directly through the official government website.',
  ar: 'DacGateway شركة خاصة مستقلة تقدّم مساعدة مهنية في طلبات مستندات السفر عبر الإنترنت. لسنا تابعين لأي جهة أو سلطة حكومية، ولا تحظى بموافقتها أو تشغيلنا من قبلها. وعندما يكون ذلك متاحاً، يمكن للمتقدّمين التقديم مباشرة عبر الموقع الرسمي للحكومة.',
};

export const companyInfo = {
  name: 'DacGateway',
  address: '24-26, Arcadia Avenue Fin009/Govonly, London, United Kingdom, N3 2JU',
  title: {
    en: 'COMPANY INFORMATION',
    ar: 'معلومات الشركة',
  },
} as const;
