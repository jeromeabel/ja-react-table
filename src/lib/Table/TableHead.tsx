import { useState, useEffect } from 'react';

import { HeaderType } from './types';
import TableHeadCell from './TableHeadCell';

type UserType = {
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
};

interface TableHeadProps {
  headers: HeaderType[];
  // onSort: (key: string, sortOrder: 'asc' | 'desc') => void;
  onSort: (sortKey: keyof UserType, sortOrder: 'asc' | 'desc') => void;
}

const TableHead = ({ headers, onSort }: TableHeadProps) => {
  const [sortKey, setSortKey] = useState<string>('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const handleSort = (key: any) => {
    const newSortOrder =
      sortKey === key && sortOrder === 'asc' ? 'desc' : 'asc';
    setSortKey(key);
    setSortOrder(newSortOrder);
    onSort(key, newSortOrder);
  };

  return (
    <thead>
      <tr>
        {headers.map((header, index) => {
          const isActive = sortKey === header.name;
          return (
            <TableHeadCell
              key={index}
              name={header.name}
              sortKey={sortKey}
              label={header.label}
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
