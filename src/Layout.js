import React from "react";
import { Link } from "react-router-dom";

const Layout = ({ children }) => (
  <div>
    <header>
      <div className="container">
        <div id="branding">
          <h1><span className="highlight">Product</span> Review App</h1>
        </div>
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/add">Add Review</Link></li>
          </ul>
        </nav>
      </div>
    </header>
    <div className="container">
      <main>{children}</main>
    </div>
    <footer>
      <p>© Allan Tanaka</p>
    </footer>
  </div>
);

export default Layout;