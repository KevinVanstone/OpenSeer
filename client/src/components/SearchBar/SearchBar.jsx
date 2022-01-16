import React, { Component } from "react";
import axios from "axios";

const options = {
  method: "GET",
  url: "https://api.nftport.xyz/v0/accounts/0xeb74c032c15f12c6ecd4250205add29f0aa1fed6",
  params: { chain: "ethereum" },
  headers: {
    "Content-Type": "application/json",
    Authorization: "037cdd3e-56da-4996-abc3-14b16993e4d5",
  },
};

class SearchBar extends Component {
  state = {
    addy: null,
    userData: null,
  };

  // Function to search for wallet address
  walletSearch = (event) => {
    event.preventDefault();

    // Assign variable to target the form contents
    const data = event.target;
    const addyToSearch = data.search.value;
    console.log("Looking up wallet addy:", addyToSearch);

    axios
      .request(options)
      .then((response) => {
        const data = response.data;
        this.setState({
          addy: addyToSearch,
          userData: data,
        });
        console.log(this.state);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  render() {
    return (
      <div>
        <form className="wallet-search" onSubmit={this.walletSearch}>
          <input
            id="search"
            className="header__search-bar"
            type="text"
            placeholder="Search"
          />
        </form>
      </div>
    );
  }
}

export default SearchBar;
