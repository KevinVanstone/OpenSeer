import React, { Component } from "react";
import axios from "axios";
import "./Profile.scss";

const AUTH_TOKEN_KEY = "clientAuthToken";
const DEFAULT_STATE = {
  isLoggedIn: false,
  isRegistered: false,
  profileData: null,
};

class Profile extends Component {
  state = {
    ...DEFAULT_STATE,
  };

  componentDidMount() {
    this.fetchProfile();
    // this.fetchNFTs();
  }

  // Register function - needs to be adapted from login
  register = (e) => {
    e.preventDefault();

    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    axios
      .post("http://localhost:8080/users/register", {
        name,
        email,
        password,
      })
      .then((response) => {
        console.log("Account info sent to database - user registered!")
        this.setState(
          {
            isRegistered: true,
          },
          // this.fetchProfile
        );
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
      });
  };


  render() {
    return (
      <>
      <div className="profile">
        <h1>Welcome To Open Seer</h1>

        {!this.state.isLoggedIn && (
          <>
          <h2>Existing Users Sign In Below.  </h2>
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
            <h3>Welcome, {this.state.profileData.tokenInfo.name}</h3>
            <h3>Account email: {this.state.profileData.tokenInfo.email}</h3>
            <button className="profile__btn"onClick={this.logout}>Logout</button>
          </>
        )}


        {!this.state.isLoggedIn && !this.state.isRegistered && (
          <>
        <h2>No account? Register below.</h2>
          <form onSubmit={this.register}>
            <div>
              Name:
              <input type="text" name="name" />
            </div>            
            <div>
              Email:
              <input type="text" name="email" />
            </div>
            <div>
              Password:
              <input type="password" name="password" />
            </div>
            <button>Register</button>
          </form>
          </>
        )}

        {this.state.isRegistered && (
        <p>Thank you for registering! Sign in using your credentials above. </p>
        )}
      </div>
      </>
    );
  }
}

export default Profile;
