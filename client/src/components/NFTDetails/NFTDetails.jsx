import React, { Component } from "react";
import { useLocation, Link } from "react-router-dom";
import "./NFTDetails.scss";
import likeIcon from "../../assets/icons/likes.svg";

import axios from "axios";
const { v4: uuid } = require("uuid");

function NFTDetails() {
  const location = useLocation();
  console.log(location);
  const asset = location.state;

  function collectNFT() {
    // console.log("<3 Button has been clicked!");
    console.log(asset.cached_file_url);
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
    // console.log(nftToCollect);
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
    console.log("Save note button clicked!");

    const data = event.target;
    const note = data.note.value;
    console.log("The note looks like:", note);

    let id = location.state.id;

    axios
      .post(`http://localhost:8080/collections/${id}`, { note })
      .then((response) => {
        console.log("NFT ID:", id, "to be updated with note:", note);
      })
      .catch((err) => console.log(err));
  }

  console.log(location);
  return (
    <div>
      <div className="item">
        <h1>{asset.name}</h1>
        <img className="item__preview" src={asset.file_url} />
        <img className="item__preview" src={asset.cached_file_url} />
        <Link to="/collection">
          <button className="item__collect-btn" onClick={collectNFT}>
            <img className="item__preview" src={likeIcon} />
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
