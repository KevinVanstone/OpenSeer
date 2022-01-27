import React, { Component } from "react";
import "./DisplayNFTs.scss";
import { Link } from "react-router-dom";

const DisplayNFTs = (props) => {
  const data = props.NFTObjects.nfts;
  return (
    <div>
      <h2 className="NFTs__description">NFTs found in wallet: </h2>
      {data && (
        <div className="NFTs__container">
          {data.map((asset, index) => (
            <Link
              to={`/search/${asset.contract_address}/${asset.token_id}`}
              key={asset.token_id}
              state={asset}
            >
              <div className="NFTs" key={index}>
                <h2 className="NFTs__title">{asset.name}</h2>
                <img className="NFTs__preview" src={asset.file_url} />                

                <p className="NFTs__description">{asset.description}</p>
              </div>
              
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default DisplayNFTs;
