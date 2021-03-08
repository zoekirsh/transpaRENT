import React, { useState } from 'react';
import { Grid, Button, Icon } from 'semantic-ui-react';

const URL = "http://localhost:3000/reviews"

function MyReviews( { reviews }) {

  const [ deleted, setDeleted ] = useState(0)
  //
  console.log(reviews)
  //

  //////EDIT REVIEW


  //////DELETE REVIEW
  const deleteReview = (id) => {
    const token = localStorage.token
    fetch(URL + `/${id}`, {
      method: 'DELETE',
      headers: {
        "Authorization" : `Bearer ${token}`
      }
    })
    .then(res => res.json())
    .then(setDeleted(deleted + 1))
  }

  return (
    <div>
      <h2>You have written...</h2>
      <div className="my-review-grid">
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
                <Button basic size="mini" animated="vertical" className="edit-btn">
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
    </div>
  )
}

export default MyReviews;