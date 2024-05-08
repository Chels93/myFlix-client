import React from "react";

export const MovieCard = ({ movie, onMovieClick }) => {
    const { title, synopsis, year, director, genre } = movie; 

  return (
    <div onClick={() => onMovieClick(movie)}>
        <h2>{title}</h2>
        {synopsis && (
            <p>
                Synopsis: {synopsis}
            </p>
        )}
        {year && (
            <p>
                Release Year: {year}
            </p>
        )}
        {director && (
            <p>
                Director: {director.name} {director.bio} {director.birthyear} {director.deathyear}
            </p>
        )}
        {genre && (
            <p>
                Genre: {genre.name} {genre.description}
            </p>
        )} 
    </div>
  );
};
