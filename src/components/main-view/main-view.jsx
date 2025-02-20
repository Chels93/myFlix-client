import React, { useState, useEffect } from "react";
import { Row, Col, Form } from "react-bootstrap";
import MovieCard from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import { ProfileView } from "../profile-view/profile-view";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { FavoriteMovies } from "../profile-view/favorite-movies";
import "./main-view.scss";
import "../movie-card/movie-card.scss";

// FUNCTION TO CALCULATE STRING SIMILARITY USING THE LEVENSHTEIN DISTANCE
const getSimilarity = (a, b) => {
  const matrix = Array.from({ length: a.length + 1 }, () =>
    Array(b.length + 1).fill(0)
  );
  for (let i = 0; i <= a.length; i++) matrix[i][0] = i;
  for (let j = 0; j <= b.length; j++) matrix[0][j] = j;

  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      matrix[i][j] =
        a[i - 1] === b[j - 1]
          ? matrix[i - 1][j - 1]
          : Math.min(
              matrix[i - 1][j - 1] + 1,
              matrix[i][j - 1] + 1,
              matrix[i - 1][j] + 1
            );
    }
  }
  return 1 - matrix[a.length][b.length] / Math.max(a.length, b.length);
};

// FUNCTION TO REMOVE DUPLICATE DIRECTORS
const getUniqueDirectors = (directors) => {
  const seen = new Set();
  return directors.filter((director) => {
    const isDuplicate = seen.has(director.name);
    seen.add(director.name);
    return !isDuplicate;
  });
};

