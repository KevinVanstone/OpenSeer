import React, { Component } from "react";
import "./Footer.scss";
import SearchBar from "../SearchBar/SearchBar.jsx";
import Logo from "../../assets/images/seer.jpg";


class Footer extends Component {
  render() {
    return (
      <footer>
        <img className="header__logo" src={Logo} alt="Open Seer" />
        
        <div className="foot-nav">
          <p>About</p>
          <p>Collection</p>
          <p>Slideshow</p>
        </div>
      </footer>
    );
  }
}

export default Footer;
