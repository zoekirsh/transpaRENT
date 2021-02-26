import React, { useState, useEffect } from 'react';
import './App.css';
import { Route, withRouter, Switch, Redirect } from 'react-router-dom';
import MapContainer from './components/MapContainer';

const URL = "http://localhost:3000"

function App() {

  // state
  const [user, setUser] = useState({ user: "i am the user"});
  const [token, seToken] = useState("");

  //// get user on page load
  useEffect(() => {
    fetchUser()
  }, [])

  const fetchUser = () => {
    const token = localStorage.getItem("token")
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

  return (
    <div className="App">
      <header></header>
      <main>
        <div className="Main">
          {/* removed logo here */}
          <NavBar user={ user }/>
          <Switch>
            <Route exact path="/" component={() => <MapContainer/>}/>
            <Route exact path="/login" />
            <Route exact path="signup" />
            <Route exact path="/logout" />

            <Route exact path="/profile" />
          </Switch>
          <MapContainer />
        </div>
      </main>
      <footer></footer>
    </div>
  );
}

export default withRouter(App);
