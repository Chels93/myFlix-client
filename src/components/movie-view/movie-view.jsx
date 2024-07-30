import React, { useState } from "react";
import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";

export const MovieView = ({ movie, onAddToFavorites, onRemoveFromFavorites, isFavorite }) => {
  const navigate = useNavigate();
  const [favorite, setFavorite] = useState(isFavorite);

  if (!movie) {
    return null;
  }

  const handleBackClick = () => {
    navigate("/");
  };

  const handleFavoriteClick = () => {
    if (favorite) {
        onRemoveFromFavorites(movie._id);
        setFavorite(false);
    } else {
        onAddToFavorites(movie._id);
        setFavorite(true);
    }
};

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
        <span className="movie-title">Title: </span>
        <span>{movie.title}</span>
      </div>
      <div>
        <span ckassName="movie-title">Synopsis: </span>
        <span>{movie.synopsis}</span>
      </div>
      <div>
        <span className="movie-title">Release Year: </span>
        <span>{movie.year}</span>
      </div>
      <div>
        <span className="movie-title">Genre: </span>
        <span>{movie.genre.name}</span>
      </div>
      <div>
        <span className="movie-title">Genre Description: </span>
        <span>{movie.genre.description}</span>
      </div>
      <div>
        <span className="movie-title">Director: </span>
        <span>{movie.director.name}</span>
      </div>
      <div>
        <span className="movie-title">Director Bio: </span>
        <span>{movie.director.bio}</span>
      </div>
      <div>
        <span className="movie-title">Director Birthyear: </span>
        <span>{movie.director.birthYear}</span>
      </div>
      <div>
        <span className="movie-title">Director Deathyear: </span>
        <span>{movie.director.deathYear}</span>
      </div>
      <Button
        onClick={handleBackClick}
        className="back-button"
      >
        Back
      </Button>
      <Button
        onClick={handleFavoriteClick}
        className={`favorites-button ${favorite ? 'favorited' : ''}`}
        >
        {favorite ? "Remove from Favorites" : "Add to Favorites"}
      </Button>
    </div>
  );
};

MovieView.propTypes = {
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
      birthYear: PropTypes.string,
      deathYear: PropTypes.string,
    }).isRequired,
  }).isRequired,
  onBackClick: PropTypes.func.isRequired,
  onAddToFavorites: PropTypes.func.isRequired,
  onRemoveFromFavorites: PropTypes.func.isRequired,
  isFavorite: PropTypes.bool.isRequired,
};
