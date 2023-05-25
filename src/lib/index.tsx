export default function HelloWorld(props: { greetee?: string }) {
  const { greetee = 'World' } = props;

  return <div className="bg-green-500 text-2xl">Hello, {greetee}!</div>;
}
