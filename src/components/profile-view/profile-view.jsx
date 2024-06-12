import React, { useEffect, useState } from "react";
import { Container, Col, Row, Card } from "react-bootstrap";
import UserInfo from "./user-info";
import FavoriteMovies from "./favorite-movies";
import UpdateUser from "./update-user";
import "./profile-view.scss";

export function ProfileView({ movies, onUpdatedUserInfo }) {
  const [user, setUser] = useState({});

  const favoriteMovieList = movies.filter((movies) => {});

  const getUser = () => {};
  const handleSubmit = (e) => {};
  const removeFav = (id) => {};
  const handleUpdate = (e) => {};

  useEffect(() => {}, []);

  return (
    <Container>
      <Row>
        <Col xs={12} sm={4}>
          <UserInfo name={user.username} email={user.email} />
        </Col>
        <Col xs={12} sm={8}>
          <UpdateUser user={user} setUser={setUser} />
        </Col>
      </Row>

      <FavoriteMovies favoriteMovieList={favoriteMovieList} />
    </Container>
  );
}
