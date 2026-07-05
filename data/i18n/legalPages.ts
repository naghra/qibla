import type { Lang } from './types';

export type LegalSlug = 'privacy' | 'terms' | 'refund' | 'disclaimer';

export interface LegalSection {
  title: string;
  paragraphs: string[];
}

export interface LegalPageContent {
  title: string;
  lastUpdated: string;
  intro?: string;
  sections: LegalSection[];
}

export const LEGAL_SLUGS: LegalSlug[] = ['privacy', 'terms', 'refund', 'disclaimer'];

export function isLegalSlug(value: string): value is LegalSlug {
  return LEGAL_SLUGS.includes(value as LegalSlug);
}

export function legalPath(lang: Lang, slug: LegalSlug): string {
  return `/${lang}/legal/${slug}`;
}

const en: Record<LegalSlug, LegalPageContent> = {
  privacy: {
    title: 'Privacy Policy',
    lastUpdated: '5 July 2026',
    intro:
      'DacGateway ("we", "us", "our") respects your privacy. This policy explains how we collect, use, and protect personal information when you use dacgateway.com and our application services.',
    sections: [
      {
        title: '1. Information we collect',
        paragraphs: [
          'We collect information you provide when applying for travel documents, including name, email, phone number, passport details, travel dates, accommodation details, and payment information.',
          'We automatically collect technical data such as IP address, browser type, device information, and cookies when you visit our website.',
        ],
      },
      {
        title: '2. How we use your information',
        paragraphs: [
          'To prepare, review, and submit travel document applications on your behalf where permitted.',
          'To communicate with you about your application status, support requests, and service updates.',
          'To process payments and prevent fraud.',
          'To improve our website, services, and customer experience.',
        ],
      },
      {
        title: '3. Sharing of information',
        paragraphs: [
          'We may share your data with payment processors, hosting providers, and service partners who assist in delivering our services under strict confidentiality obligations.',
          'We may disclose information when required by law or to protect our legal rights.',
          'We do not sell your personal information to third parties.',
        ],
      },
      {
        title: '4. Data retention',
        paragraphs: [
          'We retain application data for as long as necessary to provide our services, comply with legal obligations, and resolve disputes. You may request deletion subject to applicable law.',
        ],
      },
      {
        title: '5. Security',
        paragraphs: [
          'We use industry-standard measures including SSL encryption and secure servers. No method of transmission over the internet is 100% secure; we strive to protect your data but cannot guarantee absolute security.',
        ],
      },
      {
        title: '6. Your rights',
        paragraphs: [
          'Depending on your location, you may have rights to access, correct, delete, or restrict processing of your personal data. Contact us to exercise these rights.',
        ],
      },
      {
        title: '7. Cookies',
        paragraphs: [
          'We use cookies and similar technologies to remember preferences and analyse site usage. You can control cookies through your browser settings.',
        ],
      },
      {
        title: '8. Contact',
        paragraphs: [
          'DacGateway — 24-26, Arcadia Avenue Fin009/Govonly, London, United Kingdom, N3 2JU',
          'Email: support@dacgateway.com',
        ],
      },
    ],
  },
  terms: {
    title: 'Terms of Service',
    lastUpdated: '5 July 2026',
    intro:
      'These Terms of Service govern your use of DacGateway and our travel document assistance services. By using our website or submitting an application, you agree to these terms.',
    sections: [
      {
        title: '1. Our service',
        paragraphs: [
          'DacGateway is an independent private company that provides professional assistance with online travel document applications. We help travellers complete and submit applications accurately and efficiently.',
          'We are not a government authority. We do not issue visas, entry permits, or official travel documents — these are issued solely by the relevant government agencies.',
        ],
      },
      {
        title: '2. Eligibility',
        paragraphs: [
          'You must be at least 18 years old or have parental consent to use our services. You are responsible for ensuring the information you provide is accurate and complete.',
        ],
      },
      {
        title: '3. Fees',
        paragraphs: [
          'Our service fees are displayed before payment. Government or consular fees, where applicable, may be charged separately. All prices are shown in USD unless stated otherwise.',
        ],
      },
      {
        title: '4. Your responsibilities',
        paragraphs: [
          'You agree to provide truthful and accurate information. You are responsible for verifying that you meet entry requirements for your destination.',
          'You must not use our services for fraudulent or unlawful purposes.',
        ],
      },
      {
        title: '5. Processing and delivery',
        paragraphs: [
          'Processing times are estimates and not guarantees. Approval decisions are made exclusively by the relevant government authority. We are not responsible for refusals, delays, or changes in government policy.',
        ],
      },
      {
        title: '6. Intellectual property',
        paragraphs: [
          'All content on dacgateway.com, including text, design, and branding, is owned by DacGateway and may not be copied without permission.',
        ],
      },
      {
        title: '7. Limitation of liability',
        paragraphs: [
          'To the fullest extent permitted by law, DacGateway is not liable for indirect, incidental, or consequential damages arising from use of our services or government decisions on applications.',
          'Our total liability shall not exceed the service fees paid for the relevant application.',
        ],
      },
      {
        title: '8. Changes',
        paragraphs: [
          'We may update these terms at any time. Continued use of our services after changes constitutes acceptance of the updated terms.',
        ],
      },
      {
        title: '9. Governing law',
        paragraphs: [
          'These terms are governed by the laws of England and Wales. Disputes shall be subject to the exclusive jurisdiction of the courts of England and Wales.',
        ],
      },
      {
        title: '10. Contact',
        paragraphs: [
          'DacGateway — 24-26, Arcadia Avenue Fin009/Govonly, London, United Kingdom, N3 2JU',
          'Email: support@dacgateway.com',
        ],
      },
    ],
  },
  refund: {
    title: 'Refund Policy',
    lastUpdated: '5 July 2026',
    intro:
      'We want you to be satisfied with our service. This policy explains when refunds are available for DacGateway service fees.',
    sections: [
      {
        title: '1. Overview',
        paragraphs: [
          'Refunds apply to DacGateway service fees only. Government or consular fees paid to official authorities are non-refundable through us once submitted.',
        ],
      },
      {
        title: '2. Full refund — before processing',
        paragraphs: [
          'If you cancel before we begin processing your application, you are eligible for a full refund of the service fee minus any payment processing charges.',
        ],
      },
      {
        title: '3. Partial refund',
        paragraphs: [
          'If processing has started but the application has not yet been submitted to the government, we may offer a partial refund at our discretion.',
          'Once an application has been submitted to the relevant authority, the service fee is generally non-refundable.',
        ],
      },
      {
        title: '4. Non-refundable situations',
        paragraphs: [
          'No refund is available if the application was submitted, if incorrect information was provided by you, if the government rejects the application, or if you no longer require the document after approval.',
        ],
      },
      {
        title: '5. How to request a refund',
        paragraphs: [
          'Contact support@dacgateway.com with your application reference number and reason for the request. We will respond within 5 business days.',
        ],
      },
      {
        title: '6. Processing time',
        paragraphs: [
          'Approved refunds are processed within 7–14 business days to the original payment method.',
        ],
      },
    ],
  },
  disclaimer: {
    title: 'Disclaimer',
    lastUpdated: '5 July 2026',
    intro:
      'Please read this disclaimer carefully before using DacGateway services.',
    sections: [
      {
        title: '1. Independent private company',
        paragraphs: [
          'DacGateway is an independent private company that provides professional assistance with online travel document applications. We are not affiliated with, endorsed by, or operated by any government authority or agency.',
        ],
      },
      {
        title: '2. Not an official government website',
        paragraphs: [
          'This website is not the official website of any government. Official applications may be available directly through government portals, often at lower or no service cost.',
        ],
      },
      {
        title: '3. Official government channels',
        paragraphs: [
          'Whenever available, applicants may choose to submit their applications directly through the official government website. We clearly indicate when an official alternative exists.',
        ],
      },
      {
        title: '4. No guarantee of approval',
        paragraphs: [
          'We do not guarantee approval of any application. Final decisions rest solely with the relevant government authority. Processing times are estimates only.',
        ],
      },
      {
        title: '5. Information accuracy',
        paragraphs: [
          'While we strive to keep information current, entry requirements and regulations change frequently. You are responsible for verifying requirements before travel.',
        ],
      },
      {
        title: '6. Contact',
        paragraphs: [
          'DacGateway — 24-26, Arcadia Avenue Fin009/Govonly, London, United Kingdom, N3 2JU',
          'Email: support@dacgateway.com',
        ],
      },
    ],
  },
};

