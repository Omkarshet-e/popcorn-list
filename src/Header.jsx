import "./index.css";
function Header({ totalResults, query, setQuery }) {
  function handleSearch(e) {
    setQuery(e.target.value);
  }
  return (
    <header>
      <div className="container">
        <div className="header">
          <div style={{ display: "flex", gap: "4rem", alignItems: "center" }}>
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
            <p style={{ fontSize: "1.8rem" }}>
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
