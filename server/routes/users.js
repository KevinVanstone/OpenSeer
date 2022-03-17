require("dotenv").config();
const express = require("express");
const app = express();
const bcrypt = require("bcrypt");
const { Router } = require("express");
const fs = require("fs");
const loginRoute = Router();
loginRoute.use(express.static("public"));

const User = require("../models/user")

const jwt = require("jsonwebtoken");
const { route } = require("./collections");

loginRoute.use(express.json());



// All Users Route
loginRoute.get('/', async (req, res) => {
  try {
    const users = await User.find({})
    console.log(users);
    res.status(201).send();
  } catch {
    console.log("Error with GET request for users!");
    res.status(500).send(); 
  }
})

// New User Route
loginRoute.get('/new', (req, res) => {
  res.render({ user: new User() })
})

// Create User Route
loginRoute.post('/create', async (req, res) => {
  const user = new User({
    name: req.body.name,
    password: req.body.password,
  })
  try {
    const newUser = await user.save();
    res.status(201).send();
} catch {
  console.log("Error creating user!");
  res.status(500).send(); 
}
})

loginRoute.get('/', (req, res) => {
  res.json(users);
})

// Registration Route - needs to be renamed
loginRoute.post('/users', async (req, res) => {
  try {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(req.body.password, salt)
    console.log(salt);
    console.log(hashedPassword);
  // const user = { name: req.body.name, password: hashedPassword }

  const user = new User({
    name: req.body.name,
    password: hashedPassword,
  })

  console.log("User created:", user);

  res.status(201).send();
} catch {
  res.status(500).send();
}
})


module.exports = loginRoute;
