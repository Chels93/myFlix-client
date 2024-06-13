import React from "react";
import { Link } from "react-router-dom";
import "./movie-view.scss";
import { Button } from "react-bootstrap";

const MovieView = ({ movie, onBackClick, onAddToFavorites }) => {
  const handleFavoriteClick = () => {
    if (typeof onAddToFavorites === "function") {
      onAddToFavorites(movie._id);
    } else {
      console.warn("onAddToFavorites function is not provided");
    }
  };

  if (!movie) {
    return <div>No movie found!</div>;
  }

  return (
    <div className="movie-view">
      <div className="image-container">
        <img
          src={movie.imagePath}
          alt={`${movie.title} poster`}
          className="movie-poster"
        />
      </div>
      <div className="movie-details">
        <div className="title">
          <span>Title: </span>
          <span>{movie.title}</span>
        </div>
        <div className="_id">
          <span>ID Number: </span>
          <span>{movie._id}</span>
        </div>
        <div className="synopsis">
          <span>Synopsis: </span>
          <span>{movie.synopsis}</span>
        </div>
        <div className="release-year">
          <span>Release Year: </span>
          <span>{movie.year}</span>
        </div>
        <div className="genre">
          <span>Genre: </span>
          <span>{movie.genre.name}</span>
        </div>
        <div className="genre-description">
          <span>Genre Description: </span>
          <span>{movie.genre.description}</span>
        </div>
        <div className="director">
          <span>Director: </span>
          <span>{movie.director.name}</span>
        </div>
        <div className="director-bio">
          <span>Director Bio: </span>
          <span>{movie.director.bio}</span>
        </div>
        {movie.director.birthYear && (
          <div className="director-birthyear">
            <span>Director Birthyear: </span>
            <span>{movie.director.birthYear}</span>
          </div>
        )}
        {movie.director.deathYear && (
          <div className="director-deathyear">
            <span>Director Deathyear: </span>
            <span>{movie.director.deathYear}</span>
          </div>
        )}

        <Button onClick={handleFavoriteClick}>Add to Favorites</Button>

        <Link to={`/home`}>
          <Button className="back-button" onClick={onBackClick}>
            Back
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default MovieView;
