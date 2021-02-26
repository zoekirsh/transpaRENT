import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Menu, Dropdown } from 'semantic-ui-react';
//import stylesheet

const Navbar = ( { user }) => {

  const [dropdownMenu, setDropdownMenu] = useState( {display: "none"} )

  //handleToggleDropdownMenu
  ///// this function will toggle the dropdown menu functionality

  return (
    <Menu text fluid stackable>
      <Menu.Item
        name="listings"
        >
          Listings
      </Menu.Item>
      <Menu.Item
        name="reviews"
        >
          Reviews
      </Menu.Item>

      {/* center it??? */}
      <Link to="/">
        <Menu.Item
          name="home"
          fitted="vertically"
          >
            <h1>transpa<span className="blue">rent</span></h1>
        </Menu.Item>
      </Link>
      

      {/* if not logged in */}
      <Menu.Menu position="right">
        <Menu.Item
          name="login"
          >
            Login
        </Menu.Item>
        <Menu.Item
          name="signup"
          >
            Sign up
        </Menu.Item>
      </Menu.Menu>

      {/* if logged import */}
      <Menu.Menu position="right">
        <Dropdown
          item
          text={user.name}
          >
            <Dropdown.Menu>
              <Link to="/profile">

              </Link>
              <Link to="/mylistings">

              </Link>
              <Link to="/myreviews">
                
              </Link>
            </Dropdown.Menu>
        </Dropdown>

        <Menu.Item
          name="logout"
          >
            logout
        </Menu.Item>
      </Menu.Menu>

    </Menu>




    // <div className="navbar-main">
    //     <nav className="map-review-side">
    //       <NavLink className="link" exact to="/">Listings</NavLink>
    //       <NavLink className="link" exact to="/reviews">Reviews</NavLink>
    //     </nav>
    //     <h1>transpa<span className="blue">rent</span></h1>
    //     <nav className="user-side">
    //       {!user.id ? (
    //         <>
    //             <NavLink className="link" exact to="/login">Login</NavLink>
    //             <NavLink className="link" exact to="/signup">Register</NavLink>
    //         </>
    //       ) : (
    //         <>
    //             {/* user dropdown */}
    //             <NavLink className="link" exact to="/">{user.name}</NavLink>
    //             <NavLink className="link" exact to="/logout">logout</NavLink>
    //         </>

    //       ) }
    //     </nav>
    // </div>
  )
}

export default Navbar