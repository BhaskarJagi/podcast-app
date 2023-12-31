import React from "react";
import "./styles.css";
import { Link, useLocation } from "react-router-dom";

function Header() {
  const location = useLocation();
  const currentPath = location.pathname;
  return (
    <div className="nav-bar">
      <div className="gradient-effect"></div>
      <div className="links">
        <Link to="/" className={currentPath === "/" ? "active" : ""}>
          Signup
        </Link>
        <Link
          to="/podcasts"
          className={currentPath.includes("podcasts") ? "active" : ""}
        >
          Podcasts
        </Link>
        <Link
          to="/create-a-podcast"
          className={currentPath === "/create-a-podcast" ? "active" : ""}
        >
          Start a Podcast
        </Link>
        <Link
          to="/profile"
          className={currentPath === "/profile" ? "active" : ""}
        >
          Profile
        </Link>
      </div>
    </div>
  );
}

export default Header;
