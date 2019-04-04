import React from "react";
import { NavLink } from "react-router-dom";

const NavBar = () => {
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
      <NavLink to="/signup">Signup</NavLink>
    </div>
  );
};

export default NavBar;
