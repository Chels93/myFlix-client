import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";
import { useParams, useNavigate } from "react-router-dom";
import "./movie-view.scss";
import "../movie-card/movie-card.scss";

export const MovieView = ({
  movies,
  onAddToFavorites,
  onRemoveFromFavorites,
  isFavorite,
}) => {
  const { movieId } = useParams(); // Get the movieId from the URL
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [favorite, setFavorite] = useState(isFavorite);

  useEffect(() => {
    const foundMovie = movies.find((movie) => movie._id === movieId);
    if (foundMovie) {
      setMovie(foundMovie);
      setFavorite(foundMovie.isFavorite || false); // Initialize favorite state
    } else {
      // Handle case where movie is not found
      console.error("Movie not found:", movieId);
    }
  }, [movieId, movies]);

  if (!movie) {
    return <div>Loading...</div>;
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
    <div className="movie-view">
      <div className="image-container">
        <img src={movie.imagePath} alt={`${movie.title} poster`} />
      </div>
      <div className="movie-details">
        <div>
          <span className="movie-title">Title: </span>
          <span>{movie.title}</span>
        </div>
        <div>
          <span className="movie-title">Synopsis: </span>
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
      </div>
      <div className="buttons-container">
        <Button onClick={handleBackClick} className="back-button">
          Back
        </Button>
        <Button
          onClick={handleFavoriteClick}
          className={`favorites-button ${favorite ? "favorited" : ""}`}
        >
          {favorite ? "Remove from Favorites" : "Add to Favorites"}
        </Button>
      </div>
    </div>
  );
};

MovieView.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
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
      isFavorite: PropTypes.bool, // Add isFavorite to match the state
    })
  ).isRequired,
  onAddToFavorites: PropTypes.func.isRequired,
  onRemoveFromFavorites: PropTypes.func.isRequired,
  isFavorite: PropTypes.bool,
};