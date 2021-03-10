import React, { useState, useEffect } from 'react';
import { Button, Icon } from 'semantic-ui-react'; 
import AddReview from './AddReview';
import Review from './Review';
import Loading from './Loading';
import ImageCarousel from './ImageCarousel';
import NoListing from './NoListing';

const Listing = ( props ) => {
  console.log(props)

  const [ absent, setAbsent ] = useState(false)
  const [ listing, setListing ] = useState(props.location.state.listing)
  const [ reviews, setReviews ] = useState([])
  const [ reviewInput, setReviewInput ] = useState(false)
  const [ favorite, setFavorite ] = useState(false)
  const [ favoriteId, setFavoriteId ] = useState(0)

  const URL = "https://realtor-com-real-estate.p.rapidapi.com/property-detail?property_id="
  const faveURL = "http://localhost:3000/favorites"
  const reviewURL = "http://localhost:3000/getreviews"

  //console.log(props.user.user)
  //console.log("Listing=", listing)
  //console.log("Reviews from listing =>", reviews)

  useEffect(() => {
    //console.log("STATE nested listing", props.location.state.listing)

    if (!props.location.state.listing) {
      if (props.location.state.nolisting) { 
        return handleNoListing() 
      }
      return fetchListing(props.match.params.id)
    }
    fetchReviews(props.location.state.listing.location.address.line)
    isFavorite(props.location.state.listing.property_id)
  }, [] )

  const handleNoListing = () => {
    fetchReviews(props.location.state.review)
    setAbsent(true)
  }

  ////// on page load
  const fetchListing = (id) => {
    console.log("bingo")
    fetch(URL + id, {
      method: 'GET',
      headers: {
        "x-rapidapi-key": "1a96c214bcmshee3d6c8642e6226p1fd718jsn6cc676cb3bae",
        "x-rapidapi-host": "realtor-com-real-estate.p.rapidapi.com"
      }
    })
    .then(res => res.json())
    .then(data => {
      setListing(data.data)
      fetchReviews(data.data.location.address.line)
      isFavorite(data.data.property_id)
    })
  }


  const fetchReviews = (address) => {
    fetch(reviewURL + `/${address}`)
    .then(res => res.json())
    .then(data => setReviews(data))
  }
  

  const isFavorite = (property_id) => {
    const token = localStorage.token

    if (token) {
      fetch(faveURL + `/${property_id}`, {
        headers: {
          "Authorization" : `Bearer ${token}`
        }
      })
      .then(res => res.json())
      .then(data => {
        if (data) {
          setFavorite(true)
        }
      })
    }
   
  }

  //////REVIEWS 
  const renderReviews = () => {
    return (
      reviews.map(review => <Review review={review} key={review.id}/>)
    )
  }

      //disable button unless logged in? reroute to signup?
  const toggleReviewInput = () => {
    setReviewInput(!reviewInput)
  } 

  const formatPrice = (min, max) => {
    if ( min === max ) {
      return `$${min}/mo`
    } else {
      return `$${min} - $${max}/mo`
    }
  }
  
  const formatBeds = (min, max) => {
    if ( min === 0 ) {
      min = "studio"
    }

    return `${min} - ${max}br`
  }
  
  ////// ADD / REMOVE FAVORITE
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
            property_id: listing.property_id,
            primary_photo: listing.primary_photo.href,
            address: listing.location.address.line,
            price: formatPrice(listing.list_price_min, listing.list_price_max),
            beds: formatBeds(listing.description.beds_min, listing.description.beds_max),
            apartment: listing.description.type
          } )
        })
        .then(res => res.json())
        .then(data => {
          setFavoriteId(data.favorite.id)
          setFavorite(!favorite)
        })
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
        
      }
    }
    
  }

  const primaryPhoto = () => {
    //console.log("HERE!!!", props.location.state)
    return listing?.primary_photo ? 
    listing?.primary_photo.href
    :
    props.location.state.href 
  }

  if (!listing && !absent) {
    return <Loading />
  }

  return (
    <div className="parent-container">

      {absent 
      ? <NoListing /> 
      :  <div className="listing-container">
          <h2>{listing?.description?.name} {favorite 
            ? <Icon name='heart' onClick={toggleFavorite} /> 
            : <Icon name='heart outline' onClick={toggleFavorite} />}
          </h2>
          
          <div className="listing_images">
            <ImageCarousel primary={primaryPhoto()} images={listing.photos}/>
          </div>

          <div id="listing_deets"> 
            {listing?.list_price_min === listing?.list_price_max 
              ? <h1>{listing?.list_price_min}</h1>
              : <h1>${listing?.list_price_min} - ${listing?.list_price_max}/mo</h1>
            }

            {listing?.description?.beds_min === listing?.description?.beds_max 
              ? <h3>{listing?.description?.beds_min} br</h3>
              : <h3>{listing?.description?.beds_min === 0 
                ? ("studio") 
                : (listing?.description?.beds_min)} - {listing?.description?.beds_max} br
                </h3>
            }
      
            {listing?.description?.baths_min === listing?.description?.baths_max 
              ? <h3>{listing?.description?.baths_min}</h3>
              : <h3>{listing?.description?.baths_min} - {listing?.description?.baths_max} bath</h3>
            }

            {listing?.description?.sqft_min === listing?.description?.sqft_max 
              ? <h4>{listing?.description?.sqft_min}</h4>
              : <h4>{listing?.description?.sqft_min} - {listing?.description?.sqft_max} sqft</h4>
            }

            <p>{listing?.location?.address?.line}, {listing?.location?.address?.city}</p>
            <p>Built in {listing?.description?.year_built}</p>
            <p>*{listing?.pet_policy?.cats && listing?.pet_policy?.dogs 
              ? ("allows pets") 
              : ("does not allow pets")}*
            </p>
          </div>

        </div>
      }

      <hr></hr>
        
      <div className="reviews-container">
        <h3>Reviews</h3>

        <div className="reviews">
          {reviews.length === 0 
            ? <p><i>No one has said anything about this property yet. Be the first!</i></p>
            : renderReviews() 
          }
          
          {reviewInput === false 
            ? (typeof(props.user.user) === "string" 
              ? <Button disabled content="Log in to review" /> 
              : <Button basic color="grey" content="Write Review" onClick={toggleReviewInput}/>
              )
            : <AddReview 
              listing={listing} 
              user={props.user.user} 
              setReviewsListing={setReviews} 
              setReviewsApp={props.setReviewsApp} 
              setReviewInput={setReviewInput} 
              allReviews={props.allReviews}
              listingReviews={reviews} 
              noListingDetails={props.location.review}
              />
          }
          
        </div>

      </div>
    
    </div>
  )
}

export default Listing