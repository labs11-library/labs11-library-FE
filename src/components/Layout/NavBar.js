import React from "react";
import { NavLink } from "react-router-dom";

const NavBar = () => {
  const loggedIn = localStorage.getItem("jwt") ? true : false;
  function logOut() {
    localStorage.clear();
  }
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-evenly"
      }}
    >
      <NavLink to="/">
        {/* Book maps{" "} */}
        <span role="img" aria-label="books">
          📚
        </span>
        <span role="img" aria-label="map">
          🗺
        </span>
      </NavLink>
      <NavLink to="/my-library">My Library</NavLink>
      <NavLink to="/add-book">Add book</NavLink>
      <NavLink to="/notifications">Notifications</NavLink>
      <NavLink to="/profile">Profile</NavLink>
      {!loggedIn && <NavLink to="/signup">Signup</NavLink>}
      {loggedIn && <NavLink onClick={logOut}>Logout</NavLink>}
    </div>
  );
};

export default NavBar;
