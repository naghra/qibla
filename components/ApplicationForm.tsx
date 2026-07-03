import React from 'react';
import { X } from 'lucide-react';
import { ApplicationWizard } from './ApplicationWizard';
import { PlanId } from '../types';

interface ApplicationFormProps {
  isOpen: boolean;
  onClose: () => void;
  initialPlan?: PlanId;
}

export const ApplicationForm: React.FC<ApplicationFormProps> = ({
  isOpen,
  onClose,
  initialPlan = 'standard',
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-end justify-center sm:items-center">
      <div className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative flex max-h-[95vh] w-full flex-col overflow-hidden bg-white shadow-2xl fade-in sm:max-w-2xl sm:rounded-4xl">
        <div className="flex items-center justify-between border-b border-gray-100 p-5">
          <h2 className="text-xl font-bold text-gray-900">طلب بطاقة TDAC</h2>
          <button onClick={onClose} className="rounded-lg p-2 hover:bg-gray-100">
            <X className="size-5 text-gray-500" />
          </button>
        </div>
        <div className="overflow-y-auto p-5 sm:p-6">
          <ApplicationWizard initialPlan={initialPlan} onComplete={onClose} variant="modal" />
        </div>
      </div>
    </div>
  );
};
