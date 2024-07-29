import React, { useState } from "react";
import { Card, Form, Button } from "react-bootstrap";

const UpdateUser = ({ user, onUserUpdate }) => {
    const [username, setUsername] = useState(user.username || "");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState(user.email || "");
    const [birthdate, setBirthdate] = useState(user.birthdate || "");
    const token = localStorage.getItem("token");

    const handleUpdate = (event) => {
        event.preventDefault();
        const updatedUser = {
            username: username || user.username, 
            email: email || user.email,
            birthdate: birthdate || user.birthdate
        };

        if (password) {
            updatedUser.password = password;
        }

        console.log("Updating user with:", updatedUser);

        fetch(`https://mymoviesdb-6c5720b5bef1.herokuapp.com/users/${user.username}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(updatedUser),
        })
        .then((response) => {
            console.log("Response status:", response.status);
            if (!response.ok) {
                throw new Error("Failed to update user.");
        }
            return response.json();
        })
        .then((data) => {
            alert("User updated successfully!");
            onUserUpdate(data);
        })
        .catch((error) => {
            console.error("Error updating user: ", error);
            alert(`Failed to update user: ${error.message}`);
        });
    };

  return (
    <Card className="update-user">
    <Card.Body>
    <Card.Title>Update User Information</Card.Title>
        <Form className="profile-form" onSubmit={handleUpdate}>
          <Form.Group className="mb-3" controlId="formUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Leave blank if you don't want to change."
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Leave blank if you don't want to change."
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Leave blank if you don't want to change."
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBirthdate">
            <Form.Label>Birthdate</Form.Label>
            <Form.Control
              type="date"
              value={birthdate}
              onChange={(e) => setBirthdate(e.target.value)}
            />
          </Form.Group>
          <Button variant="primary" type="submit" >
            Update
          </Button>
        </Form>
        </Card.Body>
        </Card>
  );
};

export default UpdateUser;
