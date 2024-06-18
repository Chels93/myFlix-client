import React from 'react';

// This function should be in the parent component or a custom hook managing state
export const fetchUserData = (username, token, setUser, setFavoriteMovies) => {
  fetch(`https://mymoviesdb-6c5720b5bef1.herokuapp.com/users/${username}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      setUser(data); // Assuming setUser is a state updater function
      setFavoriteMovies(data.favoriteMovies); // Assuming setFavoriteMovies is a state updater function
    })
    .catch((error) => console.error("Error fetching user data: ", error));
};

export const UserInfo = ({ name, email, birthday }) => {
  return (
    <>
      <h4>Your Info</h4>
      <p>Name: {name}</p>
      <p>Email: {email}</p>
      <p>Birthday: {birthday}</p>
    </>
  );
};