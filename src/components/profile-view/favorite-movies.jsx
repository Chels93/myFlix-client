import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import MovieCard from "../movie-card/movie-card";

export const FavoriteMovies = ({ movies, user, onMovieClick, onFavoriteClick, onAddToFavorites, onRemoveFromFavorites }) => {
    const [favoriteMovies, setFavoriteMovies] = useState([]);
    const token = localStorage.getItem("token");
  
    useEffect(() => {
      const fetchFavoriteMovies = async () => {
        if (!user || !user.username) {
          console.error("User or username is undefined.");
          return;
        }
  
        try {
          const response = await fetch(
            `https://mymoviesdb-6c5720b5bef1.herokuapp.com/users/${user.username}`, 
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
          );
          if (!response.ok) {
            throw new Error("Failed to fetch favorite movies");
          }
          const userdata = await response.json();
          setFavoriteMovies(userdata.favoriteMovies);
        } catch (error) {
          console.error("Error fetching favorite movies:", error);
        }
      };
  
      fetchFavoriteMovies();
    }, [user, token]);
  
    if (!movies || !user || !Array.isArray(movies) || !Array.isArray(favoriteMovies)) {
      return <div>No favorite movies available</div>;
    }
  
    const filteredMovies = movies.filter((movie) => favoriteMovies.includes(movie._id));

    const onFavoriteClick = (movieId, isFavorite) => {
        if (isFavorite) {
            onRemoveFromFavorites(movieId);
        } else {
            onAddToFavorites(movieId);
        }
    };
    
  return (
    <Container className="favorite-movies">
      <Row>
        {filteredMovies.length > 0 ? (
          filteredMovies.map((movie) => (
            <Col key={movie._id} xs={12} sm={6} md={4} lg={3}>
              <MovieCard
                movie={movie}
                fav={true}
                onMovieClick={onMovieClick}
                onFavoriteClick={onFavoriteClick}
                onAddToFavorites={onAddToFavorites}
                onRemoveFromFavorites={() => onRemoveFromFavorites(movie._id)}
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
