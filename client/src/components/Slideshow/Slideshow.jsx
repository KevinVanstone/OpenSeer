import React, { Component } from "react";
import axios from "axios";
import "./Slideshow.scss";
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from "react-icons/fa";

const AUTH_TOKEN_KEY = "clientAuthToken";

class Slideshow extends Component {
  state = {
    collectionData: null,
    count: 0,
    setCurrent: null,
    collectionNeeded: true,
  };

  fetchProfile = () => {
    // Assign token via local storage then send GET with bearer token
    const authToken = localStorage.getItem(AUTH_TOKEN_KEY);

    axios
      .get("http://localhost:8080/profile", {
        headers: {
          authorization: `Bearer ${authToken}`,
        },
      })
      // Set state with return data of authorized profile data 
      .then((response) => {
        this.setState({
          profileData: response.data,
          isLoggedIn: true,
        });
        console.log(response.data);
      });
  };

  // Function to fetch NFTs from database using profile data available
  fetchNFTs = (email) => {
    console.log("Fetching NFTs...");
    console.log(email);
    axios
      .post("http://localhost:8080/collections/db", {
          email: email,
      })
      .then((response) => {
        console.log(response.data);
        this.setState({
          collectionData: response.data,
          collectionNeeded: false,
        });
      });
  };


  componentDidMount() {
    this.fetchProfile();

    // axios
    //   .get(`http://localhost:8080/collections/`)
    //   .then((response) => {
    //     console.log("Collection retrieved:", response.data);
    //     this.setState({
    //       collectionData: response.data,
    //     });
    //   })
    //   .catch((err) => console.log(err));
  }

  componentDidUpdate() {

    if (this.state.profileData.tokenInfo.email && this.state.collectionNeeded) {
      console.log("Email needs to be here:", this.state.profileData.tokenInfo.email);
      this.fetchNFTs(this.state.profileData.tokenInfo.email);
    }
  }

  render() {
    const data = this.state.collectionData;

    const nextSlideClicked = () => {
      if (this.state.count === data.length - 1) {
        this.setState({
          count: 0,
        });
      } else {
        this.setState({
          count: this.state.count + 1,
        });
      }
    };

    const prevSlideClicked = () => {
      if (this.state.count === data.length - 1) {
        this.setState({
          count: 0,
        });
      } else {
        this.setState({
          count: this.state.count + 1,
        });
      }
    };

    return (
      <div>
        {data && (
          <div className="NFT__grid">
            <FaArrowAltCircleLeft
              className="left-arrow"
              onClick={prevSlideClicked}
            />
            <FaArrowAltCircleRight
              className="right-arrow"
              onClick={nextSlideClicked}
            />
            {data.map((asset, index) => (
              <div>
                {index === this.state.count && (
                  <>
                  {/* {asset.file_url && (
                    <img className="NFT__slide" src={asset.file_url} />
                  )} */}
                  {asset.cached_file_url && (
                  <img className="NFT__slide" src={asset.cached_file_url} />
                  )}
                  </>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
}

export default Slideshow;
