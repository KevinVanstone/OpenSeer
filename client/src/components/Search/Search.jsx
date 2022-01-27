import React, { Component } from "react";
import SearchBar from "../SearchBar/SearchBar.jsx";


class Search extends Component {
    state = {
        addy: null,
        userData: null,
        imgurl1: null,
      };

      componentDidUpdate(prevProps, props) {
        const data = this.state;
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
