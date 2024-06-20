import React from 'react';

function UserInfo ({ username, email, birthday }) {
  return (
    <>
      <h4>Your Info</h4>
      <p>Name: {username}</p>
      <p>Email: {email}</p>
      <p>Birthday: {birthday}</p>
    </>
  )
}

export default UserInfo