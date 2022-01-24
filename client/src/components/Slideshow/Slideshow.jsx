import React, { useState, Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Slideshow.scss";

class Slideshow extends Component {
  state = {
    collectionData: null,
    count: 0,
    setCurrent: null,
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
    console.log(data);

    const slideClicked = () => {
      console.log("Slide button clicked!");
      // console.log(this.state.count);

      // this.state.setCurrent(this.state.count === data.length - 1 ? 0 : this.state.count +1)

      if (this.state.count === data.length - 1) {
        this.setState({
          count: 0,
        });
      } else {
        this.setState({
          count: this.state.count + 1,
        });
      }
      console.log(this.state.count);
    };
    return (
      <div>
        {data && (
          <div className="NFT__grid">
            <button onClick={slideClicked}>Next Button</button>

            {data.map((asset, index) => (
              <div>
                {index === this.state.count && (
                  <img className="NFT__slideshow" src={asset.file_url} />
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
}

export default Slideshow;
