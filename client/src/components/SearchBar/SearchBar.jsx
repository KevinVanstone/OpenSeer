import React, { Component } from "react";
import axios from "axios";
import DisplayNFTs from "../DisplayNFTs/DisplayNFTs.jsx";

var validator = require("validator");

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
    imgurl1: null,
  };

  componentDidUpdate(prevProps, props) {
    const data = this.state;
    console.log("The state has been updated to: ", data);
  }

  // Function to search for wallet address
  walletSearch = (event) => {
    event.preventDefault();

    // Assign variable to target the form contents
    const data = event.target;
    const addyToSearch = data.search.value;
    console.log("Looking up wallet addy:", addyToSearch);

    // Check if the search parameter is a valid ETH wallet addy
    if (validator.isEthereumAddress(addyToSearch)) {
      console.log("ETH address valid! Assets pending...");

      axios
        .request(options)
        .then((response) => {
          const data = response.data;
          console.log(data);
          this.setState({
            userData: data,
            addy: addyToSearch,
          });
          console.log(this.state);
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      console.log("ETH address INVALID!");
    }
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
        {this.state.userData && (
          <DisplayNFTs NFTObjects={this.state.userData} />
        )}
      </div>
    );
  }
}

export default SearchBar;
