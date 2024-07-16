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

  const handleBackClick = () => {
    setSelectedMovie(null);
  };

  const handleAddToFavorites = (movieId) => {
    fetch(`https://mymoviesdb-6c5720b5bef1.herokuapp.com/users/${user.username}/movies/${movieId}`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
    })
    .then((response) => response.json())
    .then(() => {
        alert("Movie added to Favorites!");
        setUser((prevUser) => ({
            ...prevUser,
            FavoriteMovies: [...(prevUser.FavoriteMovies || []), movieId],
        }));
    })
    .catch((error) => {
        console.error("Error adding to favorites: ", error);
    });
};

  const handleRemoveFromFavorites = (movieId) => {
    fetch(`https://mymoviesdb-6c5720b5bef1.herokuapp.com/users/${user.username}/movies/${movieId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => {
        if(!response.ok) {
            throw new Error("Failed to remove movie from favorites.");
        }
        return response.json();
    })    
    .then((data) => {
        console.log("Success: ", data);
        localStorage.setItem("user", JSON.stringify(data));
        alert("Movie was successfully removed from list.");
        setUser((prevUser) => ({
            ...prevUser,
            FavoriteMovies: (prevUser.FavoriteMovies || []).filter((id) => id !== movieId),
        }));
    })
    .catch((error) => {
        console.error("Error removing from favorites: ", error);
    });
    };

  const handleSignedUp = (newUser, newToken) => {
    setUser(newUser);
    setToken(newToken);
    localStorage.setItem("user", JSON.stringify(newUser));
    localStorage.setItem("token", newToken);
  };

  const updateUser = user => {
    setUser(user)
    localStorage.setItem("user", JSON.stringify(user))
  }

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
          setToken(null);
          localStorage.removeItem("user");
          localStorage.removeItem("token");
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
                          fav={user.FavoriteMovies(movie._id)}
                          onAddToFavorites={() => handleAddToFavorites(movie._id)}
                          onRemoveFromFavorites={() => handleRemoveFromFavorites(movie._id)}
                          onMovieClick={() => Navigate(`/movies/${movie._id}`)} 
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
                  setUser={updateUser}
                />
              )
            }
          />
        </Routes>
      </Row>
    </BrowserRouter>
  );
};
