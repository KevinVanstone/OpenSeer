import React, { Component } from "react";
import { useLocation } from "react-router-dom";
import "./NFTDetails.scss";
import likeIcon from "../../assets/icons/likes.svg";
import axios from "axios";

function NFTDetails() {
  const location = useLocation();
  console.log(location);
  const asset = location.state;

  function CollectNFT() {
    console.log("Button has been clicked!");
    console.log(asset);

    let nftToCollect = {
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

  console.log(location);
  return (
    <div>
      <div className="NFT-details">
        <h1>{asset.name}</h1>
        <img className="NFT-details__preview" src={asset.file_url} />
        <img className="NFT-details__preview" src={asset.cached_file_url} />
        <button onClick={CollectNFT}>
          <img className="NFT__preview" src={likeIcon} />
          <p>Add to collection</p>
        </button>

        <p>{asset.description}</p>
        <p>Contract address: {asset.contract_address}</p>
        <p>Creator address {asset.creator_address}</p>
      </div>
    </div>
  );
}

export default NFTDetails;
