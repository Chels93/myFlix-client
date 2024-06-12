import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button, Form } from "react-bootstrap";

const UpdateUser = ({ user, handleSubmit, handleUpdate }) => {
  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
    handleUpdate({ ...user, username: e.target.value });
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    handleUpdate({ ...user, email: e.target.value });
  };

  return (
    <>
      <h4>Update</h4>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Username:</Form.Label>
          <Form.Control
            type="text"
            value={username}
            onChange={handleUsernameChange}
            required
            placeholder="Enter a username"
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Email:</Form.Label>
          <Form.Control
            type="email"
            value={email}
            onChange={handleEmailChange}
            required
            placeholder="Enter your email address"
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Update
        </Button>
      </Form>
    </>
  );
};

UpdateUser.propTypes = {
  user: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleUpdate: PropTypes.func.isRequired,
};

export default UpdateUser;
