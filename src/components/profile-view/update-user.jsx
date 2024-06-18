import React, { useState } from 'react';
import { Card, Form, Button, Alert } from 'react-bootstrap';

export const UpdateUser = ({ user, onUpdateUser }) => {
  const [formData, setFormData] = useState({
    username: user.username,
    password: user.password,
    email: user.email,
    birthdate: user.birthdate
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);
    try {
      UpdateUser(formData);
      setSuccess(true);
    } catch (error) {
      setError('Failed to update user information. Please try again later.');
      console.error('Error updating user data: ', error);
    }
  };

  return (
    <Card className="update-user">
      <Card.Body>
        <Card.Title>Update User Information</Card.Title>
        {error && <Alert variant="danger">{error}</Alert>}
        {success && <Alert variant="success">User information updated successfully!</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              name="username"
              defaultValue={formData.username}
              onChange={handleChange}
              placeholder="Enter new username"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              defaultValue={formData.password}
              onChange={handleChange}
              placeholder="Enter new password"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              name="email"
              defaultValue={formData.email}
              onChange={handleChange}
              placeholder="Enter new email"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBirthdate">
            <Form.Label>Date of Birth</Form.Label>
            <Form.Control
              type="date"
              name="birthdate"
              defaultValue={formData.birthdate}
              onChange={handleChange}
              placeholder="Enter date of birth"
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Update
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
};
