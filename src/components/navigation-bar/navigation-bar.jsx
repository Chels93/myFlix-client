import { Navbar, Container, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./navigation-bar.scss";

export const NavigationBar = ({ user, onLoggedOut }) => {
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/" className="navbar-brand">
          CineVault
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav>
            {user && (
              <>
                <Nav.Link as={Link} to="/" className="nav-home">
                  Home
                </Nav.Link>
                <Nav.Link as={Link} to="/profile" className="nav-profile">
                  Profile
                </Nav.Link>
                <Nav.Link onClick={onLoggedOut} className="nav-logout">
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
