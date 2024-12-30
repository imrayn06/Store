const SearchInput = ({ setQuery }) => {
  return (
    <div className="relative">
      <input
        type="search"
        name="search"
        id="search"
        placeholder="Search Items..."
        className="search"
        onChange={(e) => setQuery(e.target.value)}
      />
    </div>
  );
};

export default SearchInput;
