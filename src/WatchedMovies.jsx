import MoviesContainer from "./MoviesContainer";
import WatchListDetails from "./WatchListDetails";
import StarRating from "./StarRating";
import { useEffect, useState } from "react";
import Loader from "./Loader";
// import Movie from "./Movie";
function WatchedMovies({ activeMovieId, setActiveMovieId }) {
  const [userList, setUserList] = useState([]);
  const [userRating, setUserRating] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <section className="watched">
      <MoviesContainer>
        {!activeMovieId && userList.length ? (
          <div>
            <WatchListDetails userList={userList} />
            {userList.map((obj) => {
              return (
                <ListAddedMovie
                  setUserList={setUserList}
                  poster={obj.poster}
                  title={obj.title}
                  key={obj.imdbID}
                  userRating={obj.userRating}
                  imdbRating={obj.rating}
                />
              );
            })}
          </div>
        ) : !activeMovieId ? (
          <WatchListDetails userList={userList} />
        ) : (
          <ShowDetails
            userRating={userRating}
            setUserRating={setUserRating}
            activeMovieId={activeMovieId}
            setActiveMovieId={setActiveMovieId}
            setUserList={setUserList}
            key={activeMovieId}
            setIsLoading={setIsLoading}
            isLoading={isLoading}
          />
        )}
      </MoviesContainer>
    </section>
  );
}

export default WatchedMovies;

function ListAddedMovie({
  setUserList,
  poster,
  title,
  userRating,
  imdbRating,
}) {
  function handleEditWatchlist() {
    setUserList((arr) => {
      return arr.filter((obj) => obj.title !== title);
    });
  }
  return (
    <>
      <div className="movie-container">
        <div className="poster">
          <img
            src={poster !== "N/A" ? poster : "../backup-img.jpg"}
            alt={`Poster for ${title}`}
          />
        </div>
        <div className="details">
          <h2>{title}</h2>
          <div>
            <p style={{ padding: "0.9rem 0" }}>
              Your Rating : - {userRating} 🌟
            </p>

            <p>IMDb Rating : - {imdbRating} ⭐</p>
          </div>
        </div>
        <div className="btn-remove">
          <button onClick={handleEditWatchlist}>X</button>
        </div>
      </div>
    </>
  );
}

function ShowDetails({
  activeMovieId,
  setActiveMovieId,
  setUserList,
  setUserRating,
  userRating,
  setIsLoading,
  isLoading,
}) {
  const [movieDetails, setMovieDetails] = useState(null);
  const [listIds, setListIds] = useState([]);

  function handleMovieDeselect() {
    setActiveMovieId(null);
  }

  useEffect(() => {
    setIsLoading(true);
    async function getMovieById() {
      try {
        const res = await fetch(
          `https://www.omdbapi.com/?apikey=7da494ae&i=${activeMovieId}`
        );
        const data = await res.json();
        setMovieDetails(data);
        setIsLoading(false);
      } catch (error) {
        console.log("error");
      }
    }
    getMovieById();
  }, [activeMovieId, setIsLoading]);
  const {
    Actors: actors,
    Director: director,
    Genre: genre,
    Plot: plot,
    Poster: poster,
    Released: released,
    Year: year,
    Runtime: runtime,
    Title: title,
    imdbRating: rating,
    imdbID,
  } = movieDetails ?? {};

  useEffect(() => {
    if (listIds.length === 0) return;
    const obj = {
      title,
      poster,
      year,
      imdbID,
      rating,
      userRating,
      runtime,
    };
    setActiveMovieId(null);

    setUserList((arr) => {
      const isAdded = arr.map((obj) => obj.imdbID).includes(imdbID);
      if (isAdded) {
        const newR = obj.userRating;
        return arr.map((obj) => {
          if (obj.imdbID === imdbID) {
            obj.userRating = newR;
          }
          return obj;
        });
      } else {
        return [...arr, obj];
      }
    });
  }, [
    runtime,
    userRating,
    listIds,
    poster,
    title,
    year,
    setUserList,
    imdbID,
    setActiveMovieId,
    rating,
  ]);

  return isLoading ? (
    <Loader />
  ) : (
    <div className="movie-details-container">
      <div className="movie-card">
        <div className="img-container">
          <img
            src={poster !== "N/A" ? poster : "../backup-img.jpg"}
            alt={`Poster for ${title}`}
          />
        </div>
        <div className="movie-details">
          <h2 className="title">{title}</h2>
          <p className="runtime">
            {released} . {runtime}
          </p>
          <p className="genre">{genre}</p>
          <p className="rating">⭐ {rating} IMDb Rating</p>
        </div>
      </div>
      <div className="synopsis">
        <StarRating
          listIds={listIds}
          setListIds={setListIds}
          key={title}
          setUserRating={setUserRating}
        />
        <p className="plot">Plot : - {plot}</p>
        <p className="actors">Starring Actors : - {actors}</p>
        <p className="director">Directed by : - {director}</p>
      </div>
      <div onClick={handleMovieDeselect} className="btn-back">
        ⬅️
      </div>
    </div>
  );
}
