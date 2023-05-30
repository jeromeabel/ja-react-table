// Export types

// Sort order must be 'asc' or 'desc' for ascending or descending order
export type SortOrderType = 'asc' | 'desc';

// The headers type (columns of the table)
export type HeaderType = {
  name: string;
  label: string;
};

// Type for generic item, useful for sorting data by the array's key
export type ItemRecord = Record<string, unknown>;
