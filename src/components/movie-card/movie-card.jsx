import React, { useState } from "react";
import PropTypes from "prop-types";
import { Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./movie-card.scss";
import "../profile-view/profile-view.scss";

const MovieCard = ({
  movie,
  fav,
  onMovieClick,
  onAddToFavorites,
  onRemoveFromFavorites,
}) => {
  const navigate = useNavigate();
  const [isFavorite, setIsFavorite] = useState(fav);

  const handleSeeMore = () => {
    navigate(`/movies/${movie._id}`);
    if (typeof onMovieClick === 'function') {
      onMovieClick(movie);
    } else {
      console.error("onMovieClick is not a function");
    }
  };

  const handleFavoriteClick = (event) => {
    event.preventDefault();
    if (isFavorite) {
      onRemoveFromFavorites(movie._id);
      setIsFavorite(false);
    } else {
      onAddToFavorites(movie._id);
      setIsFavorite(true);
    }
  };

  return (
    <Card className="movie-card">
      <div className="card-img-container">
        <Card.Img
          className="card-img"
          variant="top"
          src={movie.imagePath}
          alt={`${movie.title} poster`}
        />
      </div>
      <Card.Body className="card-body">
        <Card.Title className="card-title">{movie.title}</Card.Title>
        <Button className="see-more" onClick={handleSeeMore} variant="primary">
          See More
        </Button>
        <Button
          className="favorite-button"
          variant={isFavorite ? "danger" : "outline-danger"}
          onClick={handleFavoriteClick}
        >
          {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
        </Button>
      </Card.Body>
    </Card>
  );
};

MovieCard.propTypes = {
  fav: PropTypes.bool.isRequired,
  movie: PropTypes.shape({
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
  }).isRequired,
  onMovieClick: PropTypes.func,
  onAddToFavorites: PropTypes.func.isRequired,
  onRemoveFromFavorites: PropTypes.func.isRequired,
};

export default MovieCard;