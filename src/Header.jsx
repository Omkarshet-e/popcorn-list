import "./index.css";
function Header({ totalResults, query, setQuery }) {
  function handleSearch(e) {
    setQuery(e.target.value);
  }
  return (
    <header>
      <div className="container">
        <div className="header">
          <div className="left-container">
            <h1 className="logo"> POPCORN LIST 🍿</h1>
            <input
              value={query}
              onChange={handleSearch}
              type="text"
              className="search-query"
              placeholder="Search Movies ..."
            />
          </div>
          {totalResults ? (
            <p className="totalResults">
              Found <span style={{ fontWeight: "800" }}>{totalResults}</span>{" "}
              Results{" "}
            </p>
          ) : (
            ""
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
