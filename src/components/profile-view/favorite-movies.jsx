import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { MovieCard } from "../movie-card/movie-card";

export const FavoriteMovies = ({ movies, user }) => {
  if (
    !movies ||
    !user ||
    !Array.isArray(movies) ||
    !Array.isArray(user.FavoriteMovies)
  ) {
    return <div>No favorite movies available</div>;
  }

  if (!Array.isArray(movies)) {
    return <div>Invalid movies data</div>;
  }

  let favoriteMovies = movies.filter((movie) =>
    user.FavoriteMovies.includes(movie.id)
  );

  return (
    <Container className="favorite-movies">
      <h3>Favorite Movies</h3>
      <Row>
        {favoriteMovies.length > 0 ? (
          favoriteMovies.map((movie) => (
            <Col key={movie._id} xs={12} sm={6} md={4} lg={3}>
              <MovieCard
                movie={movie}
                // Example: Pass a function to handle adding favorites
                onAddToFavorites={() => handleAddToFavorites(movie)}
              />
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
