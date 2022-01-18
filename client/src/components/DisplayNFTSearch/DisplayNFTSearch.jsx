import React, { Component } from "react";
import "./DisplayNFTSearch.scss";

const DisplayNFTSearch = (props) => {
  // Destructure here?
  console.log(props);
  const data = props.NFTObjects.search_results;
  console.log(data);
  return (
    <div>
      {data && (
        <div>
          {data.map((asset, index) => (
            <div key={index}>
              <h2>{asset.name}</h2>
              {/* <p>{asset.description}</p> */}

              <img className="collection__preview" src={asset.cached_file_url} />
            </div>
          ))}
        </div>
      )}

      <p>This is basic text data from the DisplayNFTs Component</p>
    </div>
  );
};

export default DisplayNFTSearch;
