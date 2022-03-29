import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import "./CollectionDetails.scss";
import deleteIcon from "../../assets/icons/icon-delete.svg";
import axios from "axios";

const AUTH_TOKEN_KEY = "clientAuthToken";

function CollectionDetails() {
  const location = useLocation();
  const asset = location.state;

  let [isLoggedIn, isLoggedInFTN] = useState(false);
  let [profileData, profileDataFTN] = useState(null);

  console.log(location.state);

  const [newNote, setNote] = useState("");
  let [prompt, setPrompt] = useState("Save note 📝");

  useEffect(() => {
    fetchProfile();
    prompt = "Note saved ✔️";
  }, []);

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
        console.log(response.data);
        location.state.profileData = response.data;
        isLoggedInFTN(true);
        profileDataFTN(response.data);
        console.log(isLoggedIn);
        console.log(location.state.profileData.tokenInfo.email);
      });
  }

  function deleteNFT(id) {
    axios
      .delete(`http://localhost:8080/collections/${id}`)
      .then((response) => {
        console.log("NFT ID:", id, "deleted!");
      })
      .catch((err) => console.log(err));
  }

  function deleteNFTFromDB(id) {
    console.log("Correct email?", location.state.profileData.tokenInfo.email);

    let nftToDelete = {
      id: asset.id,
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
      .post(`http://localhost:8080/users/deletefromdb/${id}`, {
        nft: nftToDelete,
        email: location.state.profileData.tokenInfo.email,
      })
      .then((response) => {
        console.log("NFT ID:", id, "to be deleted from DB!");
      })
      .catch((err) => console.log(err));
  }

  // Function called when note saved via form
  function saveNFTNote(event) {
    event.preventDefault();
    const data = event.target;
    const note = data.note.value;

    setNote(note);

    setPrompt(prompt);

    let id = location.state.id;
    location.state.note = note;
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
          {/* <h3>Welcome, {profileData.tokenInfo.name}</h3>
          <h3>Account email: {profileData.tokenInfo.email}</h3> */}
          <button onClick={logout}>Logout</button>
        </>
      )}
      <div className="NFTCollected">
        <h1>{asset.name}</h1>
        {/* {asset.file_url && (
          <img
            className="NFTCollected__preview"
            src={asset.file_url}
            alt={asset.name}
          />
        )} */}
        {asset.cached_file_url && (
          <img
            className="NFTCollected__preview"
            src={asset.cached_file_url}
            alt={asset.name}
          />
        )}
        <Link to="/collection">
        <button
          className="NFTCollected__remove-btn"
          onClick={() => deleteNFTFromDB(location.state.id)}
        >
          <img
            className="NFTCollected__icon"
            src={deleteIcon}
            alt={asset.name}
          />
          <p>Remove from collection</p>
        </button>
        </Link>

        <p className="NFTCollected__info">{asset.description}</p>
        <p className="NFTCollected__info">
          Contract address: {asset.contract_address}
        </p>
        <p className="NFTCollected__info">
          Creator address: {asset.creator_address}
        </p>
        <p className="NFTCollected__info">Notes: {asset.note}</p>

        <form className="search__form" id="addNote" onSubmit={saveNFTNote}>
          <div className="NFTCollected__note">
            <label for="note" className="NFTCollected__note-label">
              Save notes on item
            </label>
            <input
              className="NFTCollected__note-input"
              id="note"
              type="text"
              name="note"
              placeholder="Might buy soon..."
            />
            <button
              className="NFTCollected__note-btn"
              type="submit"
              form="addNote"
            >
              <p>{prompt}</p>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CollectionDetails;
