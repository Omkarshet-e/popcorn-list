// import { useEffect } from "react";

import { useState } from "react";

export default function Movie({
  title,
  year,
  imdbID,
  poster,
  onSelect,
  activeMovieId,
}) {
  const [hover, setHover] = useState(false);
  return (
    <div
      onClick={() => onSelect(imdbID)}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className={`movie-container ${
        activeMovieId === imdbID ? "active" : hover ? "active" : ""
      }`}
    >
      <div className="poster">
        <img
          src={poster !== "N/A" ? poster : "../backup-img.jpg"}
          alt={`Poster for ${title}`}
        />
      </div>
      <div className="details">
        <h2>{title}</h2>
        <p>Year: {year}</p>
      </div>
    </div>
  );
}
