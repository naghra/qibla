import React from 'react';
import { adminLabels } from '../../data/adminLabels';

interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({ page, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  return (
    <nav className="flex items-center justify-between gap-3 rounded-xl border border-gray-100 bg-white px-4 py-3 text-sm shadow-sm">
      <button
        type="button"
        disabled={page <= 1}
        onClick={() => onPageChange(page - 1)}
        className="rounded-lg px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-50 disabled:opacity-40"
      >
        {adminLabels.pagination.prev}
      </button>
      <span className="text-gray-500">
        {adminLabels.pagination.page} {page} {adminLabels.pagination.of} {totalPages}
      </span>
      <button
        type="button"
        disabled={page >= totalPages}
        onClick={() => onPageChange(page + 1)}
        className="rounded-lg px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-50 disabled:opacity-40"
      >
        {adminLabels.pagination.next}
      </button>
    </nav>
  );
};

export function paginate<T>(items: T[], page: number, perPage: number): T[] {
  const start = (page - 1) * perPage;
  return items.slice(start, start + perPage);
}

export function totalPages(count: number, perPage: number): number {
  return Math.max(1, Math.ceil(count / perPage));
}
