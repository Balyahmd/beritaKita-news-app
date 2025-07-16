import React from "react";

interface PaginationArticleProps {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const PaginationArticle: React.FC<PaginationArticleProps> = ({
  totalItems,
  itemsPerPage,
  currentPage,
  onPageChange,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePrev = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  };

  const renderPageNumbers = () => {
    const pages: (number | string)[] = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);
      if (currentPage > 4) pages.push("...");
      for (
        let i = Math.max(2, currentPage - 1);
        i <= Math.min(totalPages - 1, currentPage + 1);
        i++
      ) {
        pages.push(i);
      }
      if (currentPage < totalPages - 3) pages.push("...");
      pages.push(totalPages);
    }
    return pages;
  };

  const getItemRangeText = () => {
    if (totalItems === 0) return "No results";
    const start = (currentPage - 1) * itemsPerPage + 1;
    const end = Math.min(currentPage * itemsPerPage, totalItems);
    return `Showing ${start} to ${end} of ${totalItems} results`;
  };

  if (totalPages === 0) return null;

  return (
    <div className="flex flex-col md:flex-row justify-between items-center gap-4 mt-8 mb-4 text-sm">
      <span>{getItemRangeText()}</span>
      <div className="flex items-center gap-1">
        <button
          onClick={handlePrev}
          disabled={currentPage === 1}
          className="px-2 py-1 rounded hover:bg-gray-100 disabled:text-gray-400">
          &lsaquo; Previous
        </button>

        {renderPageNumbers().map((num, idx) => (
          <button
            key={idx}
            disabled={num === "..."}
            onClick={() => typeof num === "number" && onPageChange(num)}
            className={`px-3 py-1 rounded text-sm ${
              num === currentPage
                ? "bg-blue-500 text-white"
                : "hover:bg-gray-100"
            } ${num === "..." ? "cursor-default" : ""}`}>
            {num}
          </button>
        ))}

        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className="px-2 py-1 rounded hover:bg-gray-100 disabled:text-gray-400">
          Next &rsaquo;
        </button>
      </div>
    </div>
  );
};

export default PaginationArticle;
