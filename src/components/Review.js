import React from 'react';

const Review = ( props ) => {
  //console.log("here!!", review)
  return(
    <div className="review" >
      <div className="review-text">
        <p>{props.review.text}</p>
      </div>
      <div className="review-user">
        <p>- {props.review.user?.name}</p>
      </div>
    </div>
  )
}

export default Review