import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

export const SignupView = ({ onSignedUp }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthdate, setBirthdate] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {
      username: username,
      password: password,
      email: email,
      birthdate: birthdate,
    };

    console.log("Data being sent:", data);

    try {
      const response = await fetch(
        "https://mymoviesdb-6c5720b5bef1.herokuapp.com/users",
        {
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        const userData = await response.json();
        alert("Signup successful");
        onSignedUp(userData.user, userData.token);
      } else {
        try {
          const errorData = await response.json();
          alert(`Signup failed: ${errorData.message || response.statusText}`);
        } catch (error) {
          const errorText = await response.text();
          alert(`Signup failed: $(errorText)`);
        }
      }
    } catch (error) {
      console.error("Error during fetch:", error);
      alert("Signup failed: Network or server error");
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formUsername">
        <Form.Label>Username:</Form.Label>
        <Form.Control
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          minLength="3"
        />
      </Form.Group>

      <Form.Group controlId="formPassword">
        <Form.Label>Password:</Form.Label>
        <Form.Control
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group controlId="formBirthday">
        <Form.Label>Birthday:</Form.Label>
        <Form.Control
          type="date"
          value={birthdate}
          onChange={(e) => setBirthdate(e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group controlId="formEmail">
        <Form.Label>Email:</Form.Label>
        <Form.Control
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};
