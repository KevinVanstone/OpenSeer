# Open Seer

Open Seer is a blockchain explorer tool that allows users to
search the Ethereum network for any wallet address or text string,
returning the associated data. Any valid ETH wallet address will
return the NFTs within that wallet. Any other text string will
return a search of that string across assets on the Ethereum network
as provided by the NFT Port API.

The 'alpha' version of Open Seer is a proof-of-concept following a
MVP deployment strategy. New features will be added during beta
before a full public launch.

## Acknowledgements

A special thank you to the teachers and teaching assistants at
Brainstation. This app is only possible thank to your efforts in
the class room, and after hours during endless days of Open Studio.

Thanks DM, KB, MB, CS, and SS.

Thanks also to "Brian Design" (https://youtu.be/l1MYfu5YWHc)
For the Slideshow architecture inspiration

## Authors

By Kevin Vanstone (https://github.com/KevinVanstone)

## Features

- Ethereum network search across all wallets
- Previews of NFTs found matching the search string or wallet
- Ability to see additional NFT details and add your own notes
  and metadata
- Allows for users to create collections of the NFTs found and
  displayed using the search feature.
- Gallery page allows users to preview their collections
  (without owning said NFT)

## Installation

To install the front end client for Open Seer, navigate to '/client'
folder and run:

npm install

Run 'npm start' from the same directory to initialize.

To start the back-end server for Open Seer, navigate to the '/server'
folder and run:

npm install

Run 'node index' from the same directory to initialize.
