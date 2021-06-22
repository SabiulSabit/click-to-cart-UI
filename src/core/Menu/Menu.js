import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Link, withRouter } from "react-router-dom";
import { signout, isAuthenticate } from "../../auth/index";
import { itemTotal } from "../cartHelpers";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartPlus, faSignInAlt, faUserPlus, faHome, faStore, faChartLine, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
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
        <Navbar.Brand as={Link} to="/">Encodemy</Navbar.Brand>
        <Nav className="ml-auto">
          <Nav.Link
            as={Link}
            
            to="/"
            style={isActive(history, "/")}
          >
            Home <FontAwesomeIcon icon={faHome} />
          </Nav.Link>
          <Nav.Link as={Link} to="/shop" style={isActive(history, "/shop")}>
            Shop <FontAwesomeIcon icon={faStore} />
          </Nav.Link>
          <Nav.Link as={Link} to="/cart" style={isActive(history, "/cart")}>
            Cart <FontAwesomeIcon icon={faCartPlus} /> <sup> {itemTotal()}</sup>
          </Nav.Link>

          {isAuthenticate() && isAuthenticate().user.role === 0 && (
            <Nav.Link
              as={Link}
              to="/user/dashboard"
              style={isActive(history, "/user/dashboard")}
            >
              Dashboard <FontAwesomeIcon icon={faChartLine} />
            </Nav.Link>
          )}

          {isAuthenticate() && isAuthenticate().user.role === 1 && (
            <Nav.Link
              as={Link}
              to="/admin/dashboard"
              style={isActive(history, "/admin/dashboard")}
            >
              Dashboard <FontAwesomeIcon icon={faChartLine} />
            </Nav.Link>
          )}

          {!isAuthenticate() && (
            <>
              <Nav.Link
                as={Link}
                to="/signin"
                style={isActive(history, "/signin")}
              >
                Signin  <FontAwesomeIcon icon={faSignInAlt} />
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/signup"
                style={isActive(history, "/signup")}
              >
                Signup <FontAwesomeIcon icon={faUserPlus} />
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
               Signout  <FontAwesomeIcon icon={faSignOutAlt} />
              </Nav.Link>
            </>
          )}
        </Nav>
      </Navbar>
    </div>
  );
};

export default withRouter(Menu);
