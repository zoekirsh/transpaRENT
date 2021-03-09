import React, { useState, useEffect } from 'react';
import Fave from './Fave';
import { Card } from 'semantic-ui-react';

const MyFavorites = ( props ) => {

  const URL = "http://localhost:3000/favorites"
  
  const [ favorites, setFavorites ] = useState([])

  useEffect(() => {
    fetchFavorites()
  }, [])

  const fetchFavorites = () => {
    const token = localStorage.token 

    if (token) {
      fetch(URL, {
        headers: {
          "Authorization" : `Bearer ${token}`
        }
      })
      .then(res => res.json())
      .then(data => setFavorites(data))
    }
    
  }

  const renderFavorites = () => {
    if (favorites.length > 0) {
      return favorites.map(fave => {
        return (
          <Card.Group key={fave.property_id}>
            <Fave fave={fave} />
          </Card.Group>
        )
      })
    } else {
      return ("You have not saved any listings yet.")
    }
  }

  return (
    <div>
      <h3>Saved Listings</h3>

      <div className="favorites-container center">
        {renderFavorites()}
      </div>

    </div>
  )
}

export default MyFavorites