import React, { Component } from "react";
import SearchBar from "../SearchBar/SearchBar.jsx";
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


class Home extends Component {
    state = {
        addy: null,
        userData: null,
        imgurl1: null,
      };



      componentDidUpdate(prevProps, props) {
        const data = this.state;
        console.log("The state has been updated to: ", data);
    
        data.userData.nfts.map((nftObject, index) => {
          console.log(nftObject);
          return (
              <div>
                  <h1>{nftObject.name}</h1>
              </div>
              
          );
        });
      }

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
