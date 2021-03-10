import React from 'react';
import { Icon } from 'semantic-ui-react';

function Footer() {
  return (
    <footer className="footer">
      <div className="icon-container center">
        <div className="footer-icons">
          <span className="footer-icon"><Icon name="github"/></span>
          <span className="footer-icon"><Icon name="medium"/></span>
          <span className="footer-icon"><Icon name="linkedin"/></span>
        </div>
      </div>
    </footer>
  )
}

export default Footer 