import React from 'react';
import { Card, ListGroup } from 'react-bootstrap';

export const UserInfo = ({ name, email, dob }) => {
  return (
    <Card className="user-info">
      <Card.Body>
        <Card.Title>User Information</Card.Title>
        <ListGroup variant="flush">
          <ListGroup.Item>
            <strong>Name:</strong> {name}
          </ListGroup.Item>
          <ListGroup.Item>
            <strong>Email:</strong> {email}
          </ListGroup.Item>
          <ListGroup.Item>
            <strong>Date of Birth:</strong> {dob ? new Date(dob).toLocaleDateString() : 'N/A'}
          </ListGroup.Item>
        </ListGroup>
      </Card.Body>
    </Card>
  );
};
