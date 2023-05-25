type TableHeadCellProps = {
  label: string;
  name: string;
  sortOrder: 'asc' | 'desc';
  sortKey: string;
  isActive: boolean;
  onSort: (key: string) => void;
};

const TableHeadCell = ({
  label,
  name,
  sortKey,
  sortOrder,
  onSort,
  isActive,
}: TableHeadCellProps) => {
  const handleClick = () => {
    onSort(name);
  };

  const renderSortIndicator = () => {
    if (sortKey === name && sortOrder === 'asc') {
      return '▲';
    } else if (sortKey === name && sortOrder === 'desc') {
      return '▼';
    } else {
      return '▼▲';
    }
  };

  return (
    <th className="px-2 py-4 font-semibold tracking-wide">
      <button
        className={`hover:text-fuchsia-600 hover:cursor-pointer flex gap-2 items-center ${
          isActive ? ' text-fuchsia-600' : ''
        }`}
        onClick={handleClick}
      >
        {label}
        {renderSortIndicator()}
      </button>
    </th>
  );
};

export default TableHeadCell;
