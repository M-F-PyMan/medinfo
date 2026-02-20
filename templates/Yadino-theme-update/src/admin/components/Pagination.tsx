// src/admin/components/Pagination.tsx
import React from 'react';

interface Props {
  page: number;
  pageSize: number;
  total: number;
  onChange: (page: number) => void;
}

export const Pagination: React.FC<Props> = ({ page, pageSize, total, onChange }) => {
  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center space-x-2 space-x-reverse mt-4">
      <button
        disabled={page <= 1}
        onClick={() => onChange(page - 1)}
        className="px-3 py-1 rounded-lg bg-white/5 text-gray-300 disabled:opacity-40"
      >
        قبلی
      </button>
      <span className="text-gray-300 text-sm">
        صفحه {page.toLocaleString('fa')} از {totalPages.toLocaleString('fa')}
      </span>
      <button
        disabled={page >= totalPages}
        onClick={() => onChange(page + 1)}
        className="px-3 py-1 rounded-lg bg-white/5 text-gray-300 disabled:opacity-40"
      >
        بعدی
      </button>
    </div>
  );
};
