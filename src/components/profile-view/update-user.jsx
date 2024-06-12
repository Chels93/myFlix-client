import React from "react";

function UpdateUser({ handleSubmit, handleUpdate }) {
  return (
    <>
      <h4>Update</h4>
      <Form>
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
