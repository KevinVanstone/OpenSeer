import React, { Component } from "react";
import { useLocation } from "react-router-dom";
import "./NFTDetails.scss";

function NFTDetails() {
  const location = useLocation();
  const asset = location.state;

  console.log(location);
  return (
    <div>
      <div className="NFT-details">
        <h1>{asset.name}</h1>
        <img className="NFT-details__preview" src={asset.file_url} />
        <img className="NFT-details__preview" src={asset.cached_file_url} />
        <p>{asset.description}</p>
        <p>Contract address: {asset.contract_address}</p>
        <p>Creator address {asset.creator_address}</p>
      </div>
    </div>
  );
}

export default NFTDetails;
