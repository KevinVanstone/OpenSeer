import React, { Component } from "react";
import SearchBar from "../SearchBar/SearchBar.jsx";

class Home extends Component {
  componentDidUpdate(prevProps, props) {
    console.log("The search (and state) was updated to:", this.state.addy);
  }

  render() {
    return (
      <div>
        Enter your Ethereum wallet adress to get started!
        <SearchBar />
      </div>
    );
  }
}

export default Home;
