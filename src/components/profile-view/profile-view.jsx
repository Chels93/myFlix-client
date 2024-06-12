import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import "./profile-view.scss";
import axios from "axios";
import UserInfo from "./user-info";
import FavoriteMovies from "./favorite-movies";
import UpdateUser from "./update-user";

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
        <Col>
          <UserInfo name={user.username} email={user.email} />
        </Col>
        <Col>
          <UpdateUser user={user} setUser={setUser} />
        </Col>
      </Row>

      <FavoriteMovies favoriteMovieList={favoriteMovieList} />
    </Container>
  );
}
