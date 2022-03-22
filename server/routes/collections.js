const { Router } = require("express");
const { v4: uuid } = require("uuid");
const fs = require("fs");
const User = require("../models/user");


const collectionRoute = Router();
const express = require("express");
collectionRoute.use(express.static("public"));

// Function to read file from data folder
const readFile = () => {
  const nftData = fs.readFileSync("./data/collection.json");
  return JSON.parse(nftData);
};

// Function to read objects from database
// const readDB = () => {
//   User.findOne({ email: email }, function (err, result) {
//     if (err) throw err;
//     console.log("findOne function found user:", result);
//     console.log(result.email);
//   });
// }

// Function to write file to data folder
const writeFile = (data) => {
  fs.writeFileSync("./data/collection.json", JSON.stringify(data, null, 2));
};

// Route 1: GET /collections
collectionRoute.get("/", (req, res) => {
  let data = readFile();
  console.log("Collection requested...");
  res.status(200).json(data);
});

// Route 1: GET /collections/db (From Mongo not server file)
collectionRoute.post("/db", (req, res) => {
  console.log("Req body:", req.body);
  const { email } = req.body;
  console.log("Email sent:", email);

  User.findOne({ email: email }, function (err, result) {
    if (err) throw err;
    console.log("findOne found database user:", result);
 
    console.log("Collection:", result.NFTcollection);

    res.status(200).json(result.NFTcollection);

  });

});

// Route 2: POST /collections
collectionRoute.post("/", (req, res) => {
  // Establish NFT collection object
  const collectionObject = readFile();
  console.log("POST request received!");

  if (req.body) {
    let data = req.body;
    console.log("Request body received:", data);
    collectionObject.push(data);
    writeFile(collectionObject);
    res.status(200).send(collectionObject);
  } else console.log("No request body received! Try again.");
});

// Route 3: DELETE /
collectionRoute.delete("/:nftID", (req, res) => {
  const collectionObject = readFile();
  const nftToDelete = collectionObject.find(
    (nftToDelete) => nftToDelete.id === req.params.nftID
  );

  if (!nftToDelete) {
    return res.status(404).send("Cannot find NFT requested to delete");
  } else {
    let updatedCollectionObject = collectionObject.filter(
      (nftToDelete) => nftToDelete.id !== req.params.nftID
    );
    writeFile(updatedCollectionObject);
    return res.status(200).json(nftToDelete);
  }
});

// Route 4: POST to existing collection item /
collectionRoute.post("/:nftID", (req, res) => {
  const collectionObject = readFile();
  const nftToUpdate = collectionObject.find(
    (nftToUpdate) => nftToUpdate.id === req.params.nftID
  );

  if (!nftToUpdate) {
    return res.status(404).send("Cannot find NFT requested to add note to");
  } else {
    nftToUpdate.note = req.body.note;
    writeFile(collectionObject);
    return res.status(200).json(nftToUpdate);
  }
});

module.exports = collectionRoute;
