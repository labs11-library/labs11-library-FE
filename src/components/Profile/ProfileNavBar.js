import React from "react";
import { NavLink } from "react-router-dom";
const ProfileNavBar = () => {
  return (
    <div>
      <NavLink to="/library/inventory">Inventory</NavLink>
      <NavLink to="/library/add-book">Add to My Library</NavLink>
      <NavLink to="/library/checkouts">Checkouts</NavLink>
      <NavLink to="/library/my-info">My Info</NavLink>
    </div>
  );
};

export default ProfileNavBar;
