import React, { Component } from "react";
import "./About.scss";
import QR from "../../assets/images/contactQR.png";

class About extends Component {
  render() {
    return <div className="about">
    <h1 className="about__hed">About Open Seer</h1>
    <p>Open Seer is a blockchain explorer tool that allows users to
search the Ethereum network for any wallet address or text string,
returning the associated data. Any valid ETH wallet address will
return the NFTs within that wallet. Any other text string will 
return a search of that string across assets on the Ethereum network
as provided by the NFT Port API. 
</p>
<img className="about__qr" src={QR} alt="Contact Kevin Vanstone" />

    </div>;
  }
}

export default About;
