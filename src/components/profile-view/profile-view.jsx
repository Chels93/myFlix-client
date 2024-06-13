import React, { useEffect, useState } from "react";
import { Container, Col, Row, Card, Form, Button } from "react-bootstrap";
import UserInfo from "./user-info";
import MovieCard from "../movie-card/movie-card";
import UpdateUser from "./update-user";
import MovieView from "../movie-view/movie-view";
import "./profile-view.scss";

const ProfileView = ({ movies, onUpdatedUserInfo, selectedMovie, movieId, movieCards }) => {
  const [user, setUser] = useState({});
  const [newFavoriteMovieId, setNewFavoriteMovieId] = useState("");
  const token = localStorage.getItem("token");

  const favoriteMovies = movies.filter(
    (movie) => user.favoriteMovies && user.favoriteMovies.includes(movie._id)
  );

  useEffect(() => {
    getUser();
  }, []);

  const getUser = () => {
    fetch("https://mymoviesdb-6c5720b5bef1.herokuapp.com/users", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((data) => {
        if (typeof data === "object") {
          setUser(data);
        } else {
          throw new Error("Invalid user data format");
        }
      })
      .catch((error) => console.error("Error fetching user data: ", error));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`https://mymoviesdb-6c5720b5bef1.herokuapp.com/users/:username`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(user),
    })
      .then((response) => response.json())
      .then((data) => {
        if (typeof data === "object") {
          setUser(data);
          onUpdatedUserInfo(data);
        } else {
          throw new Error("Invalid user data format");
        }
      })
      .catch((error) => console.error("Error updating user data: ", error));
  };

  const addFavoriteMovie = (movieId) => {
    fetch(
      `https://mymoviesdb-6c5720b5bef1.herokuapp.com/users/${user.username}/movies/${movieId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        if (typeof data === "object") {
          setUser(data);
        } else {
          throw new Error("Invalid user data format");
        }
      })
      .catch((error) => console.error("Error adding favorite movie: ", error));
  };

  const removeFav = (movieId) => {
    fetch(
      `https://mymoviesdb-6c5720b5bef1.herokuapp.com/users/${user.username}/movies/${movieId}`,
      {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        if (typeof data === "object") {
          setUser(data);
        } else {
          throw new Error("Invalid user data format");
        }
      })
      .catch((error) =>
        console.error("Error removing favorite movie: ", error)
      );
  };

  const handleUpdate = (updatedUser) => {
    if (typeof updatedUser === "object") {
      setUser(updatedUser);
    } else {
      console.error("Invalid user update data");
    }
  };

  return (
    <Container>
      <Row>
        <Col xs={12} sm={4}>
          <Card>
            <Card.Body>
              {user.username && user.email && (
                <UserInfo name={user.username} email={user.email} />
              )}
            </Card.Body>
          </Card>
          <Card className="mt-3">
            <Card.Body>
              <h5>Add Favorite Movie</h5>
              <Form
                onSubmit={(e) => {
                  e.preventDefault();
                  addFavoriteMovie(newFavoriteMovieId);
                }}
              >
                <Form.Group>
                  <Form.Control
                    type="text"
                    placeholder="Enter movie ID"
                    value={newFavoriteMovieId}
                    onChange={(e) => setNewFavoriteMovieId(e.target.value)}
                    required
                  />
                </Form.Group>
                <Button variant="primary" type="submit">
                  Add Favorite
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} sm={8}>
          <Card>
            <Card.Body>
              <UpdateUser
                user={typeof user === "object" ? user : {}}
                handleUpdate={handleUpdate}
                handleSubmit={handleSubmit}
              />
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="mt-3">
        <Col>
          <h3>Favorite Movies</h3>
          <Row>
            {/* Render MovieCard components */}
            {favoriteMovies.map((movie) => (
              <Col key={movie._id} xs={12} sm={6} md={4} lg={3}>
                <MovieCard
                  movie={movie}
                  onAddToFavorites={addFavoriteMovie}
                  onMovieClick={(selectedMovie) => console.log(selectedMovie)}
                />
              </Col>
            ))}
          </Row>
        </Col>
      </Row>

      {selectedMovie && (
        <MovieView
          movie={selectedMovie}
          onBackClick={() => console.log("Back clicked")}
          onAddToFavorites={addFavoriteMovie}
        />
      )}
    </Container>
  );
};

export default ProfileView;