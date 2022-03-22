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


    

    // axios
    //   .get(`http://localhost:8080/collections/`)
    //   .then((response) => {
    //     this.setState({
    //       collectionData: response.data,
    //     });
    //   })
    //   .catch((err) => console.log(err));
  }

  componentDidUpdate() {
    // console.log(this.state.profileData.tokenInfo.email);

    if (this.state.profileData.tokenInfo.email && this.state.collectionNeeded) {
      console.log("Email needs to be here:", this.state.profileData.tokenInfo.email);
      this.fetchNFTs(this.state.profileData.tokenInfo.email);
    }
  }

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

  logout = () => {
    localStorage.removeItem(AUTH_TOKEN_KEY);
    this.setState({
      ...DEFAULT_STATE,
    });
  };

  fetchProfile = () => {
    // get the token from local storage, if not authenicated it will be null
    // if it is authenticated it will be the JWT token we stored on login
    const authToken = localStorage.getItem(AUTH_TOKEN_KEY);

    axios
      .get("http://localhost:8080/profile", {
        headers: {
          authorization: `Bearer ${authToken}`,
        },
      })
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
    console.log(data);

    const data2 = this.state.profileData;
    console.log(data2);

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
            {/* <h2>Authorized Page</h2> */}
            <h3>Welcome, {this.state.profileData.tokenInfo.name}</h3>
            <h3>Account email: {this.state.profileData.tokenInfo.email}</h3>
            <button onClick={this.logout}>Logout</button>

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
