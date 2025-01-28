const Search = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="search">
      <div className="">
        <img src="search.svg" alt="search" />
        <input
          type="text"
          placeholder="Search movies..."
          value={searchTerm}
          onChange={(e) =>setSearchTerm(e.target.value)}
        />
      </div> 
    </div>
  );
};

export default Search;
