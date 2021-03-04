import React, { useState } from 'react';
import { Form } from 'semantic-ui-react';


const AddReview = ( props ) => {

  const URL = "http://localhost:3000/reviews"

  const [ reviewDetails, setReviewDetails ] = useState({ 
    text:"", 
    address: props.listing.location.address.line, 
    user_id: props.user.id, 
    city: props.listing.location.address.city, 
    state: props.listing.location.address.state_code, 
    zipcode: props.listing.location.address.postal_code 
  })

  // console.log(reviewDetails)
  // console.log(props.user)


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
        body: JSON.stringify( reviewDetails )
      })
      .then(res => res.json())
      .then(data => props.setReviews([...props.reviews, data]))
      //render to page
    } 
   
  }

  const handleChange = (e, value) => {
    e.persist()
    //console.log(value)
    setReviewDetails({...reviewDetails, text: value.value })
  }

  return (
    <div className="center">
      <Form className="text-area" onSubmit={createReview}>
      
        <Form.TextArea className="text-area" name="text" value={reviewDetails.text} onChange={handleChange} placeholder="Share something about your experience living at this property..." required/>
        <Form.Button>Publish</Form.Button>

      </Form>
    </div>
  )
}

export default AddReview