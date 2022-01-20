const { Router } = require("express");
const { v4: uuid } = require("uuid");
const fs = require("fs");

const collectionRoute = Router();
const express = require("express");
collectionRoute.use(express.static("public"));

// Function to read file from data folder
const readFile = () => {
  const nftData = fs.readFileSync("./data/collection.json");
  return JSON.parse(nftData);
};

// Function to write file to data folder
const writeFile = (data) => {
  fs.writeFileSync("./data/collection.json", JSON.stringify(data, null, 2));
};

// Route 1: GET /collections
collectionRoute.get("/", (req, res) => {
  let data = readFile();
  console.log("GET request received!");
  res.status(200).json(data);
});

// Route 3: POST /collections
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

module.exports = collectionRoute;
