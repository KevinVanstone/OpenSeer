import React, { Component } from "react";
import "./DisplayNFTs.scss";
import { Link } from "react-router-dom";
import likeIcon from "../../assets/icons/likes.svg";

const DisplayNFTs = (props) => {
  const data = props.NFTObjects.nfts;
  //   console.log(data);
  return (
    <div>
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
                <img className="NFT__preview" src={asset.file_url} />                

                <p>{asset.description}</p>
              </div>
              
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default DisplayNFTs;
