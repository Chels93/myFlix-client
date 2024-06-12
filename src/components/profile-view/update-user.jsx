import React from "react";

function UpdateUser({ handleSubmit, handleUpdate }) {
  return (
    <Form className="profile-form" onSubmit={(e) => handleSubmit(e)}>
      <h2>Want to change some info?</h2>

      <label>Username:</label>
      <input
        type="text"
        name="username"
        defaultValue={user.username}
        onChange={(e) => handleUpdate(e)}
      />

      <label>Password</label>
      <input
        type="password"
        name="password"
        defaultValue={user.password}
        onChange={(e) => handleUpdate(e)}
      />

      <label>Email Address</label>
      <input
        type="email"
        name="email"
        defaultValue={user.email}
        onChange={(e) => handleUpdate(e.target.value)}
      />

      <Button variant="primary" type="submit">
        Update
      </Button>
    </Form>
  );
}

export default UpdateUser;
