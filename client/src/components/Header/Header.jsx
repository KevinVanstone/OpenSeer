import React, { Component } from "react";
import "./Header.scss";
import Logo from "../../assets/images/seer.jpg";
import SearchBar from "../SearchBar/SearchBar.jsx";

class Header extends Component {
  render() {
    return (
      <header className="header">
        <img className="header__logo" src={Logo} alt="Open Seer" />
        Open Seer
        <SearchBar />
        <div className="header__buttons">
        <p>Log In</p>
        <p>Sign Up</p>
        <p>Profile</p>
        </div>
      </header>
    );
  }
}

export default Header;
