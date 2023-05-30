/**
 * Sorts an array of objects by a specified property in either ascending or descending order.
 *
 * @template T - The type of objects in the array.
 * @param {T[]} arr - The array of objects to sort.
 * @param {keyof T} property - The property key to sort the objects by.
 * @param {boolean} isAscending - Determines whether the sorting order is ascending (true) or descending (false).
 * @returns {T[]} The sorted array of objects.
 * @throws {Error} If the specified property does not exist in the array objects.
 */
export const sortArrayByProperty = <T>(
  arr: T[],
  property: keyof T,
  isAscending: boolean
): T[] => {
  // Descending order
  const newData = [...arr].sort((a, b) => {
    if (!a[property]) {
      throw new Error(
        `The property "${property as string}" does not exist in the array.`
      );
    }
    return a[property] < b[property] ? 1 : -1;
  });

  // Ascending order
  if (isAscending) {
    newData.reverse();
  }
  return newData;
};

/**
 * Filters an array of objects based on a search term, which is matched against string property values.
 * The search method loop through each property of the array.
 *
 * @template T - The type of objects in the array.
 * @param {T[]} items - The array of objects to filter.
 * @param {string} searchTerm - The search term to match against string property values.
 * @returns {T[]} The filtered array of objects.
 */

import { ItemRecord } from './types';

export const filterItemsBySearchTerm = <T extends ItemRecord>(
  items: T[],
  searchTerm: string
): T[] => {
  return items.filter((item: T) =>
    Object.values(item).some(
      (value) =>
        typeof value === 'string' &&
        value.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );
};
