import React from 'react';
import { Dimmer, Loader, Segment } from 'semantic-ui-react';

function MapLoading() {
  return (
    <Segment>
      <Dimmer active inverted>
        <Loader size='large'>getting listings...</Loader>
      </Dimmer>
    </Segment>
  )
}

export default MapLoading