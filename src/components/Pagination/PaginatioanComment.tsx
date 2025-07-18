import React from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

type PaginationCommentProps = {
  totalItems: number;
  perPageOptions?: number[];
  currentPage: number;
  perPage: number;
  onPageChange: (page: number) => void;
  onPerPageChange?: (perPage: number) => void;
};

const PaginationComment: React.FC<PaginationCommentProps> = ({
  totalItems,
  perPageOptions,
  currentPage,
  perPage,
  onPageChange,
  onPerPageChange,
}) => {
  const options =
    perPageOptions && perPageOptions.length > 0 ? perPageOptions : [perPage];
  const totalPages = Math.ceil(totalItems / perPage);

  const handlePrev = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const handleChangePerPage = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newPerPage = Number(e.target.value);
    if (onPerPageChange) {
      onPerPageChange(newPerPage);
    }
    onPageChange(1);
  };

  return (
    <div className="flex items-center justify-between mt-6 px-4">
      {/* Left - Item per page */}
      <div className="flex items-center text-sm space-x-2">
        <span>Item per page</span>
        <select
          className="border rounded px-2 py-1"
          value={perPage}
          onChange={handleChangePerPage}
          disabled={!onPerPageChange}>
          {options.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
        <span className="ml-2">
          <span className="pr-2">of</span> {totalItems}
        </span>
      </div>

      <div className="flex items-center space-x-2 text-sm">
        <button
          onClick={handlePrev}
          disabled={currentPage === 1}
          className="p-1 text-gray-600 disabled:opacity-30"
          aria-label="Previous page">
          <FaChevronLeft size={18} />
        </button>

        <button
          className={`px-2 py-1 rounded ${
            currentPage === 1 ? "text-blue-600 font-bold" : ""
          }`}
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1}>
          1
        </button>
        {totalPages >= 2 && (
          <button
            className={`px-2 py-1 rounded ${
              currentPage === 2 ? "text-blue-600 font-bold" : ""
            }`}
            onClick={() => onPageChange(2)}
            disabled={currentPage === 2 || totalPages < 2}>
            2
          </button>
        )}

        <button
          onClick={handleNext}
          disabled={currentPage >= totalPages}
          className="p-1 text-gray-600 disabled:opacity-30"
          aria-label="Next page">
          <FaChevronRight size={18} />
        </button>
      </div>
    </div>
  );
};

export default PaginationComment;
