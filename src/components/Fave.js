import React from 'react';
import { useHistory } from 'react-router-dom';
import { Card, Image } from 'semantic-ui-react';

const Fave = ( props ) => {

  //console.log("FAVE!", props) 
  const history = useHistory();
  
  ///////onClick for card
  const goToShowPage = (property_id) => {
    history.push({
      pathname: `/viewlisting/${property_id}`,
      state: {
        href: props.fave.primary_photo
      }
    })
  }
  
  return (
    <div className="space-between">
      <Card fluid onClick={() => goToShowPage(props.fave.property_id)}>
        <Card.Content>
          <Card.Header>
            <Image
              floated='left'
              size='small'
              src={props.fave.primary_photo}
            />
            {props.fave.address}
            </Card.Header>
          <Card.Meta>{props.fave.beds} <span>{props.fave.type}</span>
          </Card.Meta>
          <Card.Meta>{props.fave.price}</Card.Meta>
        </Card.Content>
      </Card>
    </div>
  )
}

export default Fave