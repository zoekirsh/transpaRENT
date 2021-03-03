import React, { useState, useEffect } from 'react';
import './App.css';
import { Route, withRouter, Switch, Redirect } from 'react-router-dom';
import Navbar from './components/Navbar';
import Map from './components/Map';
import Signup from './components/Signup';
import Login from './components/Login';
import Listing from './components/Listing';

const URL = "http://localhost:3000"

function App() {

  // state
  const [user, setUser] = useState({ user: "i am the user"})
  const [token, setToken] = useState("");

  //// get user on page load
  useEffect(() => {
    fetchUser()
  }, [])

  /////////////////////////////
  console.log(user, token)
  /////////////////////////////

  const fetchUser = () => {
    const token = localStorage.token
    if (token) {
      fetch(`${URL}/profile`, {
        headers: {
          "Authorization" : `Bearer ${token}`
        },
      })
      .then(res => res.json())
      //.then(console.log)
      .then(data => {
        setUser({ user: data.user })
        setToken(data.token)
      })
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("token")
    setUser({ user: "Bye bye"})
    return <Redirect to="/" push={true}/>
  }

  return (
    <div className="App">
      <header></header>
      <main>
        <div className="Main">
          <Navbar user={ user }/>
          <Switch>
            <Route exact path="/" render={() => <Map />}/>
            <Route exact path="/login" render={() => <Login setUser={setUser}/>}/>
            <Route exact path="/signup" render={() => <Signup setUser={setUser}/>}/>
            
            {/* listed / review routes */} 
            <Route exact path="/list" />
            <Route exact path="/reviews" /> 
            <Route path="/viewlisting/:id" render={(routerProps) => <Listing {...routerProps} user={user} token={token}/> }/>
            
            {/* user routes */}
            {localStorage.token && ( 
              <>
            <Route exact path="/profile" />
            <Route exact path="/mylistings" />
            <Route exact path="/myreviews" />
            <Route exact path="/logout" component={() => handleLogout()}/> 
            </>
            )}

          </Switch>
        </div>
      </main>
      <footer></footer>
    </div>
  );
}

export default withRouter(App);
