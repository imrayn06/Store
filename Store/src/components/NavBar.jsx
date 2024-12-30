import SearchInput from "./SearchInput";

const NavBar = ({ setQuery }) => {
  return (
    <nav>
      <h1 className="text-2xl font-bold">Store</h1>
      <SearchInput setQuery={setQuery} />
    </nav>
  );
};

export default NavBar;
