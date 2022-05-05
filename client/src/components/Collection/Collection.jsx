import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Collection.scss";

const AUTH_TOKEN_KEY = "clientAuthToken";
const DEFAULT_STATE = {
  isLoggedIn: false,
  collectionNeeded: true,
  profileData: null,
};

class Collection extends Component {
  state = {
    collectionData: null,
    ...DEFAULT_STATE,
  };

  componentDidMount() {
    this.fetchProfile();

  }

  componentDidUpdate() {

    if (this.state.profileData.tokenInfo.email && this.state.collectionNeeded) {
      console.log("Email needs to be here:", this.state.profileData.tokenInfo.email);
      this.fetchNFTs(this.state.profileData.tokenInfo.email);
    }
  }

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
      ...DEFAULT_STATE,
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
        console.log(response.data);
      });
  };

  render() {
    const data = this.state.collectionData;

    return (
      <>
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

            <div>
              {data && (
                <div className="collection__container">
                  {data.map((asset, index) => (
                    <Link
                      to={`/collection/${asset.id}`}
                      key={asset.token_id}
                      state={asset}
                    >
                      <div className="collection" key={index}>
                        <h2>{asset.name}</h2>
                        {/* <img className="collection__preview" src={asset.file_url} alt={asset.name}/> */}
                        <img
                          className="collection__preview"
                          src={asset.cached_file_url}
                          alt={asset.name}
                        />
                        <p className="collection__description">
                          {asset.description}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </>
        )}
      </>
    );
  }
}

export default Collection;
