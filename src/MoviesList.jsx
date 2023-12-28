import MoviesContainer from "./MoviesContainer";
import Movie from "./Movie";
import { useState, useEffect } from "react";
function MoviesList({
  query,
  setTotalResults,
  setActiveMovieId,
  activeMovieId,
}) {
  const [movies, setMovies] = useState([]);

  function handleMovieSelect(id) {
    setActiveMovieId(id);
  }

  useEffect(() => {
    if (movies?.length) setTotalResults(movies.length);

    return () => {
      setTotalResults("");
    };
  }, [movies, setTotalResults]);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    async function getMovies() {
      try {
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=7da494ae&s=${query}`,
          { signal }
        );
        const data = await res.json();
        setMovies(data.Search);
        setActiveMovieId(null);
        //
      } catch (error) {
        console.log(error.message);
      }
    }

    getMovies();

    return () => controller.abort();
  }, [query, setActiveMovieId]);

  return (
    <section className="list">
      <MoviesContainer>
        {movies?.map((obj) => {
          return (
            <Movie
              activeMovieId={activeMovieId}
              onSelect={handleMovieSelect}
              title={obj.Title}
              year={obj.Year}
              imdbID={obj.imdbID}
              poster={obj.Poster}
              //   totalResults={movies.length}
              key={obj.imdbID}
            />
          );
        })}
      </MoviesContainer>
    </section>
  );
}

export default MoviesList;
