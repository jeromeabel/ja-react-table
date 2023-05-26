import { ItemRecord } from './Table';

type TableBodyProps<TItem> = {
  items: TItem[];
};

const TableBody = <TItem extends ItemRecord>({
  items,
}: TableBodyProps<TItem>) => {
  // Check the type of property to output the corresponding string
  const renderCellProperty = (property: unknown) => {
    if (typeof property !== 'object' || !(property instanceof Date)) {
      return String(property);
    } else {
      return (property as Date).toLocaleString().split(' ')[0];
    }
  };

  // Loop through each item
  // Then loop through each property of the item
  return (
    <tbody className="text-sm text-gray-700">
      {items.map((item, index) => {
        return (
          <tr key={index} className="even:bg-slate-50">
            {Object.keys(item).map((property, index) => (
              <td key={index}>{renderCellProperty(item[property])}</td>
            ))}
          </tr>
        );
      })}
    </tbody>
  );
};

export default TableBody;
