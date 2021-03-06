import React, { Component } from "react";
import "./DisplayNFTs.scss";
import { Link } from "react-router-dom";
import NFTdefault from "../../assets/images/NFT Icon.png";


const DisplayNFTs = (props) => {
  const data = props.NFTObjects.nfts;
  console.log(data);
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
                {asset.file_url && (
                  <img
                  className="NFTs__preview"
                  src={asset.cached_file_url}
                  alt={asset.name}
                />
                )}
                {!asset.file_url && (
                  <img
                  className="NFTs__preview"
                  src={NFTdefault}
                  alt={asset.name}
                />
                )}
                

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
