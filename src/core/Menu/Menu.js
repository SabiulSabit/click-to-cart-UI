import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Link, withRouter } from "react-router-dom";
import { signout, isAuthenticate } from "../../auth/index";
import { itemTotal } from "../cartHelpers";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartPlus,
  faSignInAlt,
  faUserPlus,
  faHome,
  faStore,
  faChartLine,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import "./Menu.css";

const isActive = (history, path) => {
  if (history.location.pathname === path) {
    return { color: "#ff5959" };
  } else {
    return { color: "#364f6b" };
  }
};

const Menu = ({ history }) => {
  return (
    <div  className="navbar_nav">
      <Navbar >
        <Navbar.Brand as={Link} to="/" className="brandName">
          Click To Cart
        </Navbar.Brand>
        <Nav className="ml-auto">
          <Nav.Link as={Link} to="/" style={isActive(history, "/")}>
            <FontAwesomeIcon icon={faHome} /> Home
          </Nav.Link>
          <Nav.Link as={Link} to="/shop" style={isActive(history, "/shop")}>
            <FontAwesomeIcon icon={faStore} /> Shop
          </Nav.Link>
          <Nav.Link as={Link} to="/cart" style={isActive(history, "/cart")}>
            <FontAwesomeIcon icon={faCartPlus} /> <sup> {itemTotal()}</sup> Cart
          </Nav.Link>

          {isAuthenticate() && isAuthenticate().user.role === 0 && (
            <Nav.Link
              as={Link}
              to="/user/dashboard"
              style={isActive(history, "/user/dashboard")}
            >
              <FontAwesomeIcon icon={faChartLine} />
              Dashboard
            </Nav.Link>
          )}

          {isAuthenticate() && isAuthenticate().user.role === 1 && (
            <Nav.Link
              as={Link}
              to="/admin/dashboard"
              style={isActive(history, "/admin/dashboard")}
            >
              <FontAwesomeIcon icon={faChartLine} /> Dashboard
            </Nav.Link>
          )}

          {!isAuthenticate() && (
            <>
              <Nav.Link
                as={Link}
                to="/signin"
                style={isActive(history, "/signin")}
              >
                <FontAwesomeIcon icon={faSignInAlt} /> Signin
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/signup"
                style={isActive(history, "/signup")}
              >
                <FontAwesomeIcon icon={faUserPlus} /> Signup
              </Nav.Link>
            </>
          )}

          {isAuthenticate() && (
            <>
              <Nav.Link
                as={Link}
                to="/"
                style={{ cursor: "pointer", color: "#364f6b" }}
                onClick={() =>
                  signout(() => {
                    history.push("/");
                  })
                }
              >
                <FontAwesomeIcon icon={faSignOutAlt} /> Signout
              </Nav.Link>
            </>
          )}
        </Nav>
      </Navbar>

      <hr />
    </div>
  );
};

export default withRouter(Menu);
