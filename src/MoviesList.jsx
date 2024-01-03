import MoviesContainer from "./MoviesContainer";
import Movie from "./Movie";
import { useState, useEffect } from "react";
import Error from "./Error";
import Loader from "./Loader";
function MoviesList({
  query,
  setTotalResults,
  setActiveMovieId,
  activeMovieId,
}) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsloading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

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
      setIsloading(true);
      try {
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=7da494ae&s=${query}`,
          { signal }
        );
        const data = await res.json();
        if (data.Response === "False" && data.Error !== "Incorrect IMDb ID.") {
          setIsError(true);
          if (data.Error === "Movie not found!") {
            setErrorMsg(data.Error);
          } else if (data.Error === "Too many results.") {
            setErrorMsg(data.Error);
          }
        } else {
          setIsError(false);
          setMovies(data.Search);
          setActiveMovieId(null);
        }
        //
      } catch (error) {
        console.log(error.message);
      } finally {
        setIsloading(false);
      }
    }

    getMovies();

    return () => controller.abort();
  }, [query, setActiveMovieId]);

  return (
    <section className="list">
      <MoviesContainer>
        {isLoading && <Loader />}
        {!isLoading && isError && <Error msg={errorMsg} />}
        {!isLoading &&
          !isError &&
          movies?.map((obj) => {
            return (
              <Movie
                activeMovieId={activeMovieId}
                onSelect={handleMovieSelect}
                title={obj.Title}
                year={obj.Year}
                imdbID={obj.imdbID}
                poster={obj.Poster}
                key={obj.imdbID}
              />
            );
          })}
      </MoviesContainer>
    </section>
  );
}

export default MoviesList;
