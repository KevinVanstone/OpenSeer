import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Collection.scss";

class Collection extends Component {
  state = {
    collectionData: null,
  };

  componentDidMount() {
    axios
      .get(`http://localhost:8080/collections/`)
      .then((response) => {
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
          <div className="collection__container">
            {data.map((asset, index) => (
              <Link
                to={`/collection/${asset.id}`}
                key={asset.token_id}
                state={asset}
              >
                <div className="collection" key={index}>
                  <h2>{asset.name}</h2>
                  <img className="collection__preview" src={asset.file_url} />
                  <img className="collection__preview" src={asset.cached_file_url} />
                  <p className="collection__description">{asset.description}</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    );
  }
}

export default Collection;
