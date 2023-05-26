import { useState } from 'react';

import { HeaderType, SortOrderType } from './Table';
import TableHeadCell from './TableHeadCell';

type TableHeadProps = {
  headers: HeaderType[];
  onSort: (sortKey: string, sortOrder: SortOrderType) => void;
};

const TableHead = ({ headers, onSort }: TableHeadProps) => {
  const [sortKey, setSortKey] = useState<string>('');
  const [sortOrder, setSortOrder] = useState<SortOrderType>('asc');

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
