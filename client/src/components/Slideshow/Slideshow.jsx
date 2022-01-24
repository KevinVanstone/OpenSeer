import React, { Component } from "react";
import axios from "axios";
import "./Slideshow.scss";
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from "react-icons/fa";

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

    const nextSlideClicked = () => {
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

    const prevSlideClicked = () => {
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
            <FaArrowAltCircleLeft
              className="left-arrow"
              onClick={prevSlideClicked}
            />
            <FaArrowAltCircleRight
              className="right-arrow"
              onClick={nextSlideClicked}
            />
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
