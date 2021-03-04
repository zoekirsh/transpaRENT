import React from 'react';

const Review = ( review ) => {
  console.log("here!!", review)
  return(
    <div className="review" >
      <div className="review-text">
        <p>{review.review.text}</p>
      </div>
      <div className="review-user">
        <p>- {review.review.user.name}</p>
      </div>
    </div>
  )
}

export default Review