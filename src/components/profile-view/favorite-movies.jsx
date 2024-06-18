import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { MovieCard } from '../movie-card/movie-card';

export const FavoriteMovies = ({ movies, user, token }) => {
  const [favoriteMovies, setFavoriteMovies] = useState([]);

  useEffect(() => {
    if (user.favoriteMovies && user.favoriteMovies.length > 0) {
      // Filter movies array to get favorite movies of the user
      const userFavoriteMovies = movies.filter((movie) => user.favoriteMovies.includes(movie._id));
      setFavoriteMovies(userFavoriteMovies);
    }
  }, [movies, user]);

  return (
    <Container className="favorite-movies">
      <h3>Favorite Movies</h3>
      <Row>
        {favoriteMovies.length > 0 ? (
          favoriteMovies.map((movie) => (
            <Col key={movie._id} xs={12} sm={6} md={4} lg={3}>
              <MovieCard movie={movie} />
            </Col>
          ))
        ) : (
          <Col>
            <Card>
              <Card.Body>No favorite movies yet!</Card.Body>
            </Card>
          </Col>
        )}
      </Row>
    </Container>
  );
};
