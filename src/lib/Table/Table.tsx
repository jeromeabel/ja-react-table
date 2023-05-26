import { useState, useMemo } from 'react';

// Components
import TableHead from './TableHead';
import TableBody from './TableBody';
import InputEntries from './InputEntries';
import InputSearch from './InputSearch';
import Error from './Error';

// Import functions to sort, search
import { sortArrayByProperty, filterItemsBySearchTerm } from './utils';

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
  const [searchTerm, setSearchTerm] = useState('');
  const [entriesPerPage, setEntriesPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortKey, setSortKey] = useState('');
  const [sortOrder, setSortOrder] = useState<SortOrderType>('asc');

  // Memo functions: search, sort, pagination
  const filteredItems = useMemo(() => {
    return filterItemsBySearchTerm(items, searchTerm);
  }, [items, searchTerm]);

  const paginatedItems = useMemo(() => {
    const startEntry = (currentPage - 1) * entriesPerPage;
    const endEntry = Math.min(
      startEntry + entriesPerPage,
      filteredItems.length
    );
    let dataSlice = filteredItems.slice(startEntry, endEntry);

    if (sortKey) {
      // Check if sortKey is not empty
      dataSlice = sortArrayByProperty(dataSlice, sortKey, sortOrder === 'asc');
    }

    return {
      items: dataSlice,
      startEntry,
      endEntry,
      totalEntries: filteredItems.length,
    };
  }, [filteredItems, currentPage, entriesPerPage, sortKey, sortOrder]);

  const handleSort = (sortKey: string, sortOrder: SortOrderType) => {
    setSortKey(sortKey);
    setSortOrder(sortOrder);
  };

  const handleEntries = (nbEntries: number) => {
    const currentEntryIndex = (currentPage - 1) * entriesPerPage;
    const newPageNumber = Math.floor(currentEntryIndex / nbEntries) + 1;
    setEntriesPerPage(nbEntries);
    setCurrentPage(newPageNumber);
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setCurrentPage(1);
  };

  let startEntry = paginatedItems.startEntry + 1;
  if (paginatedItems.totalEntries === 0) startEntry = 0;

  const hasItems = items.length > 0;
  const hasFilteredItems = filteredItems.length > 0;

  return (
    <div className="flex flex-col gap-8">
      <div className="flex justify-between">
        <InputEntries onChange={handleEntries} />
        <InputSearch onChange={handleSearch} />
      </div>
      <div className="border shadow-lg p-10">
        {!hasItems ? (
          <Error
            type="error"
            message="No items available. Please provide a set of data."
          />
        ) : !hasFilteredItems ? (
          <Error
            type="warning"
            message="No results found. Please try a different term."
          />
        ) : (
          <table className="w-full ">
            <TableHead headers={headers} onSort={handleSort} />
            <TableBody<TItem> items={paginatedItems.items} />
          </table>
        )}
      </div>
      <div className="flex justify-between">
        <div>
          Showing {startEntry} to {paginatedItems.endEntry} of{' '}
          {paginatedItems.totalEntries} entries
        </div>
        {/* <PaginationButtons
          currentPage={currentPage}
          totalPages={totalPages}
          onChange={handlePageChange}
        /> */}
      </div>
    </div>
  );
};

export default Table;
