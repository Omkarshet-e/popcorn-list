import Header from "./Header";
import Main from "./Main";
import MoviesList from "./MoviesList";
import WatchedMovies from "./WatchedMovies";
import { useState } from "react";
function App() {
  const [query, setQuery] = useState("");
  const [totalResults, setTotalResults] = useState("");
  const [activeMovieId, setActiveMovieId] = useState(null);
  return (
    <div className="App">
      <Header query={query} totalResults={totalResults} setQuery={setQuery} />
      <Main>
        <MoviesList
          setActiveMovieId={setActiveMovieId}
          activeMovieId={activeMovieId}
          setTotalResults={setTotalResults}
          query={query}
        />
        <WatchedMovies
          activeMovieId={activeMovieId}
          setActiveMovieId={setActiveMovieId}
        />
      </Main>
    </div>
  );
}

export default App;
