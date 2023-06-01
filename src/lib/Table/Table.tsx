/**
 * Table is a React Table component written in TypeScript
 * It displays tabular data with sorting, searching, pagination, and error handling functionalities.
 *
 * @module
 * @param {Array} headers - An array of header objects defining the columns of the table.
 * @param {Array} items - An array of item objects representing the data rows of the table.
 * @param {string} [sortBy] - The key to sort the items by initially.
 * @returns {JSX.Element} The rendered Table component.
 *
 * @example
 * `<Table<ItemType> headers={headers} items={items} sortBy="dateOfBirth" />`
 *
 * Types:
 * The component uses generic has types for items of the array
 * Useful types are stored in types.ts
 *
 */

// Lib
import { useState, useMemo } from 'react';

// Components
import TableHead from './TableHead';
import TableBody from './TableBody';
import InputEntries from './InputEntries';
import InputSearch from './InputSearch';
import PaginationButtons from './PaginationButtons';
import Error from './Error';

// Import functions to sort, search
import { sortArrayByProperty, filterItemsBySearchTerm } from './utils';

// Import types
import { SortOrderType, HeaderType, ItemRecord } from './types';

// Props for the Table component
type TableProps<TItem> = {
  headers: HeaderType[]; // Array of table headers (columns)
  items: TItem[]; // Array of table items (rows)
  sortBy?: keyof TItem; // Property to sort the items by (optional)
};

// Main Table component
const Table = <TItem extends ItemRecord>({
  headers,
  items,
  sortBy,
}: TableProps<TItem>) => {
  // States to handle all features : sorting, search and pagination
  const [searchTerm, setSearchTerm] = useState('');
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortKey, setSortKey] = useState(sortBy);
  const [sortOrder, setSortOrder] = useState<SortOrderType>('asc');

  // Memoized search results
  const filteredItems = useMemo(() => {
    return filterItemsBySearchTerm(items, searchTerm);
  }, [items, searchTerm]);

  /**
   * Memoized pagination and sorting.
   * Calculates the paginated items based on the current page, entries per page, and applied sorting.
   *
   * @returns {Object} An object containing the paginated items, start and end entry indices, and the total number of filtered items.
   */
  const paginatedItems = useMemo(() => {
    // Calculate the start and end entry indices based on the current page and entries per page.
    const startEntry = (currentPage - 1) * entriesPerPage;
    const endEntry = Math.min(
      startEntry + entriesPerPage,
      filteredItems.length
    );

    // Slice the filtered items array to get the current page's data slice.
    let dataSlice = filteredItems.slice(startEntry, endEntry);

    // Apply sorting if the sortKey is provided.
    // Test if the sortKey is non-empty and a valid key of the array.
    if (sortKey) {
      try {
        dataSlice = sortArrayByProperty(
          dataSlice,
          sortKey,
          sortOrder === 'asc'
        );
      } catch (err) {
        console.error(err);
      }
    }

    // Return an object with the paginated items,
    // start and end entry indices, and the total number of filtered items.
    return {
      items: dataSlice,
      startEntry,
      endEntry,
      totalEntries: filteredItems.length,
    };
  }, [filteredItems, currentPage, entriesPerPage, sortKey, sortOrder]);

  // Memoized total of pages computation
  const totalPages = useMemo(() => {
    return Math.ceil(paginatedItems.totalEntries / entriesPerPage);
  }, [paginatedItems.totalEntries, entriesPerPage]);

  /**
   * Event handler for sorting the table
   * @param {string} sortKey - The key to sort the items by
   * @param {SortOrderType} sortOrder - The sort order (asc or desc)
   */
  const handleSort = (sortKey: string, sortOrder: SortOrderType) => {
    setSortKey(sortKey);
    setSortOrder(sortOrder);
  };

  /**
   * Event handler for changing the number of entries per page
   * @param {number} nbEntries - The number of entries per page
   */
  const handleEntries = (nbEntries: number) => {
    const currentEntryIndex = (currentPage - 1) * entriesPerPage;
    const newPageNumber = Math.floor(currentEntryIndex / nbEntries) + 1;
    setEntriesPerPage(nbEntries);
    setCurrentPage(newPageNumber);
  };

  /**
   * Event handler for searching the table
   * @param {string} term - The search term
   */
  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setCurrentPage(1); // Reset page
  };

  /**
   * Event handler for changing the current page
   * @param {number} page - The new current page number
   */

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Calculate the starting entry number for the current page
  // Handle the specific case when data are empty
  let startEntry = paginatedItems.startEntry + 1;
  if (paginatedItems.totalEntries === 0) startEntry = 0;

  // Check if there are any items in the table
  // Used to display error messages
  const hasItems = items.length > 0;
  const hasFilteredItems = filteredItems.length > 0;

  // Rendering section
  return (
    <div className="flex flex-col gap-4 lg:gap-8 w-full">
      <div className="flex flex-col gap-4 lg:flex-row justify-between">
        <InputEntries onChange={handleEntries} />
        <InputSearch onChange={handleSearch} />
      </div>
      <div className="border shadow-lg rounded p-0 lg:p-2 overflow-auto">
        {!hasItems ? (
          <Error type="error" message="No items available." />
        ) : !hasFilteredItems ? (
          <Error type="warning" message="No results found." />
        ) : (
          <table className="w-full">
            <TableHead headers={headers} onSort={handleSort} />
            <TableBody<TItem> items={paginatedItems.items} />
          </table>
        )}
      </div>
      <div className="flex flex-col gap-4 lg:flex-row justify-between">
        <div>
          Showing {startEntry} to {paginatedItems.endEntry} of{' '}
          {paginatedItems.totalEntries} entries
        </div>
        <PaginationButtons
          currentPage={currentPage}
          totalPages={totalPages}
          onChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default Table;
