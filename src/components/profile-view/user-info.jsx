import React from 'react';

export const UserInfo = ({ username, email, birthdate }) => {
  return (
    <>
      <h4>Your Info</h4>
      <p>Name: {username}</p>
      <p>Email: {email}</p>
      <p>Birthdate: {birthdate}</p>
    </>
  )
}