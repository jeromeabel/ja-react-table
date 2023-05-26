import { Table } from './lib';

const headers = [
  { name: 'firstName', label: 'First name' },
  { name: 'lastName', label: 'Last name' },
  { name: 'dateOfBirth', label: 'Date of birth' },
];

type UserType = {
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
};

export const users: UserType[] = [
  {
    firstName: 'John',
    lastName: 'Doe',
    dateOfBirth: new Date('1980-01-01'),
  },
  {
    firstName: 'Jane',
    lastName: 'Smith',
    dateOfBirth: new Date('1985-02-10'),
  },
  {
    firstName: 'Michael',
    lastName: 'Johnson',
    dateOfBirth: new Date('1992-07-20'),
  },
  {
    firstName: 'Emily',
    lastName: 'Davis',
    dateOfBirth: new Date('1988-12-05'),
  },
];

const App = () => {
  return (
    <main className="container mx-auto my-8">
      <h1 className="text-3xl">Test React Table</h1>
      <Table<UserType> headers={headers} items={users} />
    </main>
  );
};

export default App;

/*
  Tableau - colonnes/lignes :
  - Tri
  - Search
  - Pagination
  
  */
