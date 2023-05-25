export default function HelloWorld(props: { greetee?: string }) {
  const { greetee = 'World' } = props;

  return <div>Hello, {greetee}!</div>;
}
