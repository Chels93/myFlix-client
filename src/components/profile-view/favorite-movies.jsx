import React from "react";
import PropTypes from "prop-types";
import { Card, Button, Row, Col } from "react-bootstrap"; // Import Row and Col
import { Link } from "react-router-dom";

const FavoriteMovies = ({ favoriteMovieList, removeFav }) => {
  return (
    <>
      <Row>
        <Col xs={12}>
          <h2>Favorite Movies</h2>
        </Col>
      </Row>
      <Row>
        {favoriteMovieList.map((movie) => { // Renamed 'movies' to 'movie' for clarity
          return (
            <Col xs={12} md={6} lg={3} key={movie._id}>
              <Card>
                <Card.Img variant="top" src={movie.imagePath} />
                <Card.Body>
                  <Link to={`/movies/${movie._id}`}>
                    <Card.Title>{movie.title}</Card.Title>
                  </Link>
                  <Button variant="secondary" onClick={() => removeFav(movie._id)}>
                    Remove From List
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>
    </>
  );
};

FavoriteMovies.propTypes = {
  favoriteMovieList: PropTypes.array.isRequired,
  removeFav: PropTypes.func.isRequired,
};

export default FavoriteMovies;
