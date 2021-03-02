import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Grid, Menu, Dropdown } from 'semantic-ui-react';
import '../App.css';

///CODE: dropdown for list view / map view

const Navbar = ( { user } ) => {

  //const [dropdownMenu, setDropdownMenu] = useState( {display: "none"} )

  const nav = {
    padding: "20px"
  }

  const logo = {
    margin: "0 100px 0"
  }

  // const right = {
  //   "justify-content": "flex-end"
  // }

  //handleToggleDropdownMenu
  ///// this function will toggle the dropdown menu functionality

  return (
    <Grid columns={3}>
      <Grid.Column className="left-nav">
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
     
      {/* logo */}
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
        

      {/* logged in ? YES : NO */}
      {!user.user.id ? (
        <>
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
        </>
      ) : (
        <>
          <Grid.Column id="right-nav">
            <Menu text fluid stackable style={{ margin: 20 }}>
              <Dropdown
                item
                text={user.user.name}
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
        </>
      ) }

    </Grid>
  )
}

export default Navbar