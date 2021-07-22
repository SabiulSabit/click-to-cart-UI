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

//css
import "./Menu.css";

//set active page color code
const isActive = (history, path) => {
  if (history.location.pathname === path) {
    return { color: "#ff5959" };
  } else {
    return { color: "white" };
  }
};

const Menu = ({ history }) => {

  // all menu item
  return (
    <div  className="navbar_nav">
      <Navbar expand="lg" >
        <Navbar.Brand as={Link} to="/" className="brandName">
          Click To Cart
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          <Nav.Link as={Link} to="/" style={isActive(history, "/")}>
            <FontAwesomeIcon icon={faHome} /> <span className="navItem">Home</span> 
          </Nav.Link>
          <Nav.Link as={Link} to="/shop" style={isActive(history, "/shop")}>
            <FontAwesomeIcon icon={faStore} /><span className="navItem">  Shop </span>
          </Nav.Link>
          <Nav.Link as={Link} to="/cart" style={isActive(history, "/cart")}>
            <FontAwesomeIcon icon={faCartPlus} /> <sup> {itemTotal()}</sup> <span className="navItem">Cart </span>
          </Nav.Link>

          {isAuthenticate() && isAuthenticate().user.role === 0 && (
            <Nav.Link
              as={Link}
              to="/user/dashboard"
              style={isActive(history, "/user/dashboard")}
            >
              <FontAwesomeIcon icon={faChartLine} />
              <span className="navItem"> Dashboard</span> 
            </Nav.Link>
          )}

          {isAuthenticate() && isAuthenticate().user.role === 1 && (
            <Nav.Link
              as={Link}
              to="/admin/dashboard"
              style={isActive(history, "/admin/dashboard")}
            >
              <FontAwesomeIcon icon={faChartLine} />  <span className="navItem"> Dashboard</span> 
            </Nav.Link>
          )}

          {!isAuthenticate() && (
            <>
              <Nav.Link
                as={Link}
                to="/signin"
                style={isActive(history, "/signin")}
              >
                <FontAwesomeIcon icon={faSignInAlt} />  <span className="navItem"> Signin</span> 
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/signup"
                style={isActive(history, "/signup")}
              >
                <FontAwesomeIcon icon={faUserPlus} />  <span className="navItem"> Signup</span> 
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
                <FontAwesomeIcon icon={faSignOutAlt} />  <span className="navItem"> Signout</span>  
              </Nav.Link>
            </>
          )}
        </Nav>
        </Navbar.Collapse>
      </Navbar>

      <hr />
    </div>
  );
};

export default withRouter(Menu);
