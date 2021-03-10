import React, { useState } from 'react';
import { Form } from 'semantic-ui-react';


const AddReview = ( props ) => {

  const URL = "http://localhost:3000/reviews"

  const [ reviewDetails, setReviewDetails ] = useState({ 
    text: ""
  })

  //console.log(reviewDetails)
  //console.log("Props.reviews @ Add Review", props.reviews)

  const formatReview = () => {
    if (props.listing) {
      return {
        text: reviewDetails.text,
        address: props.listing.location.address.line, 
        user_id: props.user.id, 
        city: props.listing.location.address.city, 
        state: props.listing.location.address.state_code, 
        zipcode: props.listing.location.address.postal_code,
        lat: props.listing.location.address.coordinate.lat,
        lng: props.listing.location.address.coordinate.lon
      }
    }

    if (props.noListingDetails) {
      return {
        text: reviewDetails.text,
        address: props.noListingDetails.address, 
        user_id: props.user.id, 
        city: props.noListingDetails.city, 
        state: props.noListingDetails.state, 
        zipcode: null,
        lat: props.noListingDetails.lat,
        lng: props.noListingDetails.lng
      }
    }
  }


  const createReview = (e) => {
    e.preventDefault();
    const token = localStorage.token

    if (token) {
      fetch(URL, {
        method: 'POST',
        headers: {
          'Content-Type' : 'application/json',
          "Authorization" : `Bearer ${token}`
        },
        body: JSON.stringify( formatReview() )
      })
      .then(res => res.json())
      .then(data => {
        props.setReviewsListing([...props.listingReviews, data.review])
        props.setReviewsApp([...props.allReviews, data.review])
        props.setReviewInput(false)
      })
    } 
   
  }

  const handleChange = (e, value) => {
    e.persist()
    //console.log(value)
    setReviewDetails({text: value.value })
  }

  return (
    <div className="center">
      <Form className="text-area" onSubmit={createReview}>
      
        <Form.TextArea 
          className="text-area" 
          name="text" 
          value={reviewDetails.text} 
          onChange={handleChange} 
          placeholder="Share something about your experience living at this property..." 
          required
        />
        <Form.Button>Publish</Form.Button>

      </Form>
    </div>
  )
}

export default AddReview