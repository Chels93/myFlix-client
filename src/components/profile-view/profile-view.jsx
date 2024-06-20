import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { UpdateUser } from "./update-user";
import UserInfo from "./user-info";
import { FavoriteMovies } from "./favorite-movies";
import { DeregisterUser } from "./deregister-user";
import "./profile-view.scss";

export const ProfileView = ({ user, movies }) => {
  const token = localStorage.getItem("token");

  if (!user) {
    return <div>User data not available</div>;
  }

  return (
    <Container className="profile-view-container">
      <Row>
        <Col xs={12} sm={6}>
          <div className="user-info">
            <UserInfo
              name={user.Username}
              email={user.Email}
              birthday={user.Birthday}
            />
          </div>
          <div className="user-update">
            <UpdateUser user={user} />
          </div>
          <div>
            <DeregisterUser user={user} token={token} />
          </div>
        </Col>
        <Col xs={12} sm={6}>
          <div className="favorite-movies">
            <h3>Favorite Movies</h3>
            <Row>
              {user.FavoriteMovies && user.FavoriteMovies.length > 0 ? (
                user.FavoriteMovies.map((movieId) => {
                  const movie = movies.find((m) => m._id === movieId);
                  return (
                    <Col key={movie._id} xs={12} sm={6} md={4} lg={3}>
                      <FavoriteMovies movie={movie} user={user} />
                    </Col>
                  );
                })
              ) : (
                <Col>
                  <div>No favorite movies yet!</div>
                </Col>
              )}
            </Row>
          </div>
        </Col>
      </Row>
    </Container>
  );
};