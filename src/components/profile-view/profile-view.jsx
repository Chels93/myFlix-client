import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import "./profile-view.scss";
import axios from "axios";
import UserInfo from "./user-info";

export function ProfileView({ movies, onUpdatedUserInfo }) {
  const [user, setUser] = useState({});

  const favoriteMovieList = movies.filter((movies) => {});

  const getUser = () => {};
  const handleSubmit = (e) => {};
  const removeFav = (id) => {};
  const handleUpdate = (e) => {};

  useEffect(() => {}, []);

  return (
    <div>
      <UserInfo name={user.username} email={user.email} />
     
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
    </div>
  );
}
