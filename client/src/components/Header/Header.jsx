import React, { Component } from "react";
import "./Header.scss";
import Logo from "../../assets/images/seer.png";
import axios from "axios";

const AUTH_TOKEN_KEY = "clientAuthToken";
const DEFAULT_STATE = {
  isLoggedIn: false,
  collectionNeeded: true,
  profileData: null,
};

class Header extends Component {
  state = {
    collectionData: null,
    divClass: "header__nav",
    ...DEFAULT_STATE,
  };

  componentDidMount() {
      console.log(window.location.pathname);

      if (this.isWithinURL("search")) {
        console.log("We are now on the collection page!");
        this.setState({
          divClass: "header__nav-current",
        });
      }
    this.fetchProfile();
  }

  isWithinURL = (page) => {
    if (window.location.pathname.includes(page)) return true;
    else return false;
  }

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
        // console.log(response.data);
      });
  };

  render() {
    return (
      <header className="header">
        <div className="header__home">
          <a className="header__home" href="/">
            <img className="header__logo" src={Logo} alt="Open Seer" />
            <p>Open Seer</p>
          </a>
        </div>
        <div className={this.state.divClass}>
          <a href="/search">
            <p>Search</p>
          </a>
</div>
          <div className="header__nav">
          {this.state.profileData && (
            <>
              <a href="/profile">
                <p>Logged In: {this.state.profileData.tokenInfo.email}</p>
              </a>
            </>
          )}
          {!this.state.profileData && (
            <>
              <a href="/profile">
                <p>Profile</p>
              </a>
            </>
          )}
        </div>
      </header>
    );
  }
}

export default Header;
