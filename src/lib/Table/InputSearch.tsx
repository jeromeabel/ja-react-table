type InputSearchProps = {
  onChange: (term: string) => void;
};

const InputSearch = ({ onChange }: InputSearchProps) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const term = event.target.value;
    onChange(term); //if (term.length > 0)
  };

  return (
    <div className="flex gap-4 items-center">
      <label
        htmlFor="searchInput"
        aria-label="Filter the data with a search term"
      >
        Search:
      </label>
      <input
        className="p-2 border"
        id="searchInput"
        type="text"
        placeholder="..."
        onChange={handleChange}
      />
    </div>
  );
};

export default InputSearch;
