import { SortOrderType } from './Table';

type TableHeadCellProps = {
  label: string;
  name: string;
  sortOrder: SortOrderType;
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
    <th className="font-semibold tracking-wide">
      <button
        className={`hover:text-fuchsia-600 hover:cursor-pointer flex gap-2 items-center ${
          isActive ? ' text-fuchsia-600' : ''
        }`}
        onClick={() => onSort(name)}
      >
        {label}
        {renderSortIndicator()}
      </button>
    </th>
  );
};

export default TableHeadCell;
