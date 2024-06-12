import PropTypes from "prop-types";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import "./movie-view.scss";

export const MovieView = ({ movies, onBackClick }) => {
  const { movie_id } = useParams();

  const movie = movies.find((m) => m._id === movie_id);

  // Check if movies array is empty or null
  if (!movie || movie.length === 0) {
    return <div>No movie found!</div>;
  }

  return (
    <div>
      <div>
        <img
          src={movie.imagePath}
          alt={`${movie.title} poster`}
          style={{
            width: "auto",
            height: "auto",
            display: "block",
            margin: "0 auto",
          }}
        />
      </div>
      <div>
        <span>Title: </span>
        <span>{movie.title}</span>
      </div>
      <div>
        <span>Synopsis: </span>
        <span>{movie.synopsis}</span>
      </div>
      <div>
        <span>Release Year: </span>
        <span>{movie.year}</span>
      </div>
      <div>
        <span>Genre: </span>
        <span>{movie.genre.name}</span>
      </div>
      <div>
        <span>Genre Description: </span>
        <span>{movie.genre.description}</span>
      </div>
      <div>
        <span>Director: </span>
        <span>{movie.director.name}</span>
      </div>
      <div>
        <span>Director Bio: </span>
        <span>{movie.director.bio}</span>
      </div>
      <div>
        <span>Director Birthyear: </span>
        <span>{movie.director.birthYear}</span>
      </div>
      <div>
        <span>Director Deathyear: </span>
        <span>{movie.director.deathYear}</span>
      </div>
      <Link to={`/`}>
        <button
          onClick={onBackClick}
          className="back-button"
          style={{ cursor: "pointer" }}
        >
          Back
        </button>
      </Link>
    </div>
  );
};

MovieView.propTypes = {
  movie: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
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
        birthYear: PropTypes.string,
        deathYear: PropTypes.string,
      }).isRequired,
    })
  ).isRequired,
  onBackClick: PropTypes.func.isRequired,
};
