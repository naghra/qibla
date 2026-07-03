import React from 'react';

export const PrimaryButton: React.FC<
  React.ButtonHTMLAttributes<HTMLButtonElement> & { as?: 'button' | 'a'; href?: string }
> = ({ children, className = '', as = 'button', href, ...props }) => {
  const classes = `inline-flex items-center justify-center gap-2 rounded-2xl border border-blue-600 bg-blue-500 px-6 py-3 text-sm font-bold text-white transition active:scale-95 hover:bg-blue-600 ${className}`;

  if (as === 'a' && href) {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
};

export const GradientCard: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = '',
}) => (
  <div className={`rounded-4xl bg-gradient-to-tl from-white to-blue-100/30 p-4 sm:p-8 ${className}`}>
    {children}
  </div>
);

export const SectionHeader: React.FC<{
  title: string;
  subtitle?: string;
  className?: string;
}> = ({ title, subtitle, className = '' }) => (
  <div className={`mx-auto max-w-3xl space-y-4 text-center ${className}`}>
    <h2 className="text-pretty text-3xl font-bold text-gray-900 sm:text-4xl lg:text-5xl">{title}</h2>
    {subtitle && <p className="text-pretty text-base leading-relaxed text-gray-600 sm:text-xl">{subtitle}</p>}
  </div>
);

export const IconBadge: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="flex size-8 items-center justify-center rounded-xl bg-blue-100 text-blue-500">{children}</div>
);

export const CheckItem: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <li className="flex items-center gap-2 text-sm text-gray-600">
    <svg className="size-4 shrink-0 fill-blue-500" viewBox="0 0 256 256">
      <path d="M226.83,74.83l-128,128a4,4,0,0,1-5.66,0l-56-56a4,4,0,0,1,5.66-5.66L96,194.34,221.17,69.17a4,4,0,1,1,5.66,5.66Z" />
    </svg>
    {children}
  </li>
);
