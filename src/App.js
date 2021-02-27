import React, { useState, useEffect } from 'react';
import './App.css';
import { Route, withRouter, Switch, Redirect } from 'react-router-dom';
import Navbar from './components/Navbar';
import Map from './components/Map';
import Signup from './components/Signup';

const URL = "http://localhost:3000"

function App() {

  // state
  const [user, setUser] = useState({ user: "i am the user"});
  //const [token, setToken] = useState("");

  //// get user on page load
  useEffect(() => {
    fetchUser()
  }, [])

  const fetchUser = () => {
    const token = localStorage.token
    if (token) {
      fetch(`${URL}/profile`, {
        headers: {
          "Authorization" : `Bearer ${token}`
        },
      })
      .then(res => res.json())
      .then(console.log)
      // .then(data => setUser({ user: data.user}))
    }
  }

  const handleSignup = (e, userInfo) => {
    e.preventDefault()
    //if (data.user) {
    //   localStorage.setItem("token", data.token)
    //   setUser(data.user)
    // }
  }

  return (
    <div className="App">
      <header></header>
      <main>
        <div className="Main">
          {/* removed logo here */}
          <Navbar user={ user }/>
          <Switch>
            <Route exact path="/" component={() => <Map/>}/>
            <Route exact path="/login" />
            <Route exact path="/signup" render={() => <Signup />}/>
            
            {/* localStorage.token && ( 
              <>  */}
            {/* user routes
            <Route exact path="/profile" />
            <Route exact path="/mylistings" />
            <Route exact path="/myreviews" />
            <Route exact path="/logout" /> 
            </>
            ) */}
            

{/*      
        
        listed / review routes
            <Route exact path="/list" />
            <Route exact path="/reviews" /> */}

          </Switch>
        </div>
      </main>
      <footer></footer>
    </div>
  );
}

export default withRouter(App);
