/**
 * @component
 * @name InputEntries
 * @description Represents a dropdown input for selecting the number of entries to be displayed.
 * @param {Object} props - The component props.
 * @param {Function} props.onChange - The function called when the selected length changes.
 * @returns {JSX.Element} The rendered InputEntries component.
 */

type InputEntriesProps = {
  onChange: (length: number) => void;
};

const InputEntries = ({ onChange }: InputEntriesProps) => {
  // Event handler
  // Parse the input to an integer and send current value to parent component
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const inputValue = event.target.value;
    const parsedValue = parseInt(inputValue, 10); // integer
    if (!isNaN(parsedValue)) {
      onChange(parsedValue);
    }
  };

  return (
    <div className="flex gap-2 items-center">
      <label htmlFor="entriesSelect" aria-label="Select the number of entries">
        Show:
      </label>
      <select
        className="p-1 bg-slate-100 rounded"
        id="entriesSelect"
        onChange={handleChange}
      >
        <option>10</option>
        <option>25</option>
        <option>50</option>
        <option>100</option>
      </select>
      <span>entries</span>
    </div>
  );
};

export default InputEntries;
