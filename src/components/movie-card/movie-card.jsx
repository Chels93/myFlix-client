import { useState } from "react";
import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./movie-card.scss";

export const MovieCard = ({ movie, onMovieClick }) => {
  const [detailsDisplayed, setDetailsDisplayed] = useState(false);

  const handleViewDetails = () => {
    setDetailsDisplayed(!detailsDisplayed);
    if (typeof onMovieClick === "function") {
        onMovieClick(movie);
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
        <Link to={`/movies/${encodeURIComponent(movie._id)}`}>
          <Button onClick={handleViewDetails} variant="link">
            {detailsDisplayed ? "Hide Details" : "View Details"}
          </Button>
        </Link>
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
    onMovieClick: PropTypes.func.isRequired,
  };
  

  
