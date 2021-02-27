import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Grid, Menu, Dropdown } from 'semantic-ui-react';

const Navbar = ( { user } ) => {

  const [dropdownMenu, setDropdownMenu] = useState( {display: "none"} )

  const nav = {
    margin: "0 12px 0",
    padding: "20px"
  }

  const logo = {
    margin: "0 100px 0"
  }

  //handleToggleDropdownMenu
  ///// this function will toggle the dropdown menu functionality

  return (
    <Grid columns={4}>
      <Grid.Column>
       <Menu text fluid stackable style={{ margin: 20 }}>
          <Link to="/">
            <Menu.Item
              name="listings"
              style={nav}
              >
                Listings
            </Menu.Item>
          </Link>
        
          <Link to="/reviews">
            <Menu.Item
              name="reviews"
              style={nav}
              >
                Reviews
            </Menu.Item>
          </Link>
        </Menu>
      </Grid.Column>
     

        {/* center it??? */}
      <Grid.Column>
        <Menu text fluid stackable style={{ margin: 20 }}>
          <Link to="/">
            <Menu.Item
              name="home"
              fitted="vertically"
              style={logo}
              >
                <h1>transpa<span className="blue">rent</span></h1>
            </Menu.Item>
          </Link>
        </Menu>
      </Grid.Column>
        

        {/* if not logged in */}
      <Grid.Column>
        <Menu text fluid stackable style={{ margin: 20 }}>
          <Link to="/login">
            <Menu.Item
              name="login"
              style={nav}
              >
                Login
            </Menu.Item>
          </Link>
        
        <Link to="/signup">
          <Menu.Item
              name="signup"
              style={nav}
              >
                Sign up
            </Menu.Item>
        </Link>
        </Menu>
      </Grid.Column>

        {/* if logged in */}
      <Grid.Column>
        <Menu text fluid stackable style={{ margin: 20 }}>
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
              style={nav}
              >
                logout
            </Menu.Item>
          </Link>
        </Menu>
      </Grid.Column>

    </Grid>



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