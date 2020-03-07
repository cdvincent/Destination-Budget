import React from "react";
import { Link } from "react-router-dom";
import logo from "./logo.jpg"
// Depending on the current path, this component sets the "active" class on the appropriate navigation link item
function Navbar(props) {

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark " expand="lg">
      <button class="navbar-toggler pull-right" type="button" data-toggle="collapse" data-target=".dual-collapse2">
            <span class="navbar-toggler-icon"></span>
        </button>
      <div className="navbar-collapse collapse w-100 dual-collapse2 order-1 order-md-0 welcome">
        Welcome back, {props.username}!
      <button className="btn-secondary logout" onClick={props.logout}>Log out</button>
      </div>
      <div>
      <Link className="mx-auto" to="/trips"
      >
      <img src={logo} className="rounded-circle logo" />
      </Link>
      </div>
      <div className="navbar-collapse collapse w-100 order-3 dual-collapse2">
      <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <Link
              to="/budget"
              className={
                window.location.pathname === "/" || window.location.pathname === "/budget"
                  ? "nav-link active"
                  : "nav-link"
              }
            >
              Budget
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/search"
              className={window.location.pathname === "/search" ? "nav-link active" : "nav-link"}
            >
              Search
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/trips"
              className={window.location.pathname === "/trips" ? "nav-link active" : "nav-link"}
            >
              My Trips
            </Link>
          </li>
        </ul>
    </div>
    </nav>
  );
}

export default Navbar;
