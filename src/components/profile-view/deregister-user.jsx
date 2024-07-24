import React from "react";

export const DeregisterUser = ({ user, token }) => {
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
          "Content-Type": "application/json"
        },
      }
    )
      .then((response) => {
        if (!response.ok) {
            return response.text().then((text) => {
                console.error("Error response text: ", text);
                throw new Error(text || "Failed to deregister user");
            });
        }
        return response.text();
      })
      .then((data) => {
        alert("User deregistered successfully! " + data);
       localStorage.removeItem("token");
       localStorage.removeItem("user");
       window.location.reload();
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
