import React, { Component } from "react";
import "./DisplayNFTSearch.scss";
import { Link } from "react-router-dom";

const DisplayNFTSearch = (props) => {
  const data = props.NFTObjects.search_results;
  // console.log(data);
  return (
    <div>
      <h2 className="NFT__description">NFTs found on chain: </h2>
      {data && (
        <div className="NFTs__container">
        {data.map((asset, index) => (
            <Link
              to={`/search/${asset.contract_address}/${asset.token_id}`}
              key={asset.token_id}
              state={asset}
            >
              <div className="NFT" key={index}>
                <h2 className="NFT__title">{asset.name}</h2>
                <img
                  className="NFT__preview"
                  src={asset.cached_file_url}
                />
                <p className="NFT__description">{asset.description}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default DisplayNFTSearch;
