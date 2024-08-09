import React from 'react';

export const UserInfo = ({ username, email, birthdate }) => {
    const formattedBirthdate = new Date(birthdate).toLocaleDateString();
  return (
    <>
      <h4>Your Info</h4>
      <p>Name: {username}</p>
      <p>Email: {email}</p>
      <p>Birthdate: {formattedBirthdate}</p>
    </>
  )
}