export const MainView = () => {
  let storedUser = null;
  const storedToken = localStorage.getItem("token");

  const [user, setUser] = useState(storedUser || null);
  const [token, setToken] = useState(storedToken || null);
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("");
  const [selectedDirector, setSelectedDirector] = useState("");
  const [genres, setGenres] = useState([]);
  const [directors, setDirectors] = useState([]);

  useEffect(() => {
    if (!token) {
      return;
    }
    fetch("https://mymoviesdb-6c5720b5bef1.herokuapp.com/movies", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch movies.");
        }
        return response.json();
      })
      .then((movies) => {
        console.log("Movies fetched successfully: ", movies);
        setMovies(movies);

        // Set genres and directors
        const uniqueGenres = Array.from(
          new Set(movies.map((movie) => movie.genre.name))
        );
        setGenres(uniqueGenres);

        const allDirectors = movies.map((movie) => movie.director);
        const uniqueDirectors = getUniqueDirectors(allDirectors);
        setDirectors(uniqueDirectors);
      })
      .catch((error) => {
        console.error("Error fetching movies: ", error);
      });
  }, [token]);

  useEffect(() => {
    if (searchQuery === "") {
      setSuggestions([]);
      return;
    }

    const lowerSearchQuery = searchQuery.toLowerCase();
    const filteredSuggestions = movies
      .map((movie) => ({
        ...movie,
        similarity: getSimilarity(movie.title.toLowerCase(), lowerSearchQuery),
      }))
      .filter((movie) => movie.similarity > 0.3)
      .sort((a, b) => b.similarity - a.similarity);

    setSuggestions(filteredSuggestions);
  }, [searchQuery, movies]);

  const handleBackClick = () => {
    setSelectedMovie(null);
  };

  const handleAddToFavorites = (movieId) => {
    fetch(
      `https://mymoviesdb-6c5720b5bef1.herokuapp.com/users/${user.username}/movies/${movieId}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((updatedUser) => {
        alert("Movie added to Favorites!");
        setUser(updatedUser);
        localStorage.setItem("user", JSON.stringify(updatedUser));
        setMovies((prevMovies) =>
          prevMovies.map((movie) =>
            movie._id === movieId ? { ...movie, isFavorite: true } : movie
          )
        );
      })
      .catch((error) => {
        console.error("Error adding to favorites: ", error);
      });
  };

  const handleRemoveFromFavorites = (movieId) => {
    fetch(
      `https://mymoviesdb-6c5720b5bef1.herokuapp.com/users/${user.username}/movies/${movieId}`,
      {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to remove movie from favorites.");
        }
        return response.json();
      })
      .then((updatedUser) => {
        console.log("Success: ", updatedUser);
        alert("Movie was successfully removed from list.");
        setUser(updatedUser);
        localStorage.setItem("user", JSON.stringify(updatedUser));
        setMovies((prevMovies) =>
          prevMovies.map((movie) =>
            movie._id === movieId ? { ...movie, isFavorite: false } : movie
          )
        );
      })
      .catch((error) => {
        console.error("Error removing from favorites: ", error);
      });
  };

  const updateUser = (user) => {
    setUser(user);
    localStorage.setItem("user", JSON.stringify(user));
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
        </Col>
      </Row>
    );
  }

  const filteredMovies = movies
    .filter((movie) => !user.favoriteMovies.includes(movie._id))
    .filter((movie) =>
      selectedGenre
        ? movie.genre.name.toLowerCase().includes(selectedGenre.toLowerCase())
        : true
    )
    .filter((movie) =>
      selectedDirector
        ? movie.director.name
            .toLowerCase()
            .includes(selectedDirector.toLowerCase())
        : true
    );

  const searchFilteredMovies = filteredMovies
    .filter((movie) =>
      selectedGenre
        ? movie.genre.name.toLowerCase().includes(selectedGenre.toLowerCase())
        : true
    )
    .filter((movie) =>
      selectedDirector
        ? movie.director.name
            .toLowerCase()
            .includes(selectedDirector.toLowerCase())
        : true
    )
    .filter((movie) =>
      movie.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

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
                path="/login"
                element={
                  <>
                    {user ? (
                      <Navigate to="/" />
                    ) : (
                      <Col md={5}>
                        <LoginView
                          onLoggedIn={(user, token) => {
                            setUser(user);
                            setToken(token);
                            localStorage.setItem("user", JSON.stringify(user));
                            localStorage.setItem("token", token);
                          }}
                        />
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
                          movies={movies}
                          movie={selectedMovie}
                          onBackClick={handleBackClick}
                          onAddToFavorites={handleAddToFavorites}
                          onRemoveFromFavorites={handleRemoveFromFavorites}
                          isFavorite={user.favoriteMovies.includes(selectedMovie._id)}
                        />
                      ) : (
                        <Navigate to="/" replace />
                      )}
                    </Col>
                  )
                }
              />
              <Route
                path="/favorites"
                element={
                  !user ? (
                    <Navigate to="/login" replace />
                  ) : (
                    <FavoriteMovies
                      movies={movies}
                      user={user}
                      onAddToFavorites={handleAddToFavorites}
                      onRemoveFromFavorites={handleRemoveFromFavorites}
                      onMovieClick={(movie) => setSelectedMovie(movie)}
                    />
                  )
                }
              />
              <Route
                path="/"
                element={
                  <>
                    {!user ? (
                      <Navigate to="/login" replace />
                    ) : (
                      <>
                        <Col md={12} className="mb-4">
                          <input
                            type="text"
                            placeholder="Search for a movie..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="search-input"
                          />
                        </Col>
                        <Col md={12} className="filter-container">
                          <div className="filter-group">
                            <Form>
                              <Form.Group controlId="genreFilter">
                                <Form.Label>Filter by Genre:</Form.Label>
                                <Form.Control
                                  as="select"
                                  value={selectedGenre}
                                  onChange={(e) => setSelectedGenre(e.target.value)}
                                >
                                  <option value="">Select Genre</option>
                                  {genres.map((genre, index) => (
                                    <option key={index} value={genre}>
                                      {genre}
                                    </option>
                                  ))}
                                </Form.Control>
                              </Form.Group>
                            </Form>
                          </div>
                          <div className="filter-group">
                            <Form>
                              <Form.Group controlId="directorFilter">
                                <Form.Label>Filter by Director:</Form.Label>
                                <Form.Control
                                  as="select"
                                  value={selectedDirector}
                                  onChange={(e) => setSelectedDirector(e.target.value)}
                                >
                                  <option value="">Select Director</option>
                                  {directors.map((director, index) => (
                                    <option key={index} value={director.name}>
                                      {director.name}
                                    </option>
                                  ))}
                                </Form.Control>
                              </Form.Group>
                            </Form>
                          </div>
                        </Col>
                        <Row className="card-container">
                          {searchFilteredMovies.length === 0 && suggestions.length === 0 ? (
                            <Col className="text-center">
                              The list is empty or no matching movies found.
                            </Col>
                          ) : searchFilteredMovies.length === 0 ? (
                            <Col className="text-center">
                              No matching movies found. Try another search or check these suggestions:
                              <div>
                                {suggestions.map((movie) => (
                                  <div key={movie._id}>{movie.title}</div>
                                ))}
                              </div>
                            </Col>
                          ) : (
                            searchFilteredMovies.map((movie) => (
                              <Col className="mb-5" key={movie._id} md={3}>
                                <MovieCard
                                  movie={movie}
                                  fav={(user.favoriteMovies || []).includes(movie._id)}
                                  onAddToFavorites={() => handleAddToFavorites(movie._id)}
                                  onRemoveFromFavorites={() => handleRemoveFromFavorites(movie._id)}
                                  onMovieClick={() => setSelectedMovie(movie)}
                                />
                              </Col>
                            ))
                          )}
                        </Row>
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
                      onRemoveFromFavorites={handleRemoveFromFavorites}
                    />
                  )
                }
              />
            </Routes>
          </Row>
        </BrowserRouter>
      );
    }