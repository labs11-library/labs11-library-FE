import React from "react";
import { NavLink } from "react-router-dom";
const ProfileNavBar = () => {
  return (
    <div>
      <NavLink style={{ margin: "10px" }} to="/my-library/inventory">
        Inventory
      </NavLink>
      <NavLink style={{ margin: "10px" }} to="/my-library/add-book">
        Add to My Library
      </NavLink>
      <NavLink style={{ margin: "10px" }} to="/my-library/checkouts">
        Checkouts
      </NavLink>
      <NavLink style={{ margin: "10px" }} to="/my-library/my-info">
        My Info
      </NavLink>
      <NavLink style={{ margin: "10px" }} to="/my-library/requests">
        Checkout requests
      </NavLink>
    </div>
  );
};

export default ProfileNavBar;
