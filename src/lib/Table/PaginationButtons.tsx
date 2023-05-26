type PaginationButtonsProps = {
  currentPage: number;
  totalPages: number;
  onChange: (page: number) => void;
};

const PaginationButtons = ({
  currentPage,
  totalPages,
  onChange,
}: PaginationButtonsProps) => {
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      onChange(page);
    }
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      const isActive = i === currentPage;
      pageNumbers.push(
        <button
          className={`p-2 border hover:cursor-pointer ${
            isActive ? 'border-black' : 'border-transparent'
          }`}
          key={i}
          onClick={() => handlePageChange(i)}
          disabled={isActive}
        >
          {i}
        </button>
      );
    }
    return pageNumbers;
  };

  const renderButton = (
    label: string,
    onClick: () => void,
    isDisabled: boolean
  ) => (
    <button
      className={`p-2 border ${
        isDisabled ? 'opacity-50' : 'hover:cursor-pointer hover:border-black'
      }`}
      onClick={onClick}
    >
      {label}
    </button>
  );

  return (
    <nav className="flex gap-8">
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
