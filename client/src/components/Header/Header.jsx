import React, { Component } from "react";
import "./Header.scss";
import Logo from "../../assets/images/seer.jpg";
import SearchBar from "../SearchBar/SearchBar.jsx";

class Header extends Component {
  render() {
    return (
      <header className="header">
        <img className="header__logo" src={Logo} alt="Open Seer" />
        
        <div className="header__nav"><SearchBar />
        <p>Profile</p>
        </div>
      </header>
    );
  }
}

export default Header;
