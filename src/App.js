import React, { useState, useEffect } from 'react';
import './App.css';
import { Route, withRouter, Switch, Redirect } from 'react-router-dom';
import Navbar from './components/Navbar';
import Map from './components/Map';
import ReviewMap from './components/ReviewMap';
import Signup from './components/Signup';
import Login from './components/Login';
import Listing from './components/Listing';
import MyFavorites from './components/MyFavorites'
import MyReviews from './components/MyReviews';
import Profile from './components/Profile';

const URL = "http://localhost:3000"

function App() {

  // state
  const [ user, setUser ] = useState({ user: "i am the user"});
  const [ token, setToken ] = useState("");
  const [ favorites, setFavorites ] = useState([]);
  const [ reviews, setReviews ] = useState([]);

  //// get user on page load
  useEffect(() => {
    fetchUser()
    fetchFavorites()
    fetchReviews()
  }, [])

  /////////////////////////////
  console.log(user, token)
  //console.log("favorites??", favorites)
  console.log("REviews!!", reviews)
  /////////////////////////////

  const fetchUser = () => {
    const token = localStorage.token
    if (token) {
      fetch(URL +'/profile', {
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

  const fetchFavorites = () => {
    const token = localStorage.token
    if (token){
      fetch(URL + '/mylistings', {
        headers: {
          "Authorization" : `Bearer ${token}`
        },
      })
      .then(res => res.json())
      .then(data => setFavorites(data))
    }
  }

  const fetchReviews = () => {
    const token = localStorage.token
    if (token) {
      fetch(URL + '/myreviews', {
        headers: {
          "Authorization" : `Bearer ${token}`
        },
      })
      .then(res => res.json())
      .then(data => setReviews(data))
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
            <Route exact path="/" render={() => <Map favorites={favorites}/>}/>
            <Route exact path="/login" render={() => <Login setUser={setUser}/>}/>
            <Route exact path="/signup" render={() => <Signup setUser={setUser}/>}/>
            
            {/* listed / review routes */} 
            <Route exact path="/list" />
            <Route exact path="/reviews" component={ReviewMap}/> 
            <Route path="/viewlisting/:id" render={(routerProps) => <Listing {...routerProps} user={user} token={token} setReviews={setReviews}/> }/>
            
            {/* user routes */}
            {localStorage.token && ( 
              <>
            <Route exact path="/profile" render={() => <Profile user={user} favorites={favorites} reviews={reviews}/>}/>
            <Route exact path="/mylistings" render={(routerProps) => <MyFavorites {...routerProps} favorites={favorites}/>}/>
            <Route exact path="/myreviews" render={() => <MyReviews reviews={reviews} setReviews={setReviews}/>}/>
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
