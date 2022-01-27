import React, { Component } from "react";
import axios from "axios";
import DisplayNFTs from "../DisplayNFTs/DisplayNFTs.jsx";
import DisplayNFTSearch from "../DisplayNFTSearch/DisplayNFTSearch.jsx";
import "./SearchBar.scss";

var validator = require("validator");

const options = {
  params: { chain: "ethereum" },
  headers: {
    "Content-Type": "application/json",
    Authorization: "037cdd3e-56da-4996-abc3-14b16993e4d5",
  },
};

const options2 = {
  headers: {
    "Content-Type": "application/json",
    Authorization: "037cdd3e-56da-4996-abc3-14b16993e4d5",
  },
};

class SearchBar extends Component {
  state = {
    addy: null,
    userData: null,
    collectionData: null,
    imgurl1: null,
    isLoading: false,
  };

  componentDidUpdate(prevProps, props) {
    const data = this.state;
  }

  // Function to search for wallet address
  walletSearch = (event) => {
    this.setState({
      isLoading: true,
    });
    event.preventDefault();

    // Assign variable to target the form contents
    const data = event.target;
    const addyToSearch = data.search.value;

    // Check if the search parameter is a valid ETH wallet addy
    if (validator.isEthereumAddress(addyToSearch)) {
      axios
        .get(`https://api.nftport.xyz/v0/accounts/${addyToSearch}`, options)
        .then((response) => {
          const data = response.data;
          this.setState({
            userData: data,
            addy: addyToSearch,
            isLoading: false,
          });
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      axios
        .get(`https://api.nftport.xyz/v0/search?text=${addyToSearch}`, options2)
        .then((response) => {
          const data = response.data;
          this.setState({
            collectionData: data,
            addy: addyToSearch,
            isLoading: false,
          });
        })
        .catch(function (error) {
          console.error(error);
        });
    }
  };

  blockSearch = (event) => {
    this.setState({
      isLoading: true,
    });
    event.preventDefault();

    // Assign variable to target the form contents
    const data = event.target;
    const addyToSearch = data.nftsearch.value;

    // Check if the search parameter is a valid ETH wallet addy
    if (validator.isEthereumAddress(addyToSearch)) {
      axios
        .get(`https://api.nftport.xyz/v0/accounts/${addyToSearch}`, options)
        .then((response) => {
          const data = response.data;
          this.setState({
            userData: data,
            addy: addyToSearch,
            isLoading: false,
          });
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      axios
        .get(`https://api.nftport.xyz/v0/search?text=${addyToSearch}`, options2)
        .then((response) => {
          const data = response.data;
          this.setState({
            collectionData: data,
            addy: addyToSearch,
            isLoading: false,
          });
        })
        .catch(function (error) {
          console.error(error);
        });
    }
  };

  render() {
    return (
      <>
        <div className="search">
          <h1 className="search__hed">Open Seer</h1>
          <h2 className="search__prompt">
            Enter any Ethereum wallet address or search for your favorite NFT by
            artist or collection to get started.
          </h2>
          <form
            className="search__form"
            id="nftSearch"
            onSubmit={this.walletSearch}
          >
            <input
              id="search"
              className="search__input"
              type="text"
              placeholder="0x..."
            />
            <button className="search__btn" type="submit" form="nftSearch">
              Search Ethereum
            </button>
          </form>

          {this.state.isLoading && <p>Loading...please wait</p>}
        </div>
        <div>
          {this.state.userData && (
            <DisplayNFTs NFTObjects={this.state.userData} />
          )}
          {this.state.collectionData && (
            <DisplayNFTSearch NFTObjects={this.state.collectionData} />
          )}
        </div>
      </>
    );
  }
}

export default SearchBar;
