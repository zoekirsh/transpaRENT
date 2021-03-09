import React from 'react';
import { Dimmer, Loader, Segment } from 'semantic-ui-react';

function Loading() {
  return (
    <Segment>
      <Dimmer active inverted>
        <Loader size='large'>Loading</Loader>
      </Dimmer>
    </Segment>
  )
}

export default Loading