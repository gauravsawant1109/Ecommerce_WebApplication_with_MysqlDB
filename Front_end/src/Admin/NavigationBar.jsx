import React, { useContext } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import NavLogo from "../assets/NavLogo.png";
import "../CSS/NavigationBar.css";
import authService from "../Servises/authService";
import { UserContext } from "../UserContext/userContext";
import { Link, useNavigate } from "react-router-dom";
const NavigationBar = () => {
  const { user } = useContext(UserContext);
  console.log("logged User ", user);

  const navigate = useNavigate();

  const handleLogout = () => {
    authService.logout();
    navigate("/LoginPage");
  };
  return (
    <Navbar
      expand="lg"
      className="cu-NavigationBar p-2"
      style={{ position: "sticky", top: "0", zIndex: "2" }}
    >
      <Container>
        <Navbar.Brand href="#home">
          <img src={NavLogo} className="navbarLogo" alt="Logo" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#link">Link</Nav.Link>
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav className="ms-auto">
            {user ? (
              <>
                <Nav.Link >{user.role}:{user.name}</Nav.Link>
                <Nav.Link  onClick={handleLogout}>
                  LogOut
                </Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/LoginPage">Login </Nav.Link>
                <Nav.Link as={Link} to="/Registration">Register</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
