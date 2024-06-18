import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";
import { MovieCard } from "../movie-card/movie-card";
import { UpdateUser } from "./update-user";
import { UserInfo } from "./user-info";
import "./profile-view.scss";

export const ProfileView = ({ movies, onUpdatedUserInfo }) => {
  const [user, setUser] = useState({});
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const token = localStorage.getItem('token'); // Assuming token is stored in localStorage

  useEffect(() => {
    getUser();
  }, []);

  const getUser = () => {
    // Fetch user data based on logged-in user's username
    fetch(`https://mymoviesdb-6c5720b5bef1.herokuapp.com/users`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setUser(data); // Update user state with fetched data
        // Filter movies array to get favorite movies of the user
        const FavoriteMovies = movies.filter((movie) => user.FavoriteMovies.includes(movie._id));
        setFavoriteMovies(FavoriteMovies); // Update favorite movies state
      })
      .catch((error) => console.error('Error fetching user data: ', error));
  };

  // Function to handle user update
  const handleUpdateUser = (updatedUser) => {
    // Perform update user API call
    fetch(`https://mymoviesdb-6c5720b5bef1.herokuapp.com/users/${user.username}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updatedUser),
    })
      .then((response) => response.json())
      .then((data) => {
        setUser(data); // Update user state with updated data
        alert('User information updated successfully!');
      })
      .catch((error) => console.error('Error updating user data: ', error));
  };

  // Function to handle user deregistration
  const handleDeregister = () => {
    // Perform deregister API call
    fetch(`https://mymoviesdb-6c5720b5bef1.herokuapp.com/users/${user.username}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // Optionally, handle response after deregistration
        alert('User deregistered successfully!');
        // Clear user data from state or redirect to login page
      })
      .catch((error) => console.error('Error deregistering user: ', error));
  };

  return (
    <Container className="profile-view">
      <Row>
        <Col xs={12} sm={4}>
          <Card>
            <Card.Body>
              <UserInfo name={user.username} email={user.email} birthday={user.birthday}/>
              <Button variant="danger" onClick={handleDeregister} className="mt-3">
                Deregister
              </Button>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card>
            <Card.Body>
              <UpdateUser user={user} setUser={setUser} onUpdateUser={handleUpdateUser} /> 
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row className="mt-3">
        <Col>
          <h3>Favorite Movies</h3>
          <Row>
            {favoriteMovies.map((movie) => (
              <Col key={movie._id} xs={12} sm={6} md={4} lg={3}>
                <MovieCard movie={movie} />
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </Container>
  );
};
