import React, { useState } from "react";
import PropTypes from "prop-types";
import { Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./movie-card.scss";

const MovieCard = ({ fav, movie, onAddToFavorites, onRemoveFromFavorites, onMovieClick }) => {
  const navigate = useNavigate();
  const [isFavorite, setIsFavorite] = useState(fav);

  const handleSeeMore = () => {
    navigate(`/movies/${movie._id}`);
    onMovieClick(movie);
  };

  const handleAddToFavorites = (event) => {
    event.preventDefault();
    onAddToFavorites(movie._id);
    setIsFavorite(true);
  };

  const handleRemoveFromFavorites = (event) => {
    event.preventDefault();
    onRemoveFromFavorites(movie._id);
    setIsFavorite(false);
  };

  const handleFavoriteClick = (event) => {
    event.preventDefault();
    if (isFavorite) {
      handleRemoveFromFavorites(event);
    } else {
      handleAddToFavorites(event);
    }
  };

  return (
    <Card
      className="h-100"
      style={{ width: "18rem", border: "3px solid gray" }}
    >
      <Card.Img
        variant="top"
        src={movie.imagePath}
        alt={`${movie.title} poster`}
      />
      <Card.Body>
        <Card.Title
          style={{
            fontFamily: "Montserrat, sans-serif",
            fontSize: "1.5rem",
            fontWeight: "bold",
          }}
        >
          {movie.title}
        </Card.Title>
        <Button className="see-more" onClick={handleSeeMore}>
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
    fav: PropTypes.bool,
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
  onMovieClick: PropTypes.func.isRequired,
  onAddToFavorites: PropTypes.func.isRequired,
  onRemoveFromFavorites: PropTypes.func.isRequired,
};

export default MovieCard;
