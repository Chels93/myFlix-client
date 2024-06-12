import React from "react";
import PropTypes from "prop-types";

const UserInfo = ({ name, email }) => {
  return (
    <>
      <h4>Your Info</h4>
      <p>Name: {name}</p>
      <p>Email: {email}</p>
    </>
  );
};

UserInfo.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
};

export default UserInfo;
