import React, { useState, useEffect } from 'react';
import { Button, Icon } from 'semantic-ui-react'; 
import AddReview from './AddReview';
import Review from './Review';

const Listing = ( props ) => {

  const [ listing, setListing ] = useState(props.location.state)
  const [ reviews, setReviews ] = useState([])
  const [ reviewInput, setReviewInput ] = useState(false)
  const [ favorite, setFavorite ] = useState(false)
  const [ favoriteId, setFavoriteId ] = useState(0)

  const URL = "https://realtor-com-real-estate.p.rapidapi.com/property-detail?property_id="
  const faveURL = "http://localhost:3000/favorites"

  console.log(props.user.user)
  console.log(listing)

  //////if listing obj not passed as prop, fetch listing
  useEffect(() => {
    if (!props.location.state) {
      fetchListing(props.match.params.id)
    }
  }, [] )

  const fetchListing = (id) => {
    fetch(URL + id, {
      method: 'GET',
      headers: {
        "x-rapidapi-key": "1a96c214bcmshee3d6c8642e6226p1fd718jsn6cc676cb3bae",
        "x-rapidapi-host": "realtor-com-real-estate.p.rapidapi.com"
      }
    })
    .then(res => res.json())
    .then(data => setListing(data.data))
  }

  //////REVIEWS 
  const renderReviews = () => {
    return (
      reviews.map(review => <Review review={review}/>)
    )
  }

      //CODE: 
      //disable button unless logged in? reroute to signup?
  const toggleReviewInput = () => {
    setReviewInput(!reviewInput)
  } 
  

  
  //////FAVORITE
  const toggleFavorite = () => {
 
    const token = localStorage.token

    if (token) {
      if (!favorite) {
        //create favorite
        fetch(faveURL, {
          method: 'POST',
          headers: {
            'Content-Type' : 'application/json',
            "Authorization" : `Bearer ${token}`
          },
          body: JSON.stringify( {
            user_id : props.user.user.id,
            property_id: listing.property_id
          } )
        })
        .then(res => res.json())
        .then(data => {
          setFavoriteId(data.favorite.id)
          setFavorite(!favorite)
        })
        //props.addToFavorite(listing) ?
      }
  
      if (favorite) {
        //delete favorite
        fetch(faveURL + `/${favoriteId}`, {
          method: 'DELETE', 
          headers: {
            "Authorization" : `Bearer ${token}`
          }
        })
        .then(res => res.json())
        .then(setFavorite(!favorite))
        //props.removeFromFavorites(listing)
        
      }
    }
    
  }

  return (
    <div>
      <h2>{listing.description.name} {favorite ? 
        <Icon name='heart' onClick={toggleFavorite} /> 
        : 
        <Icon name='heart outline' onClick={toggleFavorite} />}</h2>
      

      <div className="listing_images">
        <img src={listing.primary_photo.href}></img>
      </div>

      <div id="listing_deets"> 
        {listing.list_price_min === listing.list_price_max ? 
          <h1>{listing.list_price_min}</h1>
          : 
          <h1>${listing.list_price_min} - ${listing.list_price_max}/mo</h1>
        }

        {listing.description.beds_min == listing.description.beds_max ? 
          <h3>{listing.description.beds_min} br</h3>
          :  
          <h3>{listing.description.beds_min === 0 ? ("studio") : (listing.description.beds_min)} - {listing.description.beds_max} br</h3>
        }
  
        {listing.description.baths_min == listing.description.baths_max ? 
          <h3>{listing.description.baths_min}</h3>
          :
          <h3>{listing.description.baths_min} - {listing.description.baths_max} bath</h3>
        }

        {listing.description.sqft_min == listing.description.sqft_max ? 
          <h4>{listing.description.sqft_min}</h4>
          :
          <h4>{listing.description.sqft_min} - {listing.description.sqft_max} sqft</h4>
        }

        <p>{listing.location.address.line}, {listing.location.address.city}</p>
        <p>Built in {listing.description.year_built}</p>
        <p>*{listing.pet_policy?.cats && listing.pet_policy?.dogs ? ("allows pets") : ("does not allow pets")}*</p>
      
      </div>
        <hr></hr>
        
      <div className="reviews-container">
        <h3>Reviews</h3>

        <div className="reviews">
          {reviews.length === 0 ? 
            <p><i>No one has said anything about this property yet. Be the first!</i></p>
            : 
            renderReviews() 
          }
          
          {reviewInput === false ? 
            <Button basic color="grey" content="Write Review" onClick={toggleReviewInput}/>
            : 
            <AddReview listing={listing} user={props.user.user} token={props.token}/>
          }
          
        </div>

      </div>
    
    </div>
  )
}

export default Listing