import React from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import logo from "../image/logo.jpg";

const Navbar = () => {
  let history = useNavigate;
  let location = useLocation();
  const hendleLogout = () => {
    localStorage.removeItem("token");
    history("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <img
        style={{ width: "3%", borderRadius: "50%", marginLeft: "2rem" }}
        src={logo}
        alt="Logo"
      />
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">
          NoteOnCloud
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink
                className={`nav-link ${
                  location.pathname === "/" ? "active" : ""
                }`}
                aria-current="page"
                to="/"
              >
                Home
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                className={`nav-link ${
                  location.pathname === "/abt" ? "active" : ""
                }`}
                to="/about"
              >
                About
              </NavLink>
            </li>
          </ul>
          {!localStorage.getItem("token") ? (
            <form className="d-flex">
              <NavLink
                className="btn btn-outline-info btn-sm mx-2"
                to="/login"
                role="button"
              >
                Login
              </NavLink>
              <NavLink
                className="btn btn-outline-info btn-sm mx-2"
                to="/signup"
                role="button"
              >
                Signup
              </NavLink>
            </form>
          ) : (
            <NavLink
              className="btn btn-outline-info btn-sm mx-2"
              role="button"
              onClick={hendleLogout}
            >
              Logout
            </NavLink>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
