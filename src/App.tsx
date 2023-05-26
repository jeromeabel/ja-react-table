import { Table } from './lib';
import { UserType, headers, users } from './data';

const App = () => {
  return (
    <main className="container mx-auto my-8">
      <h1 className="text-3xl">Test React Table</h1>
      <Table<UserType> headers={headers} items={users} />
    </main>
  );
};

export default App;
