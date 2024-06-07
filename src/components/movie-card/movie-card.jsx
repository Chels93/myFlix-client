import PropTypes from "prop-types";

export const MovieCard = ({ movie, onMovieClick }) => {
  return (
    <div>
      <div>{movie.title}</div>
      <div>{movie.synopsis}</div>
      <div>{movie.year}</div>
      <div>{movie.genre.name}</div>
      <div>{movie.genre.description}</div>
      <div>{movie.director.name}</div>
      <div>{movie.director.bio}</div>
      {movie.director.birthyear && <div>{movie.director.birthyear}</div>}
      {movie.director.deathyear && <div>{movie.director.deathyear}</div>}
      <img
        src={movie.imagePath}
        alt={movie.title}
        onClick={() => onMovieClick(movie)}
      />
    </div>
  );
};

