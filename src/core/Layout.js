import React from "react";
import Menu from "./Menu/Menu";
import Footer from "./Footer/Footer";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../style.css'

const Layout = ({
  title = "Title",
  description = "Description",
  children,
  className,
}) => {
  return (
    <div>
      <Menu />
      <div className="jumbotron">
        <h2>{title}</h2>
        <p className="lead">{description}</p>
      </div>

      <div className={className}>
            {children}
      </div>

      <Footer />
    </div>
  );
};

export default Layout;
