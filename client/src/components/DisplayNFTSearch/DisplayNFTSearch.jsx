import React, { Component } from "react";
import "./DisplayNFTSearch.scss";
import { Link } from "react-router-dom";

const DisplayNFTSearch = (props) => {
  const data = props.NFTObjects.search_results;
  // console.log(data);
  return (
    <div>
      <p className="NFT__description">NFTs found on chain: </p>
      {data && (
        <div className="NFT__grid">
          {data.map((asset, index) => (
            <Link
              to={`/search/${asset.contract_address}/${asset.token_id}`}
              key={asset.token_id}
              state={asset}
            >
              <div className="NFT" key={index}>
                <h2>{asset.name}</h2>
                <img
                  className="NFT__preview"
                  src={asset.cached_file_url}
                />
                <p>{asset.description}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default DisplayNFTSearch;
