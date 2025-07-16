import React from "react";

type PaginationHeadlineProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

const PaginationHeadline: React.FC<PaginationHeadlineProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const handlePrev = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  };

  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center items-center gap-3 text-gray-700 mt-8 mb-4 select-none">
      <button
        onClick={handlePrev}
        className="text-xl disabled:opacity-30"
        disabled={currentPage === 1}
        aria-label="Sebelumnya">
        &lsaquo;
      </button>
      <span className="text-sm">{currentPage}</span>
      <span className="text-sm px-4">dari</span>
      <span className="text-sm font-medium">{totalPages}</span>
      <button
        onClick={handleNext}
        className="text-xl disabled:opacity-30"
        disabled={currentPage === totalPages}
        aria-label="Selanjutnya">
        &rsaquo;
      </button>
    </div>
  );
};

export default PaginationHeadline;
