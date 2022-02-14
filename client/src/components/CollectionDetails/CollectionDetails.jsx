import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import "./CollectionDetails.scss";
import deleteIcon from "../../assets/icons/icon-delete.svg";
import axios from "axios";

function CollectionDetails() {
  const location = useLocation();
  const asset = location.state;

  const [newNote, setNote] = useState("");
  useEffect(() => {});

  function deleteNFT(id) {
    axios
      .delete(`http://localhost:8080/collections/${id}`)
      .then((response) => {
        console.log("NFT ID:", id, "deleted!");
      })
      .catch((err) => console.log(err));
  }

  function saveNFTNote(event) {
    event.preventDefault();
    const data = event.target;
    const note = data.note.value;
    setNote(note);

    let id = location.state.id;
    location.state.note = note;
    axios
      .post(`http://localhost:8080/collections/${id}`, { note })
      .then((response) => {
        console.log("NFT ID:", id, "to be updated with note:", note);
      })
      .catch((err) => console.log(err));
  }

  return (
    <div>
      <div className="NFTCollected">
        <h1>{asset.name}</h1>
        {asset.file_url && (
          <img
            className="NFTCollected__preview"
            src={asset.file_url}
            alt={asset.name}
          />
        )}
        {asset.cached_file_url && (
          <img
            className="NFTCollected__preview"
            src={asset.cached_file_url}
            alt={asset.name}
          />
        )}
        <Link to="/collection">
          <button
            className="NFTCollected__remove-btn"
            onClick={() => deleteNFT(location.state.id)}
          >
            <img
              className="NFTCollected__icon"
              src={deleteIcon}
              alt={asset.name}
            />
            <p>Remove from collection</p>
          </button>
        </Link>

        <p className="NFTCollected__info">{asset.description}</p>
        <p className="NFTCollected__info">
          Contract address: {asset.contract_address}
        </p>
        <p className="NFTCollected__info">
          Creator address {asset.creator_address}
        </p>
        <p className="NFTCollected__info">Notes: {newNote}</p>

        <form className="search__form" id="addNote" onSubmit={saveNFTNote}>
          <div className="NFTCollected__note">
            <label for="note" className="NFTCollected__note-label">
              Save notes on item
            </label>
            <input
              className="NFTCollected__note-input"
              id="note"
              type="text"
              name="note"
              placeholder="Might buy soon..."
            />
            <button
              className="NFTCollected__note-btn"
              type="submit"
              form="addNote"
            >
              Save note
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CollectionDetails;
