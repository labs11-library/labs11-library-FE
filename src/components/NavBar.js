import React from 'react';
import { NavLink } from 'react-router-dom';

const NavBar = () => {
    return ( 
        <div style={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-evenly"}}>
            <NavLink to="/">Book maps{" "}
                <span role="img" aria-label="books">
                    📚
                </span>
                <span role="img" aria-label="map">
                    🗺
                </span>
            </NavLink>
            <NavLink to="/books">Books</NavLink>
            <NavLink>Inventory</NavLink>
            <NavLink>Checked Out</NavLink>
            <NavLink to="/profile">Profile</NavLink>
            <NavLink to="/signup">Signup</NavLink>
        </div>
    );
}
 
export default NavBar;