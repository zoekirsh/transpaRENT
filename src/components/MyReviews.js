import React, { useState } from 'react';
import { Grid, Button, Icon } from 'semantic-ui-react';
import EditReview from './EditReview';

const URL = "http://localhost:3000/reviews"

function MyReviews( { reviews, setReviews }) {
  //
  console.log(reviews)
  //

  const [ edit, setEdit ] = useState(null)
  const [ selected, setSelected ] = useState(null)

  //////EDIT REVIEW
  const editClick = (obj) => {
    setSelected(obj)
    setEdit(true)
  }

  const editReview = (review) => {
    const token = localStorage.token

    const newReviews = reviews.filter(rev => rev.id !== selected.id)

    fetch(URL + `/${selected.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type' : 'application/json',
        'Accepts' : 'application/json',
        "Authorization" : `Bearer ${token}`
      },
      body: JSON.stringify( review )
    })
    .then(res => res.json())
    .then(data => {
      setReviews([data.review, ...newReviews])
      setEdit(false)
    })

  }


  //////DELETE REVIEW
  const deleteReview = (id) => {
    const token = localStorage.token

    const newReviews = reviews.filter(review => review.id !== id)

    fetch(URL + `/${id}`, {
      method: 'DELETE',
      headers: {
        "Authorization" : `Bearer ${token}`
      }
    })
    .then(res => res.json())
    .then(setReviews(newReviews))
  }

  if (edit) {
    return <EditReview review={selected} editReview={editReview} />
  }

  return (
    <div>
      <h3 className="grey">Your Reviews</h3>
      {reviews.length > 0 
      ? <div className="my-review-grid">
          <Grid>
          {reviews.map(review => 
            <Grid.Row container="true" columns="equal" key={review.id}>
              <Grid.Column floated="left" width={5}>
                <div>
                  <p><i>"{review.text}"</i></p>
                  <p>{review.address}</p>
                </div>
              </Grid.Column>
              <Grid.Column floated="left" width={1}>

                <Button.Group>
                  <Button basic size="mini" animated="vertical" className="edit-btn" onClick={() => editClick(review)}>
                    <Button.Content hidden>
                      Edit
                    </Button.Content>
                    <Button.Content visible>
                      <Icon name="edit" />
                    </Button.Content>
                  </Button>
                  
                  <Button basic size="mini" animated="vertical" onClick={() => deleteReview(review.id)}>
                    <Button.Content hidden>
                      Delete
                    </Button.Content>
                    <Button.Content visible>
                      <Icon name="trash alternate" />
                    </Button.Content>
                  </Button>
                </Button.Group>

              </Grid.Column>
            </Grid.Row>     
          )}
          </Grid>
        </div>
      : <div className="center-message">When you write a review, it will appear here.</div>
      }
      

    </div>
  )
}

export default MyReviews;