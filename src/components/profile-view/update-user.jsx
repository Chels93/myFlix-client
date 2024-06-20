import React from "react";
import { Card, Form, Button } from "react-bootstrap";

const UpdateUser = ({ user, handleSubmit, handleUpdate }) => {
    if (!user) {
        return <div>User data not available</div>;
      }
      const { username, email, password, birthday  } = user;
  return (
    <Card className="update-user">
    <Card.Body>
    <Card.Title>Update User Information</Card.Title>
        <Form className="profile-form" onSubmit={(e) => handleSubmit(e)}>
          <Form.Group className="mb-3" controlId="formUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              name="username"
              defaultValue={username}
              onChange={handleUpdate}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              defaultValue={password}
              onChange={handleUpdate}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              name="email"
              defaultValue={email}
              onChange={handleUpdate}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBirthday">
            <Form.Label>Birthday</Form.Label>
            <Form.Control
              type="date"
              name="birthday"
              defaultValue={birthday}
              onChange={handleUpdate}
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
