import React from "react";

const Layout = ({ children }) => {
  return (
    <div className="container p-6 m-6">
      <div className="row">
        <div className="col-md-6 offset-md-3">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
