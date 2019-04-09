import React, { Component } from "react";
import { NavLink, Link } from "react-router-dom";
import "./layout.css";
class NavBar extends Component {
  constructor() {
    super();
    this.state = {
      menuClassName: "nav-links nav-links-none"
    };
  }

  handleToggleMenu = () => {
    if (this.state.menuClassName === "nav-links nav-links-none") {
      this.setState({
        menuClassName: "nav-links"
      });
    } else {
      this.setState({
        menuClassName: "nav-links nav-links-none"
      });
    }
  };

  logOut = () => {
    localStorage.clear();
  };
  render() {
    const loggedIn = localStorage.getItem("jwt") ? true : false;
    return (
      <div className="navbar-wrapper">
        {loggedIn && (
          <div className="navbar">
            <Link to="/" className="bookmaps-logo">
              {/* Book maps{" "} */}
              <span role="img" aria-label="books">
                📚
              </span>
              <span role="img" aria-label="map">
                🗺
              </span>
            </Link>
            <div className={this.state.menuClassName}>
              <div>
                <Link className="nav-link" to="/my-library">
                  <span role="img" aria-label="books">
                    📚
                  </span>{" "}
                  My Library
                </Link>
              </div>
              <div>
                <Link className="nav-link" to="/add-book">
                  <span role="img" aria-label="plus">
                    ➕
                  </span>{" "}
                  Add book
                </Link>
              </div>
              <div>
                <Link className="nav-link" to="/notifications">
                  <span role="img" aria-label="bell">
                    🔔
                  </span>{" "}
                  Notifications
                </Link>
              </div>
              <div>
                <Link className="nav-link" to="/profile">
                  <span role="img" aria-label="profile">
                    👤
                  </span>{" "}
                  Profile
                </Link>
              </div>
              <div>
                <Link onClick={this.logOut}>
                  <span role="img" aria-label="wave">
                    👋
                  </span>{" "}
                  Log out
                </Link>
              </div>
            </div>
            <div>
              <button className="burger" onClick={this.handleToggleMenu}>
                <div className="burger-div" />
                <div className="burger-div" />
                <div className="burger-div" />
              </button>
            </div>
          </div>
        )}
        {!loggedIn && (
          <div className="navbar">
            <Link to="/" className="bookmaps-logo">
              {/* Book maps{" "} */}
              <span role="img" aria-label="books">
                📚
              </span>
              <span role="img" aria-label="map">
                🗺
              </span>
            </Link>
            <div className={this.state.menuClassName}>
              <div>
                <Link className="nav-link" to="/signup">
                  <span role="img" aria-label="wave">
                    👋
                  </span>{" "}
                  Sign up
                </Link>
              </div>
            </div>
            <div>
              <button className="burger" onClick={this.handleToggleMenu}>
                <div className="burger-div" />
                <div className="burger-div" />
                <div className="burger-div" />
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default NavBar;
