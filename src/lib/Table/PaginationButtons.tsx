/**
 *
 * @component
 * @name PaginationButtons
 * @description Represents the pagination buttons for navigating between pages.
 * @param {Object} props - The component props.
 * @param {number} props.currentPage - The current active page.
 * @param {number} props.totalPages - The total number of pages.
 * @param {Function} props.onChange - The function called when the page changes.
 * @returns {JSX.Element} The rendered PaginationButtons component.
 */

// Type
type PaginationButtonsProps = {
  currentPage: number;
  totalPages: number;
  onChange: (page: number) => void;
};

// Component
const PaginationButtons = ({
  currentPage,
  totalPages,
  onChange,
}: PaginationButtonsProps) => {
  // Event handler
  // Change the page only in the correct range
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      onChange(page);
    }
  };

  // Function to render the page numbers buttons
  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      const isActive = i === currentPage;
      pageNumbers.push(
        <button
          className={`p-1 lg:p-2 border hover:cursor-pointer ${
            isActive ? 'border-black' : 'border-transparent'
          }`}
          key={i}
          onClick={() => handlePageChange(i)}
          disabled={isActive}
          aria-label={`Page ${i}`}
          aria-current={isActive}
        >
          {i}
        </button>
      );
    }
    return pageNumbers;
  };

  // Function to render the Next/Previous buttons
  const renderButton = (
    label: string,
    onClick: () => void,
    isDisabled: boolean
  ) => (
    <button
      className={`py-1 px-4 lg:p-2 border ${
        isDisabled ? 'opacity-50' : 'hover:cursor-pointer hover:border-black'
      }`}
      onClick={onClick}
      disabled={isDisabled}
    >
      {label}
    </button>
  );

  // Render
  return (
    <nav
      className="flex gap-1 lg:gap-2"
      aria-label="Pagination of the table element"
      id="olala"
    >
      {renderButton(
        'Previous',
        () => handlePageChange(currentPage - 1),
        currentPage === 1
      )}
      {renderPageNumbers()}
      {renderButton(
        'Next',
        () => handlePageChange(currentPage + 1),
        currentPage === totalPages
      )}
    </nav>
  );
};

export default PaginationButtons;
