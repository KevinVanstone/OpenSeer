import React, { Component } from "react";
import { useLocation } from "react-router-dom";
import "./NFTDetails.scss";
import likeIcon from "../../assets/icons/likes.svg";
import deleteIcon from "../../assets/icons/icon-delete.svg";

import axios from "axios";
const { v4: uuid } = require("uuid");

function NFTDetails() {
  const location = useLocation();
  console.log(location);
  const asset = location.state;

  function collectNFT() {
    console.log("<3 Button has been clicked!");
    console.log(asset);

    let nftToCollect = {
      id: uuid(),
      file_url: asset.file_url,
      name: asset.name,
      description: asset.description,
      token_id: asset.token_id,
      contract_address: asset.contract_address,
      creator_address: asset.creator_address,
    };
    console.log(nftToCollect);

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

  function deleteNFT(id) {
    console.log("Delete button clicked! ID:", id);
    console.log(asset);

    axios
      .delete(`http://localhost:8080/collections/${id}`)
      .then((response) => {
        console.log("NFT ID:", id, "deleted!");
      })
      .catch((err) => console.log(err));
  }

  function saveNFTNote(event) {
    event.preventDefault();
    console.log("Save note button clicked!");

    const data = event.target;
    console.log(data);
    const note = data.note.value;
    console.log(note);


    // axios
    //   .delete(`http://localhost:8080/collections/${id}`)
    //   .then((response) => {
    //     console.log("NFT ID:", id, "deleted!");
    //   })
    //   .catch((err) => console.log(err));
  }

  console.log(location);
  return (
    <div>
      <div className="NFT">
        <h1>{asset.name}</h1>
        <img className="NFT__preview" src={asset.file_url} />
        <img className="NFT__preview" src={asset.cached_file_url} />
        <button onClick={collectNFT}>
          <img className="NFT__preview" src={likeIcon} />
          <p>Add to collection</p>
        </button>
        <button onClick={() => deleteNFT(location.state.id)}>
          <img className="NFT__preview" src={deleteIcon} />
          <p>Remove from collection</p>
        </button>

        <p>{asset.description}</p>
        <p>Contract address: {asset.contract_address}</p>
        <p>Creator address {asset.creator_address}</p>
          {/* <div className="NFT__note">
          <form className="search__form" onSubmit={saveNFTNote}>
            <label for="note" className="NFT__note-label">Leave a note</label>
            <input className="NFT__note-input" id="note" type="text" name="note" placeholder="Might buy soon..."/>
            <button className="NFT__note-btn" onClick={saveNFTNote}>Save note</button>
            </form>
          </div> */}
      </div>
          
    </div>
  );
}

export default NFTDetails;
