import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Slideshow.scss";
import Carousel from "../Carousel/Carousel.jsx";

class Slideshow extends Component {

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
        console.log(data);
        return (
            <div>
                {/* <Carousel/> */}
                </div>
            
        // //   <div>
        //     {/* {data && (
        //       <div className="NFT__grid">
        //         {data.map((asset, index) => (
        //             <div>
        //               <h2>{asset.name}</h2>
        //               <img className="NFT__slideshow" src={asset.file_url} />
        //             </div>
        //         ))}
        //       </div>
        //     )} */}
        // //   </div>
        );
      }
}

export default Slideshow;