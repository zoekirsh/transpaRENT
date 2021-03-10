import React from 'react';
import { Icon } from 'semantic-ui-react';

function Footer() {
  return (
    <footer className="footer">
      <div className="icon-container center">
        <div className="footer-icons">
          <span className="footer-icon">
            <a target="_blank" rel="noopener noreferrer" href="https://github.com/zoekirsh">
              <Icon name="github"/>
            </a>
          </span>
          <span className="footer-icon">
            <a target="_blank" rel="noopener noreferrer" href="https://zoekirsh.medium.com/">
              <Icon name="medium"/>
            </a>
          </span>
          <span className="footer-icon">
            <a target="_blank" rel="noopener noreferrer" href="https://www.linkedin.com/in/zoe-kirsh-5792a35b/">
              <Icon name="linkedin"/>
            </a>
          </span>
        </div>
      </div>
    </footer>
  )
}

export default Footer 