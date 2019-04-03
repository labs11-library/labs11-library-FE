import React from "react";
import { NavLink } from "react-router-dom";
const ProfileNavBar = () => {
  return (
    <div>
      <NavLink style={{margin: "10px"}} to="/library/inventory">Inventory</NavLink>
      <NavLink style={{margin: "10px"}} to="/library/add-book">Add to My Library</NavLink>
      <NavLink style={{margin: "10px"}} to="/library/checkouts">Checkouts</NavLink>
      <NavLink style={{margin: "10px"}} to="/library/my-info">My Info</NavLink>
      <NavLink style={{margin: "10px"}} to="/library/requests">Checkout requests</NavLink>
    </div>
  );
};

export default ProfileNavBar;