const ar: Record<LegalSlug, LegalPageContent> = {
  privacy: {
    title: 'سياسة الخصوصية',
    lastUpdated: '5 يوليو 2026',
    intro:
      'تحترم DacGateway («نحن») خصوصيتك. توضّح هذه السياسة كيفية جمع معلوماتك الشخصية واستخدامها وحمايتها عند استخدام dacgateway.com وخدمات التقديم.',
    sections: [
      {
        title: '1. المعلومات التي نجمعها',
        paragraphs: [
          'نجمع المعلومات التي تقدّمها عند التقديم، بما في ذلك الاسم والبريد والهاتف وبيانات جواز السفر وتواريخ السفر والإقامة ومعلومات الدفع.',
          'نجمع تلقائياً بيانات تقنية مثل عنوان IP ونوع المتصفح ومعلومات الجهاز وملفات تعريف الارتباط.',
        ],
      },
      {
        title: '2. كيفية استخدام المعلومات',
        paragraphs: [
          'لإعداد ومراجعة وتقديم طلبات مستندات السفر نيابة عنك حيث يسمح بذلك.',
          'للتواصل معك بشأن حالة الطلب وطلبات الدعم.',
          'لمعالجة المدفوعات ومنع الاحتيال.',
          'لتحسين موقعنا وخدماتنا.',
        ],
      },
      {
        title: '3. مشاركة المعلومات',
        paragraphs: [
          'قد نشارك بياناتك مع معالجي الدفع ومزودي الاستضافة والشركاء بموجب التزامات سرية.',
          'قد نكشف عن معلومات عندما يقتضي القانون ذلك.',
          'لا نبيع معلوماتك الشخصية لأطراف ثالثة.',
        ],
      },
      {
        title: '4. الاحتفاظ بالبيانات',
        paragraphs: [
          'نحتفظ ببيانات الطلبات طالما كان ذلك ضرورياً لتقديم الخدمة والامتثال القانوني. يمكنك طلب الحذف وفقاً للقانون المعمول به.',
        ],
      },
      {
        title: '5. الأمان',
        paragraphs: [
          'نستخدم تشفير SSL وخوادم آمنة. لا توجد طريقة نقل عبر الإنترنت آمنة بنسبة 100%، لكننا نبذل جهوداً معقولة لحماية بياناتك.',
        ],
      },
      {
        title: '6. حقوقك',
        paragraphs: [
          'قد يكون لك الحق في الوصول إلى بياناتك أو تصحيحها أو حذفها أو تقييد معالجتها. تواصل معنا لممارسة هذه الحقوق.',
        ],
      },
      {
        title: '7. ملفات تعريف الارتباط',
        paragraphs: [
          'نستخدم ملفات تعريف الارتباط لتذكر التفضيلات وتحليل الاستخدام. يمكنك التحكم بها من إعدادات المتصفح.',
        ],
      },
      {
        title: '8. التواصل',
        paragraphs: [
          'DacGateway — 24-26, Arcadia Avenue Fin009/Govonly, London, United Kingdom, N3 2JU',
          'البريد: support@dacgateway.com',
        ],
      },
    ],
  },
  terms: {
    title: 'شروط الخدمة',
    lastUpdated: '5 يوليو 2026',
    intro:
      'تحكم شروط الخدمة هذه استخدامك لـ DacGateway وخدمات مساعدة مستندات السفر. باستخدام موقعنا أو تقديم طلب، فإنك توافق على هذه الشروط.',
    sections: [
      {
        title: '1. خدمتنا',
        paragraphs: [
          'DacGateway شركة خاصة مستقلة تقدّم مساعدة مهنية في طلبات مستندات السفر عبر الإنترنت.',
          'لسنا جهة حكومية. لا نصدر تأشيرات أو تصاريح دخول — يصدرها الجهات الحكومية المختصة فقط.',
        ],
      },
      {
        title: '2. الأهلية',
        paragraphs: [
          'يجب أن يكون عمرك 18 عاماً على الأقل أو لديك موافقة ولي الأمر. أنت مسؤول عن دقة المعلومات المقدّمة.',
        ],
      },
      {
        title: '3. الرسوم',
        paragraphs: [
          'تُعرض رسوم الخدمة قبل الدفع. قد تُفرض رسوم حكومية أو قنصلية بشكل منفصل. الأسعار بالدولار الأمريكي ما لم يُذكر غير ذلك.',
        ],
      },
      {
        title: '4. مسؤولياتك',
        paragraphs: [
          'تتعهد بتقديم معلومات صحيحة وكاملة والتحقق من متطلبات الدخول لوجهتك.',
          'لا يجوز استخدام خدماتنا لأغراض احتيالية أو غير قانونية.',
        ],
      },
      {
        title: '5. المعالجة والتسليم',
        paragraphs: [
          'مدة المعالجة تقديرية وليست ضماناً. قرارات الموافقة تصدر حصراً من الجهة الحكومية. لسنا مسؤولين عن الرفض أو التأخير أو تغيير السياسات.',
        ],
      },
      {
        title: '6. الملكية الفكرية',
        paragraphs: [
          'جميع محتويات dacgateway.com مملوكة لـ DacGateway ولا يجوز نسخها دون إذن.',
        ],
      },
      {
        title: '7. حدود المسؤولية',
        paragraphs: [
          'في الحدود التي يسمح بها القانون، لا نتحمل مسؤولية الأضرار غير المباشرة الناتجة عن استخدام خدماتنا أو قرارات الجهات الحكومية.',
          'لا تتجاوز مسؤوليتنا الإجمالية رسوم الخدمة المدفوعة للطلب المعني.',
        ],
      },
      {
        title: '8. التعديلات',
        paragraphs: [
          'قد نحدّث هذه الشروط في أي وقت. استمرارك في استخدام الخدمة يعني قبول الشروط المحدّثة.',
        ],
      },
      {
        title: '9. القانون الحاكم',
        paragraphs: [
          'تخضع هذه الشروط لقوانين إنجلترا وويلز. وتختص محاكم إنجلترا وويلز حصرياً بالنزاعات.',
        ],
      },
      {
        title: '10. التواصل',
        paragraphs: [
          'DacGateway — 24-26, Arcadia Avenue Fin009/Govonly, London, United Kingdom, N3 2JU',
          'البريد: support@dacgateway.com',
        ],
      },
    ],
  },
  refund: {
    title: 'سياسة الاسترداد',
    lastUpdated: '5 يوليو 2026',
    intro:
      'نريد أن تكون راضياً عن خدمتنا. توضّح هذه السياسة متى يمكن استرداد رسوم خدمة DacGateway.',
    sections: [
      {
        title: '1. نظرة عامة',
        paragraphs: [
          'ينطبق الاسترداد على رسوم خدمة DacGateway فقط. الرسوم الحكومية المدفوعة للجهات الرسمية غير قابلة للاسترداد عبرنا بعد التقديم.',
        ],
      },
      {
        title: '2. استرداد كامل — قبل المعالجة',
        paragraphs: [
          'إذا ألغيت قبل بدء معالجة طلبك، يحق لك استرداد كامل لرسوم الخدمة ناقصاً رسوم معالجة الدفع إن وُجدت.',
        ],
      },
      {
        title: '3. استرداد جزئي',
        paragraphs: [
          'إذا بدأت المعالجة ولم يُقدَّم الطلب للجهة الحكومية بعد، قد نعرض استرداداً جزئياً وفق تقديرنا.',
          'بعد تقديم الطلب للجهة المختصة، تصبح رسوم الخدمة عادةً غير قابلة للاسترداد.',
        ],
      },
      {
        title: '4. حالات لا استرداد فيها',
        paragraphs: [
          'لا استرداد إذا قُدّم الطلب، أو إذا كانت المعلومات خاطئة من طرفك، أو إذا رفضت الجهة الطلب، أو إذا لم تعد بحاجة للمستند بعد الموافقة.',
        ],
      },
      {
        title: '5. كيفية طلب الاسترداد',
        paragraphs: [
          'راسل support@dacgateway.com مع رقم الطلب وسبب الطلب. نرد خلال 5 أيام عمل.',
        ],
      },
      {
        title: '6. مدة المعالجة',
        paragraphs: [
          'تُعالَج المبالغ المستردة المعتمدة خلال 7–14 يوم عمل إلى وسيلة الدفع الأصلية.',
        ],
      },
    ],
  },
  disclaimer: {
    title: 'إخلاء المسؤولية',
    lastUpdated: '5 يوليو 2026',
    intro: 'يرجى قراءة إخلاء المسؤولية هذا بعناية قبل استخدام خدمات DacGateway.',
    sections: [
      {
        title: '1. شركة خاصة مستقلة',
        paragraphs: [
          'DacGateway شركة خاصة مستقلة تقدّم مساعدة مهنية في طلبات مستندات السفر. لسنا تابعين لأي جهة حكومية ولا تحظى بموافقتها أو تشغيلنا من قبلها.',
        ],
      },
      {
        title: '2. ليس موقعاً حكومياً رسمياً',
        paragraphs: [
          'هذا الموقع ليس الموقع الرسمي لأي حكومة. قد تتوفر طلبات رسمية مباشرة عبر بوابات حكومية، غالباً برسوم أقل أو بدون رسوم خدمة.',
        ],
      },
      {
        title: '3. القنوات الحكومية الرسمية',
        paragraphs: [
          'عندما يكون ذلك متاحاً، يمكن للمتقدّمين التقديم مباشرة عبر الموقع الرسمي للحكومة. نوضّح ذلك عندما تتوفر بديل رسمي.',
        ],
      },
      {
        title: '4. لا ضمان للموافقة',
        paragraphs: [
          'لا نضمن الموافقة على أي طلب. القرار النهائي للجهة الحكومية المختصة فقط. مدة المعالجة تقديرية.',
        ],
      },
      {
        title: '5. دقة المعلومات',
        paragraphs: [
          'نسعى لتحديث المعلومات، لكن متطلبات الدخول تتغير. أنت مسؤول عن التحقق قبل السفر.',
        ],
      },
      {
        title: '6. التواصل',
        paragraphs: [
          'DacGateway — 24-26, Arcadia Avenue Fin009/Govonly, London, United Kingdom, N3 2JU',
          'البريد: support@dacgateway.com',
        ],
      },
    ],
  },
};

export function getLegalPage(lang: Lang, slug: LegalSlug): LegalPageContent {
  return lang === 'ar' ? ar[slug] : en[slug];
}

export const legalNavLabels: Record<Lang, Record<LegalSlug, string>> = {
  en: {
    privacy: 'Privacy Policy',
    terms: 'Terms of Service',
    refund: 'Refund Policy',
    disclaimer: 'Disclaimer',
  },
  ar: {
    privacy: 'سياسة الخصوصية',
    terms: 'شروط الخدمة',
    refund: 'سياسة الاسترداد',
    disclaimer: 'إخلاء المسؤولية',
  },
};
