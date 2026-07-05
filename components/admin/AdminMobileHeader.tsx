import React from 'react';
import { Menu, Bell } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { adminLabels } from '../../data/adminLabels';
import { usePendingCount } from '../../hooks/usePendingCount';

interface AdminMobileHeaderProps {
  onMenuClick: () => void;
  title?: string;
}

export const AdminMobileHeader: React.FC<AdminMobileHeaderProps> = ({
  onMenuClick,
  title,
}) => {
  const navigate = useNavigate();
  const pending = usePendingCount();

  return (
    <header className="admin-mobile-bar sticky top-0 z-30 flex items-center gap-2 border-b border-gray-200 bg-white px-3 py-2.5 sm:gap-3 sm:px-4 sm:py-3 md:hidden">
      <button
        type="button"
        onClick={onMenuClick}
        className="shrink-0 rounded-xl p-2.5 text-gray-600 hover:bg-gray-100 active:bg-gray-200"
        aria-label="فتح القائمة"
      >
        <Menu className="size-6" />
      </button>
      <p className="min-w-0 flex-1 truncate text-base font-bold text-gray-900">
        {title ?? adminLabels.siteName}
      </p>
      {pending > 0 && (
        <button
          type="button"
          onClick={() => navigate('/admin/applications?status=pending')}
          className="relative shrink-0 rounded-xl p-2.5 text-amber-600 hover:bg-amber-50 active:bg-amber-100"
          aria-label={adminLabels.topBar.pending}
        >
          <Bell className="size-5" />
          <span className="absolute end-1 top-1 flex size-4 min-w-4 items-center justify-center rounded-full bg-amber-500 px-0.5 text-[9px] font-bold leading-none text-white">
            {pending > 9 ? '9+' : pending}
          </span>
        </button>
      )}
    </header>
  );
};
