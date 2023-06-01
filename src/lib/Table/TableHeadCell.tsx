/**
 * TableHeadCell Component
 * This component represents a table header cell with sorting functionality.
 * It displays a label for the cell and a sort indicator that changes based on the current sort key and order.
 * When clicked, it triggers the onSort callback with the corresponding name of the cell.
 *
 * @component
 * @name TableHeadCell
 * @description Represents a table header cell with sorting functionality.
 * @param {Object} props - The component props.
 * @param {string} props.label - The label to display in the table header cell.
 * @param {string} props.name - The name or identifier of the cell.
 * @param {SortOrderType} props.sortOrder - The current sort order ('asc' or 'desc').
 * @param {string} props.sortKey - The current sort key.
 * @param {boolean} props.isActive - Indicates if the current cell is active or not.
 * @param {Function} props.onSort - The callback function to handle sorting when the cell is clicked.
 * @returns {JSX.Element} The rendered TableHeadCell component.
 *
 */

import { SortOrderType } from './types';

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
    <th className="font-semibold tracking-wide text-gray-600 p-2 min-w-fit whitespace-nowrap">
      <button
        className={`hover:text-black hover:cursor-pointer  flex gap-2 items-center ${
          isActive ? ' text-black' : ''
        }`}
        onClick={() => onSort(name)}
      >
        {label}
        <span
          className={`w-10 text-left ${
            isActive ? ' text-black' : 'text-gray-300'
          } `}
        >
          {renderSortIndicator()}
        </span>
      </button>
    </th>
  );
};

export default TableHeadCell;
