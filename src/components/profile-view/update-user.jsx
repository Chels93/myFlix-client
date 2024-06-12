import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button, Form } from "react-bootstrap";

const UpdateUser = ({ handleSubmit, handleUpdate }) => {
    const [username, setUsername] = useState(user.username);
    const [email, setEmail] = useState(user.email);

  return (
    <>
      <h4>Update</h4>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Username:</Form.Label>
          <Form.Control
            type="text"
            defaultValue={user.username}
            onChange={(e) => handleUpdate(e)}
            required
            placeholder="Enter a username"
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Password:</Form.Label>
          <Form.Control
            type="password"
            defaultValue=""
            onChange={(e) => handleUpdate(e)}
            required
            minLength="8"
            placeholder="Your password must be 8 or more characters"
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Email:</Form.Label>
          <Form.Control
            type="email"
            defaultValue={user.email}
            onChange={(e) => handleUpdate(e)}
            required
            placeholder="Enter your email address"
          />
        </Form.Group>
        <Button variant="primary" type="submit" onClick={handleSubmit}>
          Update
        </Button>
      </Form>
    </>
  );
}

export default UpdateUser;
