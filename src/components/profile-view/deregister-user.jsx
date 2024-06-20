import React from "react";

export const DeregisterUser = (user, token) => {
  const handleDeregisterClick = () => {
    if (!user || !user.username) {
      console.error("User object or username is missing");
      return;
    }
    fetch(
      `https://mymoviesdb-6c5720b5bef1.herokuapp.com/users/${user.username}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to deregister user");
        }
        return response.json();
      })
      .then((data) => {
        alert("User deregistered successfully!", data);
        // Optionally perform additional actions after deregistration
      })
      .catch((error) => {
        console.error("Error deregistering user: ", error);
        alert("Failed to deregister user. Please try again.");
      });
  };

  return (
    <div>
      <button onClick={handleDeregisterClick}>Deregister User</button>
    </div>
  );
};
