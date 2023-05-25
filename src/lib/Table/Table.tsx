import { useState } from 'react';
import TableHead from './TableHead';
import TableBody from './TableBody';
import { HeaderType } from './types';

type UserType = {
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
};

type TableProps = {
  headers: HeaderType[];
  data: UserType[];
};

const Table = ({ headers, data }: TableProps) => {
  // const handleSort = (sortKey: string, sortOrder: 'asc' | 'desc') => {
  //   console.log(sortKey, sortOrder);
  //   // ToDO sort data
  // };

  const [sortedData, setSortedData] = useState<UserType[]>(data);

  const handleSort = (sortKey: keyof UserType, sortOrder: 'asc' | 'desc') => {
    const sorted = trierTableau([...sortedData], sortKey);
    if (sortOrder === 'desc') {
      sorted.reverse();
    }
    setSortedData(sorted);
  };

  function trierTableau<T>(tableau: T[], propriete: keyof T): T[] {
    return tableau.sort((a, b) => {
      if (a[propriete] < b[propriete]) {
        return -1;
      }
      if (a[propriete] > b[propriete]) {
        return 1;
      }
      return 0;
    });
  }

  return (
    <div className="my-8">
      <div className="flex justify-between">
        <p>entries</p>
        <p>search</p>
      </div>
      <div className="my-10 rounded-lg shadow-lg overflow-auto">
        <table className="w-full">
          <TableHead headers={headers} onSort={handleSort} />
          <TableBody data={sortedData} />
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
