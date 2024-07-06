import React from "react";
import PropTypes from "prop-types";
import { Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./movie-card.scss";

const MovieCard = ({ movie, onMovieClick, onAddToFavorites, user, token }) => {
  const navigate = useNavigate();

  console.log("Movie prop:", movie);
  console.log("User prop:", user);
  console.log("Token prop:", token);

  // Need to check from the user if the movie id is in favorite list
  // const isMovieFavorite = true

  const handleSeeMore = () => {
    navigate(`/movies/${movie._id}`);
    onMovieClick(movie);
  };

  const addFav = async () => {
    if (!user || !user.username) {
      console.error("User or username is undefined.");
      return;
    }
    if (onAddToFavorites) {
      onAddToFavorites(movie._id, false);
    }
  };

  const removeFav = async () => {
    if (!user || !user.username) {
      console.error("User or username is undefined.");
      return;
    }
    if (onAddToFavorites) {
      onAddToFavorites(movie._id, true);
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
        <Button className="btn-link" onClick={handleSeeMore}>
          See More
        </Button>
        <Button className="btn-link ml-2" onClick={addFav}>
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
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
  }).isRequired,
  onAddToFavorites: PropTypes.func,
  token: PropTypes.string.isRequired,
};

export default MovieCard;
