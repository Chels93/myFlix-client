import React from 'react';
import "./profile-view.scss";

export const UserInfo = ({ username, email, birthdate }) => {
    const formattedBirthdate = new Date(birthdate).toLocaleDateString();
  return (
    <div className="profile-view-container">
      <h4 className="info-header">Your Info</h4>
      <p className="info-label" data-label="Name:">{username}</p>
      <p className="info-label" data-label="Email:">{email}</p>
      <p className="info-label" data-label="Birthdate:">{formattedBirthdate}</p>
    </div>
  )
}