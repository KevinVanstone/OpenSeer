import React, { Component } from "react";
import "./Header.scss";
import Logo from "../../assets/images/seer.png";

class Header extends Component {
  render() {
    return (
      <header className="header">
        <div className="header__home">
        <a className="header__home" href="/">
        <img className="header__logo" src={Logo} alt="Open Seer" />
        <p>Open Seer</p>
        </a>
        </div>
        <div className="header__nav">
        <a href="/search">
        <p>Search</p>
        </a>
        <a href="/profile">
        <p>Profile</p>
        </a>
        </div>
      </header>
    );
  }
}

export default Header;
