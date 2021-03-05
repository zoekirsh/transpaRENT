import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Card } from 'semantic-ui-react';

const Fave = ( props ) => {

  const URL = "https://realtor-com-real-estate.p.rapidapi.com/property-detail?property_id="

  const [ listing, setListing ] = useState({location: "loading"})
  //const history = useHistory() 

  console.log(listing)
  //console.log(props.fave) 

  useEffect(() => {
    fetchFave(props.fave.property_id)
  }, [])

  //call to api with property_id
  const fetchFave = (id) => {
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

  //onClick for card
  //id = property_id
  // const goToShowPage = (id) => {
  //   history.push({
  //     pathname: `/viewlisting/${id}`
  //   })
  // }
  
  return (
    <div className="space-between">
      <Card fluid >
        <Card.Content>
          <Card.Header>{listing.location?.address?.line}</Card.Header>
          <Card.Meta>{listing.description?.beds_min == 0 
            ? "studio" 
            : listing.description?.beds_min} - {listing.description?.beds_max}br  <span>{listing.description?.type}</span>
          </Card.Meta>
          <Card.Description>${listing?.list_price_min} - ${listing?.list_price_max}/mo</Card.Description>
        </Card.Content>
      </Card>
    </div>
  )
}

export default Fave