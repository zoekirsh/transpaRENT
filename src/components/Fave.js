import React from 'react';
import { useHistory } from 'react-router-dom';
import { Card } from 'semantic-ui-react';

const Fave = ( props ) => {

  //const [ fave, setFave ] = useState(props.fave)

  console.log("FAVE!", props) 

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
          <Card.Header>{props.fave.address}</Card.Header>
          <Card.Meta>{props.fave.beds} <span>{props.fave.type}</span>
          </Card.Meta>
          <Card.Description>{props.fave.price}</Card.Description>
        </Card.Content>
      </Card>
    </div>
  )
}

export default Fave