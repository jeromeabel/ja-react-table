import renderer from 'react-test-renderer';
import { describe, expect, test } from 'vitest';
import HelloWorld from './index';

describe('HelloWorld', () => {
  test('HelloWorld component renders correctly', () => {
    const component = renderer.create(<HelloWorld />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('The greetee prop works', () => {
    const component = renderer.create(<HelloWorld greetee={'Universel'} />);
    const tree = component.toJSON();
    console.log('TREE', tree);
    expect(tree).toMatchSnapshot();
  });
});
