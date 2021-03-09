import React, { useState } from 'react';
import { Form } from 'semantic-ui-react';

function EditReview( { review, editReview }) {

  const [ newReview, setNewReview ] = useState({
    text: review.text,
    address: review.address,
    user_id: review.user_id,
    city: review.city,
    state: review.state,
    zipcode: review.zipcode,
    lat: review.lat,
    lng: review.lng
  })

  const handleChange = (e, value) => {
    e.persist()
    console.log(value)
    setNewReview({...newReview, text: value.value})
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    editReview(newReview)
  }

  return (
    <div className="center edit-review">
      <Form className="text-area" onSubmit={handleSubmit}>
      
        <Form.TextArea className="text-area" name="text" value={newReview.text} onChange={handleChange} required />
        <Form.Button>Edit</Form.Button>

      </Form>
  </div>
  )
}

export default EditReview