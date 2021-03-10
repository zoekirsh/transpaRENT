import React from 'react';
import Fave from './Fave';
import { Card } from 'semantic-ui-react';

const MyFavorites = ( {favorites} ) => {

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
      return (<div className="center-message">When you save a listing, it will appear here.</div>)
    }
  }

  return (
    <div>
      <h3 className="grey">Saved Listings</h3>

      <div className="favorites-container center">
        {renderFavorites()}
      </div>

    </div>
  )
}

export default MyFavorites