import { useState, useMemo } from 'react';
import TableHead from './TableHead';
import TableBody from './TableBody';
import InputEntries from './InputEntries';
import InputSearch from './InputSearch';
import Error from './Error';
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
  const [searchTerm, setSearchTerm] = useState('');
  const [entriesPerPage, setEntriesPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  const paginatedItems = useMemo(() => {
    const startEntry = (currentPage - 1) * entriesPerPage;
    const endEntry = Math.min(startEntry + entriesPerPage, sortedItems.length);
    const dataSlice = sortedItems.slice(startEntry, endEntry);
    return {
      data: dataSlice,
      startEntry,
      endEntry,
      totalEntries: sortedItems.length,
    };
  }, [sortedItems, currentPage, entriesPerPage]);

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

  const handleEntries = (nbEntries: number) => {
    const currentEntryIndex = (currentPage - 1) * entriesPerPage;
    const newPageNumber = Math.floor(currentEntryIndex / nbEntries) + 1;
    setEntriesPerPage(nbEntries);
    setCurrentPage(newPageNumber); // find the accurate page number
  };

  let startEntry = paginatedItems.startEntry + 1;
  if (paginatedItems.totalEntries === 0) startEntry = 0;

  return (
    <div className="flex flex-col gap-8">
      <div className="flex justify-between">
        <InputEntries onChange={handleEntries} />
        {/*<InputSearch onChange={handleSearch} /> */}
      </div>
      <div className="border shadow-lg p-10">
        {items.length === 0 ? (
          <Error />
        ) : (
          <table className="w-full ">
            <TableHead headers={headers} onSort={handleSort} />
            <TableBody<TItem> items={paginatedItems.data} />
          </table>
        )}
      </div>
      <div className="flex justify-between">
        <div>
          Showing {startEntry} to {paginatedItems.endEntry} of{' '}
          {paginatedItems.totalEntries} entries
        </div>
        {/*
        <PaginationButtons
          currentPage={currentPage}
          totalPages={totalPages}
          onChange={handlePageChange}
        /> */}
      </div>
    </div>
  );
};

export default Table;
