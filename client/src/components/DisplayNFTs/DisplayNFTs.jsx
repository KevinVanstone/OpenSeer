import React, { Component } from "react";
import "./DisplayNFTs.scss";

const DisplayNFTs = (props) => {
  // Destructure here?
  console.log(props);
  const data = props.NFTObjects.nfts;
  console.log(data);
  return (
    <div>
      {data && (
        <div>
          {data.map((asset, index) => (
            <div key={index}>
              <h2>{asset.name}</h2>
              <p>{asset.description}</p>

              <img className="NFT__preview" src={asset.file_url} />
            </div>
          ))}
        </div>
      )}

      <p>This is basic text data from the DisplayNFTs Component</p>
    </div>
  );
};

export default DisplayNFTs;
