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
    isLoggedIn: false,
    profileData: null,
  };

  login = (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    axios
      .post("http://localhost:8080/users/login", {
        email,
        password,
      })
      .then((response) => {
        localStorage.setItem(AUTH_TOKEN_KEY, response.data.token);

        console.log(AUTH_TOKEN_KEY);
        console.log(response.data.token);

        this.setState(
          {
            isLoggedIn: true,
          },
          this.fetchProfile
        );
      });
  };

  // Logout function to remove token in local storage
  logout = () => {
    localStorage.removeItem(AUTH_TOKEN_KEY);
    this.setState({
      isLoggedIn: false,
      profileData: null,
    });
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
        console.log(this.state.profileData);
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
  }

  componentDidUpdate() {
    if (this.state.profileData && this.state.collectionNeeded) {
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
        {!this.state.isLoggedIn && (
          <>
            <h2>Log In To See Your NFT Collection </h2>
            <form onSubmit={this.login}>
              <div>
                Email:
                <input type="text" name="email" />
              </div>
              <div>
                Password:
                <input type="password" name="password" />
              </div>
              <button>Login</button>
            </form>
          </>
        )}
        {this.state.profileData && (
          <>
            {/* <h3>Welcome, {this.state.profileData.tokenInfo.name}</h3>
            <h3>Account email: {this.state.profileData.tokenInfo.email}</h3>
            <button onClick={this.logout}>Logout</button> */}

            {this.state.collectionData && (
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
                          <img
                            className="NFT__slide"
                            src={asset.cached_file_url}
                            alt={asset.name}
                          />
                        )}
                      </>
                    )}
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    );
  }
}

export default Slideshow;
