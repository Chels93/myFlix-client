import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import UpdateUser from "./update-user";
import { UserInfo } from "./user-info";
import { FavoriteMovies } from "./favorite-movies";
import { DeregisterUser } from "./deregister-user";
import "./profile-view.scss";

export const ProfileView = ({ user, movies, setUser }) => {
    const token = localStorage.getItem("token");

  const handleUpdate = (updatedUser) => {
    setUser(updatedUser);
    console.log("Updated User: ", updatedUser);
  };

  const handleDeregisterUser = () =>
    fetch(
      `https://mymoviesdb-6c5720b5bef1.herokuapp.com/users/${user.username}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to deregister user");
        }
        return response.json();
      })
      .then((data) => {
        alert("User deregistered successfully!");
      })
      .catch((error) => {
        console.error("Error deregistering user: ", error);
        alert("Failed to deregister user. Please try again.");
      });
      if (!user) {
        return <div>User data not available</div>;
      }

return (
  <Container className="profile-view-container">
    <Row>
      <Col xs={12} sm={6}>
        <div className="user-info">
          <UserInfo
            username={user.username}
            email={user.email}
            birthdate={user.birthdate}
          />
        </div>
        <div className="user-update">
          <UpdateUser user={user} onUserUpdate={handleUpdate} />
        </div>
        <div>
          <DeregisterUser
            user={user}
            token={token}
            onDeregisterUser={handleDeregisterUser}
          />
        </div>
      </Col>
      <Col xs={12} sm={6}>
        <div className="favorite-movies">
          <h3>Favorite Movies</h3>
          {user.favoriteMovies && user.favoriteMovies.length > 0 ? (
            <FavoriteMovies
              movies={movies}
              user={user}
              onAddToFavorites={onAddToFavorites}
            />
          ) : (
            <Col>
              <div>No favorite movies yet!</div>
            </Col>
          )}
        </div>
      </Col>
    </Row>
  </Container>
)};
