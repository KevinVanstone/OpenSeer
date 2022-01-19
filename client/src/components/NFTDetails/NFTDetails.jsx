import React, { Component } from 'react';
import { useLocation } from 'react-router-dom'
import "./NFTDetails.scss";

function NFTDetails () {
    const location = useLocation();
    const asset = location.state;

        console.log(location);
        return (
            <div>
                This is the NFT Details page - let's see what it has in state?

              <div className="NFT-details">
                <img className="NFT-details__preview" src={asset.file_url} />
                <h2>{asset.name}</h2>
                <p>{asset.description}</p>
                <p>Contract address: {asset.contract_address}</p>
                <p>Creator address {asset.creator_address}</p>
              </div>
            </div>
        );

}

export default NFTDetails;