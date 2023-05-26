import { useState } from 'react';
import TableHead from './TableHead';
import TableBody from './TableBody';

// Import functions to sort, search
import { sortArrayByProperty } from './utils';

// Type exports for components
export type SortOrderType = 'asc' | 'desc';

export type HeaderType = {
  name: string;
  label: string;
};

export type ItemRecord = Record<string, unknown>;

// Type props
type TableProps<TItem> = {
  headers: HeaderType[];
  items: TItem[];
};

// Main Table component
const Table = <TItem extends ItemRecord>({
  headers,
  items,
}: TableProps<TItem>) => {
  const [sortedItems, setSortedItems] = useState<TItem[]>(items);

  const handleSort = (sortKey: string, sortOrder: SortOrderType) => {
    try {
      const isAscending = sortOrder === 'asc';
      const sorted = sortArrayByProperty(
        [...sortedItems],
        sortKey as keyof TItem, // infer
        isAscending
      );
      setSortedItems(sorted);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="flex justify-between">
        <p>entries</p>
        <p>search</p>
      </div>
      <div className="border shadow-lg p-10">
        <table className="w-full ">
          <TableHead headers={headers} onSort={handleSort} />
          <TableBody<TItem> items={sortedItems} />
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
