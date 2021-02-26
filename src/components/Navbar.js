import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
//import { Icon, Grid, Menu, Dropdown } from 'semantic-ui-react';
//import stylesheet

const Navbar = ( { user }) => {

  const [dropdownMenu, setDropdownMenu] = useState( {display: "none"} )

  //handleToggleDropdownMenu
  ///// this function will toggle the dropdown menu functionality

  return (
    <div className="navbar-main">
        <nav className="map-review-side">
          <NavLink className="link" exact to="/">Listings</NavLink>
          <NavLink className="link" exact to="/reviews">Reviews</NavLink>
        </nav>
        <h1>transpa<span className="blue">rent</span></h1>
        <nav className="user-side">
          {!user.id ? (
            <>
                <NavLink className="link" exact to="/login">Login</NavLink>
                <NavLink className="link" exact to="/signup">Register</NavLink>
            </>
          ) : (
            <>
                {/* user dropdown */}
                <NavLink className="link" exact to="/">{user.name}</NavLink>
                <NavLink className="link" exact to="/logout">logout</NavLink>
            </>

          ) }
        </nav>
    </div>
  )
}

export default Navbar