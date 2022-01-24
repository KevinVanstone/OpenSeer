import React, { Component } from "react";
import "./Header.scss";
import Logo from "../../assets/images/seer.jpg";
import SearchBar from "../SearchBar/SearchBar.jsx";

class Header extends Component {
  render() {
    return (
      <header className="header">
        <a href="/">
        <img className="header__logo" src={Logo} alt="Open Seer" />
        </a>
        <div className="header__nav">
        <a href="/search">
        <p>Search</p>
        </a>
        <p>Profile</p>
        </div>
      </header>
    );
  }
}

export default Header;
