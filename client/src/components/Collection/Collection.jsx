import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

class Collection extends Component {
  state = {
    collectionData: null,
  };

  componentDidMount() {
    axios
      .get(`http://localhost:8080/collections/`)
      .then((response) => {
        console.log("Collection retrieved:", response.data);
        this.setState({
          collectionData: response.data,
        });
      })
      .catch((err) => console.log(err));
  }

  render() {
    const data = this.state.collectionData;
    return (
      <div>
        {data && (
          <div className="NFT__grid">
            {data.map((asset, index) => (
              <Link
                to={`/search/${asset.id}`}
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
  }
}

const DisplayNFTs = (props) => {
  const data = props.NFTObjects.nfts;
  console.log(data);
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

export default Collection;
