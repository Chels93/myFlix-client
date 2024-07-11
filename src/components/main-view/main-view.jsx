import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import MovieCard from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import { ProfileView } from "../profile-view/profile-view";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");

  const [user, setUser] = useState(storedUser || null);
  const [token, setToken] = useState(storedToken || null);
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    if (!token) {
      return;
    }
    fetch("https://mymoviesdb-6c5720b5bef1.herokuapp.com/movies", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((movies) => {
        console.log("Movies fetched successfully: ", movies); // Log movies here
        setMovies(movies);
      })
      .catch((error) => {
        console.error("Error fetching movies: ", error); // Log error here
      });
  }, [token]);

  const handleMovieClick = (movie) => {
    setSelectedMovie(movie);
  };

  const handleBackClick = () => {
    setSelectedMovie(null);
  };

  const handleAddToFavorites = (movieId, isFavoriteAlready) => {
    const updatedMovies = movies.map((movie) =>
      movie._id === movieId ? { ...movie, isFavorite: !isFavoriteAlready } : movie
    );
    console.log(`Adding movie ${movieId} to favorites`);

    setMovies(updatedMovies);

    const method = isFavoriteAlready ? "DELETE" : "POST";

    fetch(
      `https://mymoviesdb-6c5720b5bef1.herokuapp.com/users/${user.username}/movies/${movieId}`,
      {
        method,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ movieId }),
      }
    )
      .then((response) => response.json())
      .then(() => {
        alert(`Toggle favorite success: The movie was ${isFavoriteAlready ? 'deleted' : 'added'} from the favorite list`);
        setUser((prevUser) => ({
          ...prevUser,
          favoriteMovies: isFavoriteAlready
            ? prevUser.favoriteMovies.filter((id) => id !== movieId)
            : [...prevUser.favoriteMovies, movieId],
        }));
      })
      .catch((error) => {
        console.error("Error toggling favorite: ", error);
      });
  };

  const handleSignedUp = (newUser, newToken) => {
    setUser(newUser);
    setToken(newToken);
    localStorage.setItem("user", JSON.stringify(newUser));
    localStorage.setItem("token", newToken);
  };

  if (!user) {
    return (
      <Row className="justify-content-md-center">
        <Col md={5}>
          <LoginView
            onLoggedIn={(user, token) => {
              setUser(user);
              setToken(token);
              localStorage.setItem("user", JSON.stringify(user));
              localStorage.setItem("token", token);
            }}
          />
          or
          <SignupView onSignedUp={handleSignedUp} />
        </Col>
      </Row>
    );
  }

  return (
    <BrowserRouter>
      <NavigationBar
        user={user}
        onLoggedOut={() => {
          setUser(null);
        }}
      />
      <Row className="justify-content-md-center">
        <Routes>
          <Route
            path="/signup"
            element={
              <>
                {user ? (
                  <Navigate to="/" />
                ) : (
                  <Col md={5}>
                    <SignupView onSignedUp={handleSignedUp} />
                  </Col>
                )}
              </>
            }
          />
          <Route
            path="/login"
            element={
              <>
                {user ? (
                  <Navigate to="/" />
                ) : (
                  <Col md={5}>
                    <LoginView onLoggedIn={(user, token) => {
                        setUser(user);
                        setToken(token);
                        localStorage.setItem("user", JSON.stringify(user));
                        localStorage.setItem("token", token);
                        }} />
                  </Col>
                )}
              </>
            }
          />
          <Route
            path="/movies/:movieId"
            element={
              !user ? (
                <Navigate to="/login" replace />
              ) : movies.length === 0 ? (
                <Col>The list is empty!</Col>
              ) : (
                <Col md={8} style={{ border: "1px solid black" }}>
                  {selectedMovie ? (
                    <MovieView
                      movie={selectedMovie}
                      onBackClick={handleBackClick}
                    />
                  ) : (
                    <Navigate to="/" replace />
                  )}
                </Col>
              )
            }
          />

          <Route
            path="/"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : movies.length === 0 ? (
                  <Col>The list is empty!</Col>
                ) : (
                  <>
                    {movies.map((movie) => (
                      <Col className="mb-5" key={movie._id} md={3}>
                        <MovieCard
                          movie={movie}
                          onMovieClick={handleMovieClick}
                          onAddToFavorites={handleAddToFavorites}
                          user={user}
                          token={token}
                        />
                      </Col>
                    ))}
                  </>
                )}
              </>
            }
          />

          <Route
            path="/profile"
            element={
              !user ? (
                <Navigate to="/login" replace />
              ) : (
                <ProfileView
                  user={user}
                  movies={movies}
                  onUserUpdate={(updatedUser) => setUser(updatedUser)}
                />
              )
            }
          />
        </Routes>
      </Row>
    </BrowserRouter>
  );
};
