// import HelloWorld from './lib';

// const App = () => {
//   return <HelloWorld greetee={'Universe'} />;
// };

import { Table } from './lib';

const headers = [
  { name: 'firstName', label: 'First name' },
  { name: 'lastName', label: 'Last name' },
  { name: 'dateOfBirth', label: 'Date of birth' },
];

const App = () => {
  return (
    <main className="container mx-auto my-8">
      <h1 className="text-3xl">Test React Table</h1>
      <Table headers={headers} />
    </main>
  );
};

export default App;
