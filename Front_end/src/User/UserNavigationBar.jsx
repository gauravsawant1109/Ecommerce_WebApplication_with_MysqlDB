import React, { useContext, useState } from "react";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import NavLogo from "../assets/NavLogo.png";
import "../CSS/NavigationBar.css";
import { UserContext } from "../UserContext/userContext";
import { useNavigate } from "react-router-dom";
import authService from "../Servises/authService";
const UserNavigationBar = () => {
  const { user } = useContext(UserContext);
  console.log("logged User ", user);

  const navigate = useNavigate();

  const handleLogout = () => {
    console.log("logout function called");
    
    authService.logout();
    navigate("/LoginPage");
  };

  return (
    <Navbar expand="lg" className="cu-NavigationBar p-2" style={{ position: "sticky", top: "0", zIndex: "2" }}>
      <Container>
        <Navbar.Brand as={Link} to="/UserHome/HomePage">
          <img src={NavLogo} className="navbarLogo" alt="Logo" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/UserHome/HomePage">Home</Nav.Link>
            <Nav.Link as={Link} to="/UserHome/AddToCartPage">AddToCart</Nav.Link>
            {/* <Nav.Link as={Link} to="/UserHome/WishListPage">WishList</Nav.Link> */}

            {/* <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item as={Link} to="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="#action/3.2">Another action</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item as={Link} to="#action/3.4">Separated link</NavDropdown.Item>
            </NavDropdown> */}
          </Nav>
          <Nav className="ms-auto">
              {user ? (
                          <>
                            <Nav.Link >{user.role=="common user" && "User "  }: {user.name}</Nav.Link>
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

export default UserNavigationBar;
  