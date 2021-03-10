import React from 'react';

function Profile( props ) {
  //console.log(props)

  return (
    <div>
      <h3 className="grey">hello, {props.user.user.name}</h3>
      <br></br>
      <h4><span role="img" aria-label="round pushpin">📍</span> {props.user.user.city}</h4>
      <br></br>
      <p>You have {props.favorites.length} listings saved. </p>
      
      {props.reviews.length === 1 
        ? <p>You've reviewed 1 property. </p> 
        : <p>You've reviewed {props.reviews.length} properties. </p>
      }

      <div id="profile-gif">
        <img src="/house-animation-lag.gif" alt="animated house gif"/>
      </div>
      
    </div>
    
  )
}

export default Profile 