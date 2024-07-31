import React from 'react';
import "./profile-view.scss";

export const UserInfo = ({ username, email, birthdate }) => {
    const formattedBirthdate = new Date(birthdate).toLocaleDateString();
  
    return (
        <div className="profile-view-container">
            <h4 className="info-header">Your Info</h4>
            <p className="info-label">
                <span className="info-label-text">Name: </span> 
                <span className="info-value">{username}</span>
            </p>
            <p className="info-label">
                <span className="info-label-text">Email: </span> 
                <span className="info-value">{email}</span>
            </p>
            <p className="info-label">
                <span className="info-label-text">Birthdate: </span> 
                <span className="info-value">{formattedBirthdate}</span>
            </p>
        </div>
    );
};
