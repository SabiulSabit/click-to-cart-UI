import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Link, withRouter } from "react-router-dom";
import { signout, isAuthenticate } from "../../auth/index";
import { itemTotal } from "../cartHelpers";
import "./Menu.css";

const isActive = (history, path) => {
  if (history.location.pathname === path) {
    return { color: "#feb062" };
  } else {
    return { color: "white" };
  }
};

const Menu = ({ history }) => {
  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="#home">Encodemy</Navbar.Brand>
        <Nav className="ml-auto">
          <Nav.Link
            as={Link}
            className="nav-link"
            to="/"
            style={isActive(history, "/")}
          >
            Home
          </Nav.Link>
          <Nav.Link as={Link} to="/shop" style={isActive(history, "/shop")}>
            Shop
          </Nav.Link>
          <Nav.Link as={Link} to="/cart" style={isActive(history, "/cart")}>
            Cart
          </Nav.Link>

          {isAuthenticate() && isAuthenticate().user.role === 0 && (
            <Nav.Link
              as={Link}
              to="/user/dashboard"
              style={isActive(history, "/user/dashboard")}
            >
              Dashboard
            </Nav.Link>
          )}

          {isAuthenticate() && isAuthenticate().user.role === 1 && (
            <Nav.Link
              as={Link}
              to="/admin/dashboard"
              style={isActive(history, "/admin/dashboard")}
            >
              Dashboard
            </Nav.Link>
          )}

          {!isAuthenticate() && (
            <>
              <Nav.Link
                as={Link}
                to="/signin"
                style={isActive(history, "/signin")}
              >
                Signin
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/signup"
                style={isActive(history, "/signup")}
              >
                Signup
              </Nav.Link>
            </>
          )}

          {isAuthenticate() && (
            <>
              <Nav.Link
                as={Link}
                to="/"
                style={{ cursor: "pointer", color: "white" }}
                onClick={() =>
                  signout(() => {
                    history.push("/");
                  })
                }
              >
               Signout
              </Nav.Link>
            </>
          )}
        </Nav>
      </Navbar>
    </div>
  );
};

export default withRouter(Menu);
