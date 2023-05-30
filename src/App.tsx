import { Table } from './lib';
import { UserType, headers, users } from './mock/data';
const App = () => {
  return (
    <main className="container mx-auto my-8">
      <h1 className="text-3xl">Test ja-react-table component</h1>
      <Table<UserType> headers={headers} items={users} sortBy="dateOfBirth" />
    </main>
  );
};

export default App;
