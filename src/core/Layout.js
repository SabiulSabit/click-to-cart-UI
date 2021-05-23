import React from "react";

const Layout = ({
  title = "Title",
  description = "Description",
  chilren,
  className,
}) => {
  return (
    <div>
      <div className="jumbotron">
        <h2>{title}</h2>
        <p className="lead">{description}</p>
      </div>

      <div className={className}>
            {chilren}
      </div>
    </div>
  );
};

export default Layout;
