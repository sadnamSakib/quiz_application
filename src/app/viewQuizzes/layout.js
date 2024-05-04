import React from "react";

const Layout = ({ children }) => {
  return (
    <div>
      {/* Add your header component here */}
      <header>{/* Add your header content */}</header>

      {/* Add your main content */}
      <main>{children}</main>

      {/* Add your footer component here */}
      <footer>{/* Add your footer content */}</footer>
    </div>
  );
};

export default Layout;
