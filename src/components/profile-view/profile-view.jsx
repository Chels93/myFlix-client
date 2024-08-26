import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import UpdateUser from "./update-user";
import { UserInfo } from "./user-info";
import { FavoriteMovies } from "./favorite-movies";
import "./profile-view.scss";

export const ProfileView = ({
  user,
  movies = [], // Default to an empty array if movies is not provided
  setUser,
  onAddToFavorites,
  onRemoveFromFavorites,
}) => {
  const token = localStorage.getItem("token");

  const handleUpdate = (updatedUser) => {
    setUser(updatedUser);
    console.log("Updated User: ", updatedUser);
  };

  const handleDeregisterUser = async () => {
    try {
      const response = await fetch(
        `https://mymoviesdb-6c5720b5bef1.herokuapp.com/users/${user.username}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to deregister user");
      }

      alert("User deregistered successfully!");
      setUser(null);
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    } catch (error) {
      console.error("Error deregistering user: ", error);
      alert("Failed to deregister user. Please try again.");
    }
  };

  const handleAddToFavorites = async (movieId) => {
    try {
      const response = await fetch(
        `https://mymoviesdb-6c5720b5bef1.herokuapp.com/users/${user.username}/movies/${movieId}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to add movie to favorites.");
      }

      const updatedUser = await response.json();
      alert("Movie added to Favorites!");
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
    } catch (error) {
      console.error("Error adding to favorites: ", error);
    }
  };

  const handleRemoveFromFavorites = async (movieId) => {
    try {
      const response = await fetch(
        `https://mymoviesdb-6c5720b5bef1.herokuapp.com/users/${user.username}/movies/${movieId}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to remove movie from favorites.");
      }

      const updatedUser = await response.json();
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
      alert("Movie was successfully removed from favorites.");
    } catch (error) {
      console.error("Error removing from favorites: ", error);
      alert("Failed to remove movie from favorites. Please try again.");
    }
  };

  if (!user) {
    return <div>User data not available</div>;
  }

  // Safeguard against cases where user.favoriteMovies might be undefined
  const favoriteMovies = user.favoriteMovies && Array.isArray(user.favoriteMovies)
    ? movies.filter((movie) => user.favoriteMovies.includes(movie._id))
    : [];

  return (
    <Container className="profile-view-container">
      <Row>
        <Col xs={12} sm={6}>
          <div>
            <UserInfo
              username={user.username}
              email={user.email}
              birthdate={user.birthdate}
            />
          </div>
          <div className="user-update">
            <UpdateUser user={user} onUserUpdate={handleUpdate} />
          </div>
        </Col>
        <Col xs={12} sm={6}>
          <div className="favorite-movies">
            <h3 className="header">Favorite Movies</h3>
            <div className="card-container">
              {favoriteMovies.length > 0 ? (
                <FavoriteMovies
                  movies={favoriteMovies}
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
          </div>
        </Col>
      </Row>
    </Container>
  );
};