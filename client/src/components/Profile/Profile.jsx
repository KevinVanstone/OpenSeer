import React, { Component } from "react";
import axios from "axios";

const AUTH_TOKEN_KEY = "clientAuthToken";
const DEFAULT_STATE = {
  isLoggedIn: false,
  profileData: null,
};

class Profile extends Component {
  state = {
    ...DEFAULT_STATE,
  };

  componentDidMount() {
    this.fetchProfile();
  }

  login = (e) => {
    e.preventDefault();

    const name = e.target.username.value;
    const password = e.target.password.value;

    axios
      .post("http://localhost:8080/users/basicdb", {
        name,
        password,
      })
      .then((response) => {
        localStorage.setItem(AUTH_TOKEN_KEY, response.data.token);

        console.log(AUTH_TOKEN_KEY);
        console.log(response.data.token);

        this.setState(
          {
            isLoggedIn: true,
            // this calls fetchProfile after setState has ACTUALLY modified the state
            // this is a callback
          },
          this.fetchProfile
        );

        // if we call fetchProfile here, isLoggedIn would be false
        // this.fetchProfile();
      });
    // equivalent to this
    // axios.post("http://localhost:8080/login", {
    //   username: username
    //   password: password
    // });
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
        <h1>Profile Login</h1>

        {!this.state.isLoggedIn && (
          <form onSubmit={this.login}>
            <div>
              Name:
              <input type="text" name="username" />
            </div>
            <div>
              Password:
              <input type="password" name="password" />
            </div>
            <button>Login</button>
          </form>
        )}

        {this.state.profileData && (
          <>
            <h2>Authorized Page</h2>
            <h3>Welcome, {this.state.profileData.tokenInfo.name}</h3>
            <h3>Login Username: {this.state.profileData.tokenInfo.username}</h3>
            <h4>
              Performance Level:
              {this.state.profileData.accountInfo.performanceLevel}
            </h4>
            <h4>
              Review Date: {this.state.profileData.accountInfo.reviewDate}
            </h4>
            <button onClick={this.logout}>Logout</button>
          </>
        )}
      </>
    );
  }
}

export default Profile;
