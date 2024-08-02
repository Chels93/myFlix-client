import React, { useState, useEffect, useRef } from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./navigation-bar.scss";

export const NavigationBar = ({ user, onLoggedOut }) => {
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);
  const navbarRef = useRef(null);

  const handleToggle = () => setIsNavbarOpen(!isNavbarOpen);

  const handleClickOutside = (event) => {
    if (navbarRef.current && !navbarRef.current.contains(event.target)) {
      setIsNavbarOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <Navbar
      bg="light"
      expand="lg"
      ref={navbarRef}
      onToggle={() => setIsNavbarOpen(!isNavbarOpen)}
      expanded={isNavbarOpen}
    >
      <Container>
        <Navbar.Brand as={Link} to="/" className="navbar-brand">
          CineVault
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav>
            {user && (
              <>
                <Nav.Link
                  as={Link}
                  to="/"
                  className="nav-home"
                  onClick={() => setIsNavbarOpen(false)}
                >
                  Home
                </Nav.Link>
                <Nav.Link
                  as={Link}
                  to="/profile"
                  className="nav-profile"
                  onClick={() => setIsNavbarOpen(false)}
                >
                  Profile
                </Nav.Link>
                <Nav.Link
                  onClick={() => {
                    onLoggedOut();
                    setIsNavbarOpen(false);
                  }}
                  className="nav-logout"
                >
                  Logout
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
