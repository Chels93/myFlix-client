import { useState } from "react";
import PropTypes from "prop-types";
import "./movie-card.scss";
import { Button, Card } from "react-bootstrap";

export const MovieCard = ({ movie, onMovieClick }) => {
  const [detailsDisplayed, setDetailsDisplayed] = useState(false);

  const handleViewDetails = () => {
    setDetailsDisplayed(!detailsDisplayed);
    onMovieClick(movie);
  };

  return (
    <Card>
      <Card.Img
        variant="top"
        src={movie.imagePath}
        alt={`${movie.title} poster`}
      />
      <Card.Body>
        <Card.Title>{movie.title}</Card.Title>
        <Card.Text>Director: {movie.director.name}</Card.Text>
        <Button onClick={handleViewDetails} variant="link">
          {detailsDisplayed ? "Hide Details" : "View Details"}
        </Button>
        {detailsDisplayed && (
          <div>
            <p>Synopsis: {movie.synopsis}</p>
            <p>Release Year: {movie.year}</p>
            <p>Genre: {movie.genre.name}</p>
            <p>Genre Description: {movie.genre.description}</p>
            <p>Director: {movie.director.name}</p>
            <p>Director Bio: {movie.director.bio}</p>
            <p>Director Birthyear: {movie.director.birthYear}</p>
            <p>Director Deathyear: {movie.director.deathYear}</p>
          </div>
        )}
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
};