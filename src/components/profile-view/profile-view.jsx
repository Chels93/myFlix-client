import React, { useEffect, useState } from "react";
import { Container, Col, Row, Card } from "react-bootstrap";
import UserInfo from "./user-info";
import FavoriteMovies from "./favorite-movies";
import UpdateUser from "./update-user";
import "./profile-view.scss";

export function ProfileView({ movies, onUpdatedUserInfo }) {
  const [user, setUser] = useState({});
  const token = localStorage.getItem("token");

  const favoriteMovieList = movies.filter(movie => user.favoriteMovies?.includes(movie._id));

  const getUser = () => {
    fetch("https://mymoviesdb-6c5720b5bef1.herokuapp.com/users/current", {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(response => response.json())
    .then(data => setUser(data))
    .catch(error => console.error("Error fetching user data: ", error));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`https://mymoviesdb-6c5720b5bef1.herokuapp.com/users/${user.username}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(user)
    })
    .then(response => response.json())
    .then(data => {
      setUser(data);
      onUpdatedUserInfo(data);
    })
    .catch(error => console.error("Error updating user data: ", error));
  };

  const removeFav = (id) => {
    fetch(`https://mymoviesdb-6c5720b5bef1.herokuapp.com/users/${user.username}/favorites/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(response => response.json())
    .then(data => setUser(data))
    .catch(error => console.error("Error removing favorite movie: ", error));
  };

  const handleUpdate = (updatedUser) => {
    setUser(updatedUser);
  };

  useEffect(() => {
    getUser();
  }, []);

  // Render UserInfo only if user.username and user.email are defined
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
        </Col>
        <Col xs={12} sm={8}>
          <Card>
            <Card.Body>
              <UpdateUser user={user} setUser={setUser} handleSubmit={handleSubmit} />
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <FavoriteMovies favoriteMovieList={favoriteMovieList} removeFav={removeFav} />
    </Container>
  );
}
