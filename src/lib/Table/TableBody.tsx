/**
 *
 * @component
 * @name TableBody
 * @description Represents the table body that displays the data rows.
 * @template TItem - The type of items in the table.
 * @param {Object} props - The component props.
 * @param {TItem[]} props.items - The array of items to be rendered in the table.
 * @returns {JSX.Element} The rendered TableBody component.
 *
 */

import { ItemRecord } from './types';

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
      // For Date object we display only the dd-MM-YYY part
      return (property as Date).toLocaleString().split(' ')[0];
    }
  };

  // Loop through each item
  // Then loop through each property of the item
  return (
    <tbody className="text-sm text-gray-800">
      {items.map((item, index) => {
        return (
          <tr key={index} className="even:bg-slate-50">
            {Object.keys(item).map((property, index) => (
              <td key={index} className="p-2 whitespace-nowrap">
                {renderCellProperty(item[property])}
              </td>
            ))}
          </tr>
        );
      })}
    </tbody>
  );
};

export default TableBody;
