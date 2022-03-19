import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import "./NFTDetails.scss";
import likeIcon from "../../assets/icons/likes.svg";
import axios from "axios";
const { v4: uuid } = require("uuid");

const AUTH_TOKEN_KEY = "clientAuthToken";



const NFTDetails = () => {
  const location = useLocation();
  const asset = location.state;
  let [isLoggedIn, isLoggedInFTN] = useState(false);
  let [profileData, profileDataFTN] = useState(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  // console.log(location.state.isLoggedIn);
  // console.log(location.state);

  function logout() {
    localStorage.removeItem(AUTH_TOKEN_KEY);
    isLoggedInFTN(false);
    profileDataFTN(null);
  }

  function fetchProfile() {
    // get the token from local storage, if not authenicated it will be null
    // if it is authenticated it will be the JWT token we stored on login
    const authToken = localStorage.getItem(AUTH_TOKEN_KEY);
    console.log("AuthToken:", authToken);
    axios
      .get("http://localhost:8080/profile", {
        headers: {
          authorization: `Bearer ${authToken}`,
        },
      })
      .then((response) => {
        location.state.profileData = response.data;
        isLoggedInFTN(true);
        profileDataFTN(response.data);
        // console.log(isLoggedIn);
        // console.log(profileData);
      });
  }



  function collectNFT() {
    let nftToCollect = {
      id: uuid(),
      file_url: asset.file_url,
      cached_file_url: asset.cached_file_url,
      name: asset.name,
      description: asset.description,
      token_id: asset.token_id,
      contract_address: asset.contract_address,
      creator_address: asset.creator_address,
      note: "",
    };
    axios
      .post(`http://localhost:8080/collections/`, nftToCollect)
      .then((response) => {
        console.log(
          "Add to collection button clicked! Object sent: ",
          nftToCollect
        );
      })
      .catch((err) => console.log(err));
  }

  function saveNFTNote(event) {
    event.preventDefault();
    const data = event.target;
    const note = data.note.value;
    let id = location.state.id;

    axios
      .post(`http://localhost:8080/collections/${id}`, { note })
      .then((response) => {
        console.log("NFT ID:", id, "to be updated with note:", note);
      })
      .catch((err) => console.log(err));
  }

  return (
    <div>
        {isLoggedIn && (
          <>
            <h2>Authorized Page</h2>
            <h3>Welcome, {location.state.profileData.tokenInfo.name}</h3>
            <h3>Account email: {location.state.profileData.tokenInfo.email}</h3>
            <button onClick={logout}>Logout</button>
          </>
        )}
      <div className="item">
        <h1>{asset.name}</h1>
        {asset.file_url && (
          <img
            className="item__preview"
            src={asset.file_url}
            alt={asset.name}
          />
        )}
        {asset.cached_file_url && !asset.file_url && (
          <img
            className="item__preview"
            src={asset.cached_file_url}
            alt={asset.name}
          />
        )}

        <Link to="/collection">
          <button className="item__collect-btn" onClick={collectNFT}>
            <img className="item__preview" src={likeIcon} alt={asset.name} />
            <p>Add to collection</p>
          </button>
        </Link>

        <p className="NFT__info">{asset.description}</p>
        <p className="NFT__info">Contract address: {asset.contract_address}</p>
        <p className="NFT__info">Creator address: {asset.creator_address}</p>
      </div>
    </div>
  );
}

export default NFTDetails;
