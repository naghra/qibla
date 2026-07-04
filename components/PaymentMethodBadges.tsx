import React from 'react';

const PAYMENT_METHODS = [
  { src: '/images/payments/visa.svg', label: 'Visa' },
  { src: '/images/payments/mastercard.svg', label: 'Mastercard' },
  { src: '/images/payments/amex.svg', label: 'American Express' },
  { src: '/images/payments/apple-pay.svg', label: 'Apple Pay' },
  { src: '/images/payments/google-pay.svg', label: 'Google Pay' },
] as const;

export const PaymentMethodBadges: React.FC = () => (
  <div className="flex flex-wrap items-center gap-4 [&_img]:h-8 [&_img]:w-auto">
    {PAYMENT_METHODS.map(({ src, label }) => (
      <img key={label} src={src} alt={label} title={label} loading="lazy" decoding="async" />
    ))}
  </div>
);
