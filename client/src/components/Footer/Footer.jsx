import React, { Component } from "react";
import "./Footer.scss";

class Footer extends Component {
  render() {
    return (
      <footer>
        <div className="foot-nav">
          <a href="/about">
            <p>About</p>
          </a>
          <a href="/collection">
            <p>Collection</p>
          </a>
          <a href="/gallery">
            <p>Gallery</p>
          </a>
        </div>
      </footer>
    );
  }
}

export default Footer;
