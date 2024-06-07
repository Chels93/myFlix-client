import PropTypes from "prop-types";

export const MovieCard = ({ movie, onMovieClick }) => {
  return (
    <div key={movie.id}>
      <h3>{movie.title}</h3>
      <p>Synopsis: {movie.synopsis}</p>
      <button onClick={() => onMovieClick(movie)}>View Details</button>
    </div>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    imagePath: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    synopsis: PropTypes.string.isRequired,
    year: PropTypes.string.isRequired,
    genre: PropTypes.shape({
      name: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
    }).isRequired,
    director: PropTypes.shape({
      name: PropTypes.string.isRequired,
      bio: PropTypes.string.isRequired,
      birthyear: PropTypes.string,
      deathyear: PropTypes.string,
    }).isRequired,
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired,
};
