import type { Lang } from './types';

export interface ApplySuccessCopy {
  badge: string;
  title: string;
  subtitle: string;
  referenceLabel: string;
  statusLabel: string;
  statusValue: string;
  thanks: (name: string) => string;
  emailNotice: string;
  detailsTitle: string;
  destination: string;
  document: string;
  plan: string;
  travelers: string;
  amount: string;
  processingLabel: string;
  nextStepsTitle: string;
  steps: [string, string, string, string];
  importantTitle: string;
  importantText: string;
  supportNote: string;
  backToHome: string;
}

export const applySuccessCopy: Record<Lang, ApplySuccessCopy> = {
  en: {
    badge: 'Application received',
    title: 'Your application has been submitted',
    subtitle:
      'We have received your travel document request. Please save your reference number for tracking and future correspondence.',
    referenceLabel: 'Application reference',
    statusLabel: 'Current status',
    statusValue: 'Received — under review',
    thanks: (name) => `Thank you, ${name}.`,
    emailNotice: 'A confirmation has been sent to:',
    detailsTitle: 'Application summary',
    destination: 'Destination',
    document: 'Document',
    plan: 'Processing plan',
    travelers: 'Travelers',
    amount: 'Total paid',
    processingLabel: 'Estimated completion',
    nextStepsTitle: 'What happens next',
    steps: [
      'Our team verifies your information and supporting details.',
      'Your application is prepared and submitted through the appropriate channel.',
      'You receive your approved document by email with instructions.',
      'Contact our support team if we need any additional information.',
    ],
    importantTitle: 'Important',
    importantText:
      'DacGateway is an independent private company — not a government authority. Keep your reference number safe. Processing times are estimates and may vary.',
    supportNote: 'Questions? Our support team is available 24/7.',
    backToHome: 'Return to homepage',
  },
  ar: {
    badge: 'تم استلام الطلب',
    title: 'تم تقديم طلبك بنجاح',
    subtitle:
      'استلمنا طلب مستند السفر. احفظ رقم المرجع للمتابعة والتواصل مستقبلاً.',
    referenceLabel: 'رقم مرجع الطلب',
    statusLabel: 'الحالة الحالية',
    statusValue: 'مستلم — قيد المراجعة',
    thanks: (name) => `شكراً لك، ${name}.`,
    emailNotice: 'تم إرسال تأكيد إلى:',
    detailsTitle: 'ملخص الطلب',
    destination: 'الوجهة',
    document: 'المستند',
    plan: 'خطة المعالجة',
    travelers: 'المسافرون',
    amount: 'المبلغ الإجمالي',
    processingLabel: 'الإنجاز المتوقع',
    nextStepsTitle: 'الخطوات التالية',
    steps: [
      'يقوم فريقنا بالتحقق من معلوماتك وبياناتك.',
      'يُعَدّ طلبك ويُقدَّم عبر القناة المناسبة.',
      'تستلم مستندك المعتمد عبر البريد مع التعليمات.',
      'تواصل مع الدعم إذا احتجنا معلومات إضافية.',
    ],
    importantTitle: 'تنبيه مهم',
    importantText:
      'DacGateway شركة خاصة مستقلة — ليست جهة حكومية. احفظ رقم المرجع. مدة المعالجة تقديرية وقد تختلف.',
    supportNote: 'أسئلة؟ فريق الدعم متاح 24/7.',
    backToHome: 'العودة للرئيسية',
  },
};
