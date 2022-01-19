import React, { Component } from "react";
import SearchBar from "../SearchBar/SearchBar.jsx";
import axios from "axios";


class Search extends Component {
    state = {
        addy: null,
        userData: null,
        imgurl1: null,
      };

      componentDidUpdate(prevProps, props) {
        const data = this.state;
        console.log("The state has been updated to: ", data);
      }


  render() {
    return (
      <div>
        <SearchBar />
      </div>
    );
  }
}

export default Search;
