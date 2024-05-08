import React from "react";

export const MovieCard = ({ movie, onMovieClick }) => {
    const { title, synopsis, director } = movie; 

  return (
    <div onClick={() => onMovieClick(movie)}>
        <h2>{movie.title}</h2>
        <p>{movie.synopsis}</p>
        <p>Director: {director.name} {director.bio} {director.birthyear} {director.deathyear}</p>
    </div>
  );
};
