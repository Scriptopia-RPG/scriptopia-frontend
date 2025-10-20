'use client';

import Button from '@/shared/ui/button/button';

interface AuctionPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const AuctionPagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: AuctionPaginationProps) => {
  const handlePrevious = () => {
    if (currentPage > 0) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages - 1) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className="flex items-center justify-center space-x-4 py-4">
      <button
        onClick={handlePrevious}
        disabled={currentPage === 0}
        className="px-3 py-2 bg-[#2a2a32] hover:bg-[#3a3a42] disabled:bg-[#1a1a1e] text-white rounded transition"
      >
        &lt;
      </button>
      
      <span className="text-gray-300">
        {currentPage + 1}/{totalPages}
      </span>
      
      <button
        onClick={handleNext}
        disabled={currentPage >= totalPages - 1}
        className="px-3 py-2 bg-[#2a2a32] hover:bg-[#3a3a42] disabled:bg-[#1a1a1e] text-white rounded transition"
      >
        &gt;
      </button>
    </div>
  );
};