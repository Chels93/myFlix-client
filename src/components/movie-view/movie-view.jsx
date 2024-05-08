import React from "react";

export const MovieView = ({ movie, onBackClick }) => {
    const {title, synopsis, year, director, genre } = movie;
  return (
    <div>
      <div>
        <img src={movie.image} alt={title} />
      </div>
      <div>
        <span>Title: </span>
        <span>{title}</span>
      </div>
      <div>
        <span>Synopsis: </span>
        <span>{synopsis}</span>
      </div>
      <div>
        <span>Release year: </span>
        <span>{year}</span>
      </div>
      <div>
        <span>Director: </span>
        <span>{director.name}</span>
      </div>
      <div>
        <span>Genre: </span>
        <span>{genre.name}</span>
      </div>
      <button onClick={onBackClick}>Back</button>
    </div>
  );
};
