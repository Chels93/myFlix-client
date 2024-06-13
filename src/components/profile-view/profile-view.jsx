import React, { useEffect, useState } from "react";
import { Container, Col, Row, Card, Form, Button } from "react-bootstrap";
import UserInfo from "./user-info";
import FavoriteMovies from "./favorite-movies";
import UpdateUser from "./update-user";
import MovieView from "../movie-view/movie-view"; 
import "./profile-view.scss";


export function ProfileView({ movies, onUpdatedUserInfo, selectedMovie }) {
  const [user, setUser] = useState({});
  const [newFavoriteMovieId, setNewFavoriteMovieId] = useState("");
  const token = localStorage.getItem("token");

  const favoriteMovieList = movies.filter((movie) =>
    user.favoriteMovies?.includes(movie._id)
  );

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
      `https://mymoviesdb-6c5720b5bef1.herokuapp.com/users/:username/movies/:ObjectId`,
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

  const removeFav = (id) => {
    fetch(
      `https://mymoviesdb-6c5720b5bef1.herokuapp.com//users/:username/movies/:ObjectId`,
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

  useEffect(() => {
    getUser();
  }, []);

  console.log("User type:", typeof user, user); 

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
              <Form onSubmit={(e) => {
                e.preventDefault();
                addFavoriteMovie(newFavoriteMovieId);
              }}>
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
      <FavoriteMovies
        favoriteMovieList={favoriteMovieList}
        removeFav={removeFav}
      />
      <MovieView
        movie={selectedMovie}
        onBackClick={() => console.log("Back clicked")}
        onAddToFavorites={addFavoriteMovie}
      />
    </Container>
  );
}
