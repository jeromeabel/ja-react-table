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

// Loop through each properties of the object T
export const filterItemsBySearchTerm = <T extends Record<string, unknown>>(
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
