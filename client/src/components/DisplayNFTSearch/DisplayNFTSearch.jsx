import React, { Component } from "react";
import "./DisplayNFTSearch.scss";
import { Link } from "react-router-dom";


const DisplayNFTSearch = (props) => {
  const data = props.NFTObjects.search_results;
  // console.log(data);
  return (
    <div>
      {data && (
        <div>
          {data.map((asset, index) => (
            <Link to={`/search/${asset.contract_address}/${asset.token_id}`} key={asset.token_id} state={asset}>
            <div key={index}>
              <h2>{asset.name}</h2>
              {/* <p>{asset.description}</p> */}

              <img className="collection__preview" src={asset.cached_file_url} />
              <h2>{asset.name}</h2>
                <p>{asset.description}</p>
            </div>
            </Link>
          ))}
        </div>
      )}

      <p>This is basic text data from the DisplayNFTs Component</p>
    </div>
  );
};

export default DisplayNFTSearch;
