import React from 'react';
import { Menu, Bell } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { adminLabels } from '../../data/adminLabels';
import { getPendingCount } from '../../services/applicationStore';

interface AdminMobileHeaderProps {
  onMenuClick: () => void;
  title?: string;
}

export const AdminMobileHeader: React.FC<AdminMobileHeaderProps> = ({
  onMenuClick,
  title,
}) => {
  const navigate = useNavigate();
  const pending = getPendingCount();

  return (
    <header className="sticky top-0 z-30 flex items-center gap-3 border-b border-gray-200 bg-white px-4 py-3 lg:hidden">
      <button
        type="button"
        onClick={onMenuClick}
        className="rounded-xl p-2 text-gray-600 hover:bg-gray-100"
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
          className="relative rounded-xl p-2 text-amber-600 hover:bg-amber-50"
          aria-label={adminLabels.topBar.pending}
        >
          <Bell className="size-5" />
          <span className="absolute end-1 top-1 flex size-4 items-center justify-center rounded-full bg-amber-500 text-[9px] font-bold text-white">
            {pending > 9 ? '9+' : pending}
          </span>
        </button>
      )}
    </header>
  );
};
