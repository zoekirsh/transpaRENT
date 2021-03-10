import React, { useState, useEffect } from 'react';
import './App.css';
import { Route, withRouter, Switch, Redirect } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer'; 
import Map from './components/Map';
import ReviewMap from './components/ReviewMap';
import Signup from './components/Signup';
import Login from './components/Login';
import Listing from './components/Listing';
import MyFavorites from './components/MyFavorites'
import MyReviews from './components/MyReviews';
import Profile from './components/Profile';

//base url 
const URL = "http://localhost:3000"
//realtor urls
const realtorAPIKey = "1a96c214bcmshee3d6c8642e6226p1fd718jsn6cc676cb3bae"
const realtorAPIHost = "realtor-com-real-estate.p.rapidapi.com"
const realtorAPIURL = "https://realtor-com-real-estate.p.rapidapi.com/for-rent?city=San%20Diego&state_code=CA&limit=100&offset=0&location=92037-6941"



function App() {

  // state
  const [ user, setUser ] = useState({ user: "i am the user"});
  const [ token, setToken ] = useState("");
  const [ favorites, setFavorites ] = useState([]);
  const [ reviews, setReviews ] = useState([]);
  const [ allListings, setAllListings ] = useState([]);

  //// get user & listings on page load
  useEffect(() => {
    fetchUser()
    fetchFavorites()
    fetchReviews()
    fetchListings()
  }, [])

  /////////////////////////////
  //console.log(user, token)
  //console.log("favorites??", favorites)
  //console.log("Reviews!!", reviews)
  /////////////////////////////

  //////fetch all user data
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

  //////fetch listings from external API
  const fetchListings = () => {
    fetch(realtorAPIURL, {
      method: 'GET',
      headers: {
        'x-rapidapi-key': realtorAPIKey,
        'x-rapidapi-host' : realtorAPIHost
      }
    })
    .then(res => res.json())
    // .then(data => console.log(data.data.results))
    .then(data => setAllListings(data.data.results))
  }


  const handleLogout = () => {
    setFavorites([])
    setReviews([])
    setToken("")
    setUser({ user: "Bye bye"})

    localStorage.clear()
    return <Redirect to="/" push={true}/>
  }

  return (
    <div className="App">
      <header></header>
      <main>
        <div className="Main">
          <Navbar user={ user }/>
          <Switch>
            <Route exact path="/" render={() => <Map favorites={favorites} listings={allListings} user={user}/>}/>
            <Route exact path="/login" render={() => <Login setUser={setUser}/>}/>
            <Route exact path="/signup" render={() => <Signup setUser={setUser}/>}/>
            
            {/* listed / review routes */} 
            <Route exact path="/list" />
            <Route exact path="/reviews" render={() => <ReviewMap allListings={allListings}/>}/> 
            <Route path="/viewlisting/:id" render={(routerProps) => <Listing {...routerProps} user={user} token={token} setFavorites={setFavorites} allFavorites={favorites} setReviewsApp={setReviews} allReviews={reviews}/> }/>
            
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
          {/* <Footer /> */}
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default withRouter(App);
