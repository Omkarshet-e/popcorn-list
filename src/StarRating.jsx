import { useState } from "react";

function StarRating({ activeMovieId, setListIds, setUserRating, listIds }) {
  const [rating, setRating] = useState("N/A");
  const [tempRating, setTempRating] = useState(null);

  // const isAdded = listIds.map((obj) => obj.id).includes(activeMovieId);

  function handleAddToList() {
    // console.log(listIds, isAdded);
    if (rating === "N/A") {
      window.alert("Rate the movie to add to list");
      return;
    } else {
      setListIds((arr) => {
        // console.log(arr);
        return [...arr, { id: activeMovieId, rating }];
      });
      setUserRating(rating);
    }
  }

  return (
    <div className="rating-container">
      <div className="stars">
        {Array.from({ length: 10 }).map((_, i) => {
          return (
            <StarIcon
              i={i}
              fill={(tempRating || rating) > i}
              setRating={setRating}
              setTempRating={setTempRating}
              // isAdded={isAdded}
              key={i}
            />
          );
        })}
        <div className="userRating">
          <p>{tempRating || rating}</p>
        </div>
      </div>
      <button
        onClick={handleAddToList}
        className="button"
        // disabled={isAdded}
      >
        Add to List
      </button>
    </div>
  );
}

export default StarRating;

function StarIcon({ i, setRating, fill, setTempRating }) {
  //   console.log(i);
  return (
    <svg
      onMouseEnter={() => setTempRating(i + 1)}
      onMouseLeave={() => setTempRating(null)}
      onClick={() => setRating(i + 1)}
      className="star"
      fill={fill ? "yellow" : ""}
      stroke="yellow"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
      ></path>
    </svg>
  );
}
