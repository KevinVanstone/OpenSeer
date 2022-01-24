import React, { Component } from "react";
import "./Footer.scss";
import Logo from "../../assets/images/seer.jpg";

class Footer extends Component {
  render() {
    return (
      <footer>
        <a href="/">
          <img className="header__logo" src={Logo} alt="Open Seer" />
        </a>

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
