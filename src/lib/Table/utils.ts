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
