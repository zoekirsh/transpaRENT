import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, Dropdown } from 'semantic-ui-react';
//import stylesheet

const Navbar = ( { user } ) => {

  const [dropdownMenu, setDropdownMenu] = useState( {display: "none"} )

  const leftNav = {
    margin: "0 12px 0",
    padding: "20px"
  }

  const logo = {
    margin: "0 100px 0"
  }

  //handleToggleDropdownMenu
  ///// this function will toggle the dropdown menu functionality

  return (
    <Menu text fluid stackable style={{ margin: 20 }}>
      <Link to="/">
        <Menu.Item
          name="listings"
          style={leftNav}
          >
            Listings
        </Menu.Item>
      </Link>
    
      <Link to="/reviews">
        <Menu.Item
          name="reviews"
          style={leftNav}
          >
            Reviews
        </Menu.Item>
      </Link>

      {/* center it??? */}
      <Link to="/">
        <Menu.Item
          name="home"
          fitted="vertically"
          style={logo}
          >
            <h1>transpa<span className="blue">rent</span></h1>
        </Menu.Item>
      </Link>
      

      {/* if not logged in */}
      <Menu.Menu position="right" style={{ margin: 20 }}>
        <Link to="/login">
          <Menu.Item
            name="login"
            >
              Login
          </Menu.Item>
        </Link>
       
       <Link to="/signup">
        <Menu.Item
            name="signup"
            >
              Sign up
          </Menu.Item>
       </Link>
      </Menu.Menu>

      {/* if logged in */}
      <Menu.Menu position="right" style={{ margin: 20 }}>
        <Dropdown
          item
          text={user.name}
          >
            <Dropdown.Menu>
              <Link to="/profile">
                <Dropdown.Item>Profile</Dropdown.Item>
              </Link>
              <Link to="/mylistings">
                <Dropdown.Item>My Listings</Dropdown.Item>
              </Link>
              <Link to="/myreviews">
                <Dropdown.Item>My Reviews</Dropdown.Item>
              </Link>
            </Dropdown.Menu>
        </Dropdown>

        
        <Link to="/logout">
          <Menu.Item
            name="logout"
            >
              logout
          </Menu.Item>
        </Link>
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