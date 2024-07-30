import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "./login-view.scss";

export const LoginView = ({ onLoggedIn, onSignedUp }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [isLogin, setIsLogin] = useState(true);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {
      username,
      password,
      ...(email && { email }),
      ...(birthdate && { birthdate }),
    };

    const url = isLogin
      ? "https://mymoviesdb-6c5720b5bef1.herokuapp.com/login"
      : "https://mymoviesdb-6c5720b5bef1.herokuapp.com/users";

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(isLogin ? "Login failed" : "Signup failed");
      }

      const responseData = await response.json();
      if (isLogin) {
        localStorage.setItem("user", JSON.stringify(responseData.user));
        localStorage.setItem("token", responseData.token);
        onLoggedIn(responseData.user, responseData.token);
      } else {
        alert("Sign-up successful! Please log in.");
        setIsLogin(true);
      }
    } catch (error) {
      alert(`Something went wrong: ${error.message}`);
    }
  };

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setUsername("");
    setPassword("");
    setEmail("");
    setBirthdate("");
  };

  return (
    <div className="form-container">
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
            minLength={isLogin ? "6" : undefined}
          />
        </Form.Group>

        {!isLogin && (
          <>
            <Form.Group controlId="formEmail">
              <Form.Label>Email:</Form.Label>
              <Form.Control
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
          </>
        )}

        <Button variant="primary" type="submit" className="submit-button">
          {isLogin ? "Login" : "Sign Up"}
        </Button>
      </Form>
      <Button variant="link" onClick={toggleForm} className="toggle-button">
        {isLogin
          ? "Don't have an account? Sign up."
          : "Already have an account? Login."}
      </Button>
    </div>
  );
};
