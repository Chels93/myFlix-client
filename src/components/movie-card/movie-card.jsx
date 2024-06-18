import { useState } from "react";
import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import "./movie-card.scss";

export const MovieCard = ({ movie, onMovieClick }) => {
  const [detailsDisplayed, setDetailsDisplayed] = useState(false);

  const handleSeeMore = () => {
    onMovieClick(movie);
  };

  return (
    <Card className="h-100" style={{ width: '18rem', border: "3px solid gray" }}>
      <Card.Img
        variant="top"
        src={movie.imagePath}
        alt={`${movie.title} poster`}
      />
      <Card.Body>
        <Card.Title style={{ fontFamily: "Montserrat, sans-serif", fontSize: "1.5rem", fontWeight: "bold" }}>{movie.title}</Card.Title>
        <Button onClick={handleSeeMore} variant="link">
          See More
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
};