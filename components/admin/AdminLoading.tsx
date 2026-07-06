import React from 'react';

interface AdminLoadingProps {
  label?: string;
}

export const AdminLoading: React.FC<AdminLoadingProps> = ({ label = 'جاري التحميل...' }) => (
  <div className="admin-loading flex min-h-[40vh] flex-col items-center justify-center gap-4 p-8">
    <div className="admin-loading-spinner" aria-hidden />
    <p className="text-sm font-medium text-slate-500">{label}</p>
  </div>
);
