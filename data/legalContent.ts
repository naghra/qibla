import type { Lang } from './i18n/types';
import { COMPANY_ADDRESS, SUPPORT_EMAIL } from '../utils/siteConfig';

export type LegalPageKind = 'privacy' | 'terms' | 'refund' | 'disclaimer';

interface LegalPageContent {
  title: Record<Lang, string>;
  paragraphs: Record<Lang, string[]>;
}

export const legalPages: Record<LegalPageKind, LegalPageContent> = {
  privacy: {
    title: { en: 'Privacy Policy', ar: 'سياسة الخصوصية' },
    paragraphs: {
      en: [
        `Travel Smart Travel Fast is operated from ${COMPANY_ADDRESS.formatted}. For privacy inquiries, contact us at ${SUPPORT_EMAIL}.`,
        'Travel Smart Travel Fast collects the information you provide in your application (passport details, contact information, and travel dates) to process your travel document request.',
        'We use industry-standard 256-bit encryption and do not sell your personal data to third parties.',
        'Application data is stored securely and retained only as long as needed to fulfill your request and meet legal obligations.',
        'You may contact us to request access, correction, or deletion of your data where applicable.',
      ],
      ar: [
        `تُدار Travel Smart Travel Fast من ${COMPANY_ADDRESS.formatted}. لاستفسارات الخصوصية، تواصل معنا على ${SUPPORT_EMAIL}.`,
        'يجمع Travel Smart Travel Fast المعلومات التي تقدّمها في طلبك (تفاصيل جواز السفر، بيانات الاتصال، وتواريخ السفر) لمعالجة طلب مستند السفر.',
        'نستخدم تشفيراً بمعيار 256-bit ولا نبيع بياناتك الشخصية لأطراف ثالثة.',
        'تُخزَّن بيانات الطلب بشكل آمن وتحتفظ بها فقط للمدة اللازمة لتنفيذ طلبك والالتزامات القانونية.',
        'يمكنك التواصل معنا لطلب الوصول إلى بياناتك أو تصحيحها أو حذفها حيث ينطبق ذلك.',
      ],
    },
  },
  terms: {
    title: { en: 'Terms of Service', ar: 'شروط الخدمة' },
    paragraphs: {
      en: [
        `Travel Smart Travel Fast is an independent private assistance service registered at ${COMPANY_ADDRESS.formatted}. We are not affiliated with, endorsed by, or operated by any government agency.`,
        'By submitting an application, you confirm that the information provided is accurate and authorize us to process your request on your behalf.',
        'Service fees cover document review, application support, and processing assistance. Government or consular fees may apply separately where required.',
        'Processing times are estimates and may vary based on destination requirements and the accuracy of your submission.',
      ],
      ar: [
        `Travel Smart Travel Fast خدمة مساعدة خاصة مستقلة مسجّلة في ${COMPANY_ADDRESS.formatted}. نحن غير تابعين أو معتمدين أو مُشغّلين من أي جهة حكومية.`,
        'بإرسال الطلب، تؤكد صحة المعلومات وتفوّضنا بمعالجة طلبك نيابةً عنك.',
        'رسوم الخدمة تشمل مراجعة المستندات ودعم الطلب والمساعدة في المعالجة. قد تُطبَّق رسوم حكومية أو قنصلية بشكل منفصل عند الحاجة.',
        'أوقات المعالجة تقديرية وقد تختلف حسب متطلبات الوجهة ودقة البيانات المقدّمة.',
      ],
    },
  },
  refund: {
    title: { en: 'Refund Policy', ar: 'سياسة الاسترداد' },
    paragraphs: {
      en: [
        'A partial refund is available if you cancel before your application enters processing.',
        'Once processing has started, service fees are generally non-refundable because review and submission work has begun.',
        'If we cannot complete your application due to an error on our side, we will refund applicable service fees or reprocess at no extra charge.',
        'Contact support with your application reference number to request a refund review.',
      ],
      ar: [
        'يتوفر استرداد جزئي إذا ألغيت الطلب قبل بدء المعالجة.',
        'بعد بدء المعالجة، عادةً لا تُسترد رسوم الخدمة لأن عمل المراجعة والتقديم قد بدأ.',
        'إذا تعذّر علينا إكمال طلبك بسبب خطأ من جانبنا، نسترد رسوم الخدمة المعنية أو نعيد المعالجة دون رسوم إضافية.',
        'تواصل مع الدعم مع رقم الطلب لطلب مراجعة الاسترداد.',
      ],
    },
  },
  disclaimer: {
    title: { en: 'Disclaimer', ar: 'إخلاء المسؤولية' },
    paragraphs: {
      en: [
        'Travel Smart Travel Fast provides optional assistance for travel document applications. You may always apply directly through official government channels at no service fee from us.',
        'We do not guarantee approval; final decisions rest with the relevant immigration or consular authorities.',
        'Information on this website is for general guidance and may change when government requirements change.',
      ],
      ar: [
        'يوفر Travel Smart Travel Fast مساعدة اختيارية في طلبات مستندات السفر. يمكنك دائماً التقديم مباشرة عبر القنوات الحكومية الرسمية دون رسوم خدمة منا.',
        'لا نضمن الموافقة؛ القرار النهائي للجهات المختصة بالهجرة أو القنصليات.',
        'المعلومات على هذا الموقع للإرشاد العام وقد تتغير عند تغيّر المتطلبات الحكومية.',
      ],
    },
  },
};
