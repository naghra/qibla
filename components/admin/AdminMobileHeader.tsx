import React from 'react';
import { Menu } from 'lucide-react';
import { adminLabels } from '../../data/adminLabels';

interface AdminMobileHeaderProps {
  onMenuClick: () => void;
  title?: string;
}

export const AdminMobileHeader: React.FC<AdminMobileHeaderProps> = ({
  onMenuClick,
  title,
}) => (
  <header className="sticky top-0 z-30 flex items-center gap-3 border-b border-gray-200 bg-white px-4 py-3 lg:hidden">
    <button
      type="button"
      onClick={onMenuClick}
      className="rounded-lg p-2 text-gray-600 hover:bg-gray-100"
      aria-label="فتح القائمة"
    >
      <Menu className="size-6" />
    </button>
    <p className="truncate text-base font-bold text-gray-900">
      {title ?? adminLabels.siteName}
    </p>
  </header>
);
