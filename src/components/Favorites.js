import React from 'react';
import Fave from './Fave';
import { Card } from 'semantic-ui-react';

const Favorites = ( props ) => {

  console.log(props) 

  const renderFavorites = () => {
    if (props.favorites.length > 0) {
      return props.favorites.map(fave => {
        return (
          <Card.Group key={fave.property_id}>
            <Fave history={"history"} fave={fave} />
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

export default Favorites