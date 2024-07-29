import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import UpdateUser from "./update-user";
import { UserInfo } from "./user-info";
import { FavoriteMovies } from "./favorite-movies";
import { DeregisterUser } from "./deregister-user";
import "./profile-view.scss";

export const ProfileView = ({
  user,
  movies,
  setUser,
  onAddToFavorites,
  onRemoveFromFavorites,
}) => {
  const token = localStorage.getItem("token");

  const handleUpdate = (updatedUser) => {
    fetch(
      `https://mymoviesdb-6c5720b5bef1.herokuapp.com/users/${user.username}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedUser),
      }
    )
      .then((response) => {
        if (!response.ok) {
          return response.json().then((error) => {
            throw new Error(
              error.errors ? error.errors.map((e) => e.msg).join(", ") : "UNKNOWN ERROR OCCURRED."
          );
        });
    }
        return response.json();
      })
      .then((userData) => {
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
      })
      .catch((error) => {
        console.error("Error updating user: ", error);
        alert("Failed to update user. Please try again.");
      });
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
      .then(() => {
        alert("User deregistered successfully!");
        setUser(null);
        localStorage.removeItem("user");
        localStorage.removeItem("token");
      })
      .catch((error) => {
        console.error("Error deregistering user: ", error);
        alert("Failed to deregister user. Please try again.");
      });

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
        setUser(updatedUser);
        localStorage.setItem("user", JSON.stringify(updatedUser));
        alert("Movie was successfully removed from favorites.");
      })
      .catch((error) => {
        console.error("Error removing from favorites: ", error);
        alert("Failed to remove movie from favorites. Please try again.");
      });
  };

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
            <DeregisterUser user={user} token={token} />
          </div>
        </Col>
        <Col xs={12} sm={6}>
          <div className="favorite-movies">
            <h3>Favorite Movies</h3>
            {user.favoriteMovies && user.favoriteMovies.length > 0 ? (
              <FavoriteMovies
                movies={movies}
                user={user}
                onAddToFavorites={handleAddToFavorites}
                onRemoveFromFavorites={handleRemoveFromFavorites}
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
  );
};
