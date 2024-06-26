import React from "react";

const Pagination = ({ currentPage, totalPages, onPageChange, showEntries, totalEntries }) => {
  const handlePrevPage = () => {
    onPageChange(currentPage - 1);
  };

  const handleNextPage = () => {
    const nextPage = currentPage + 1;
    onPageChange(nextPage);

    // Calculate the number of remaining entries to display on the next page
    const remainingEntries = totalEntries - currentPage * showEntries;

    // If there are more remaining entries than showEntries, update the pagination
    if (remainingEntries > 0) {
      onPageChange(nextPage + 1);
    }
  };

  return (
    <div className="flex justify-between items-center mt-4 text-gray-500">
      <div>
        Showing {currentPage} to {Math.min(currentPage * showEntries, totalEntries)} of {totalEntries} entries
      </div>
      <div className="flex">
        <button
          className="px-4 py-2 mr-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={handlePrevPage}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span className="mt-1">{currentPage} of {totalPages}</span>
        <button
          className="px-4 py-2 ml-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Pagination;
