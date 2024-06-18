import React from "react";
import PropTypes from "prop-types";
import { Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./movie-card.scss";

export const MovieCard = ({ movie, onMovieClick, username }) => {
  const navigate = useNavigate();

  const handleSeeMore = () => {
    navigate(`/movies/${movie._id}`);
    onMovieClick(movie);
  };

  const handleAddToFavorites = () => {
    console.log("Add to favorites clicked for: ", movie.title);
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
        <Button variant="link" className="btn-link" onClick={handleSeeMore}>
          See More
        </Button>
        <Button
          variant="link"
          className="btn-link ml-2"
          onClick={handleAddToFavorites}
        >
          Add to Favorites
        </Button>
      </Card.Body>
    </Card>
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
      birthYear: PropTypes.string,
      deathYear: PropTypes.string,
    }).isRequired,
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
};
