import React, { Component } from "react";
import "./Home.scss";
import { Link } from "react-router-dom";

class Home extends Component {
  render() {
    return (
      <div>
        <div className="home">
          <Link to="/search">
            <h1>Search</h1>
          </Link>
          <Link to="/collection">
            <h1>Collection</h1>
          </Link>
          <Link to="/slideshow">
            <h1>Slideshow</h1>
          </Link>
          <Link to="/about">
            <h1>About Open Seer</h1>
          </Link>
        </div>
      </div>
    );
  }
}

export default Home;
