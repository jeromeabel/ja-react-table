/**
 * @component
 * @name TableHead
 * @description Represents the table header row with sorting functionality.
 * @param {Object} props - The component props.
 * @param {HeaderType[]} props.headers - The array of header objects defining the table columns.
 * @param {Function} props.onSort - The callback function to handle sorting when a header cell is clicked.
 * @returns {JSX.Element} The rendered TableHead component.
 *
 */

// Lib
import { useState } from 'react';

// Types
import { HeaderType, SortOrderType } from './types';

// Cell
import TableHeadCell from './TableHeadCell';

// Props
type TableHeadProps = {
  headers: HeaderType[];
  onSort: (sortKey: string, sortOrder: SortOrderType) => void;
};

// Component
const TableHead = ({ headers, onSort }: TableHeadProps) => {
  const [sortKey, setSortKey] = useState<string>('');
  const [sortOrder, setSortOrder] = useState<SortOrderType>('asc');

  // Send onSort to parent component
  const handleSort = (key: string) => {
    const newSortOrder =
      sortKey === key && sortOrder === 'asc' ? 'desc' : 'asc';
    setSortKey(key);
    setSortOrder(newSortOrder);
    onSort(key, newSortOrder);
  };

  return (
    <thead className="border-b">
      <tr>
        {headers.map((header, index) => {
          const isActive = sortKey === header.name;
          return (
            <TableHeadCell
              key={index}
              name={header.name}
              label={header.label}
              sortKey={sortKey}
              sortOrder={sortOrder}
              isActive={isActive}
              onSort={handleSort}
            />
          );
        })}
      </tr>
    </thead>
  );
};

export default TableHead;
