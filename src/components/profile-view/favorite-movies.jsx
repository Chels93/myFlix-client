import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import MovieCard from "../movie-card/movie-card";

export const FavoriteMovies = ({ movies, user, onAddToFavorites }) => {
    const [favoriteMovies, setFavoriteMovies] = useState([]);
  
    useEffect(() => {
      const fetchFavoriteMovies = async () => {
        if (!user || !user.username) {
          console.error("User or username is undefined.");
          return;
        }
  
        try {
          const response = await fetch(
            `https://mymoviesdb-6c5720b5bef1.herokuapp.com/users/${user.username}`, 
          );
          if (!response.ok) {
            throw new Error("Failed to fetch favorite movies");
          }
          const userData = await response.json();
          setFavoriteMovies(userData.favoriteMovies);
        } catch (error) {
          console.error("Error fetching favorite movies:", error);
        }
      };
  
      fetchFavoriteMovies();
    }, [user]);
  
    if (!movies || !user || !Array.isArray(movies) || !Array.isArray(favoriteMovies)) {
      return <div>No favorite movies available</div>;
    }
  
    const filteredMovies = movies.filter((movie) => favoriteMovies.includes(movie._id));

  return (
    <Container className="favorite-movies">
      <Row>
        {favoriteMovies.length > 0 ? (
          favoriteMovies.map((movie) => (
            <Col key={movie._id} xs={12} sm={6} md={4} lg={3}>
              <MovieCard
                movie={movie}
                onAddToFavorites={() => onAddToFavorites(movie._id)}
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
