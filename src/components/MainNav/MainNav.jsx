import React from "react";
import { NavLink } from "react-router-dom";

import './MainNav.css';

function MainNav () {
    return (
        <nav>
            <NavLink exact to="/" className="navLink" activeClassName="activeNavLink">
                Home
            </NavLink>
            <NavLink to="/pizza" className="navLink" activeClassName="activeNavLink">
                Order Yourself a Pizza!
            </NavLink>
        </nav>
    );
}

export default MainNav;