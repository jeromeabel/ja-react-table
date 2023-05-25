import { useState } from 'react';

import TableHead from './TableHead';
import TableBody from './TableBody';
import { HeaderType } from './types';

type TableProps = {
  headers: HeaderType[];
};

const Table = ({ headers }: TableProps) => {
  const handleSort = (sortKey: string, sortOrder: 'asc' | 'desc') => {
    console.log(sortKey, sortOrder);
  };

  return (
    <div className="my-8">
      <div className="flex justify-between">
        <p>entries</p>
        <p>search</p>
      </div>
      <div className="my-10 rounded-lg shadow-lg overflow-auto">
        <table className="w-full">
          <TableHead headers={headers} onSort={handleSort} />
          <TableBody />
        </table>
      </div>
      <div className="flex justify-between">
        <div>Showing</div>
        <div>Pagination</div>
      </div>
    </div>
  );
};

export default Table;
