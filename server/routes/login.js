require("dotenv").config();
const express = require("express");
const app = express();
const bcrypt = require("bcrypt");
const { Router } = require("express");
const fs = require("fs");

const loginRoute = Router();
loginRoute.use(express.static("public"));

const jwt = require("jsonwebtoken");

loginRoute.use(express.json());


// NTS: Borrowed from Brainstation demo - adjust as needed then adjust comment flow.
// Test "DB" of the users
const users = [];

loginRoute.get('/', (req, res) => {
  res.json(users);
})

// Registration Route - needs to be renamed
loginRoute.post('/', async (req, res) => {
  try {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(req.body.password, salt)
    console.log(salt);
    console.log(hashedPassword);
  const user = { name: req.body.name, password: hashedPassword }
  users.push(user);
  res.status(201).send();
} catch {
  res.status(500).send();
}
})

// Login Route - 
loginRoute.post("/users", async (req, res) => {
  const user = users.find(user => user.name == req.body.name);
  if (user == null) {
    return res.status(400).send("Cannot find user");
  }
  try {
    if(await bcrypt.compare(req.body.password, user.password)) {
      res.send('Success');
    } else {
      res.send ('Access denied')
    }
  } catch {
    res.status(500).send();
  }


  // get username and password from the request body
  const { name, password } = req.body;

  console.log(name);
  console.log(password);

  console.log(user);

  // if user is not found, respond with an error
  if (!user)
    return res
      .status(403)
      .json({ success: false, message: "User is not found" });

  // compare the passwords that we have in our "DB" and that the user logged in with
  if (user && user.password === password) {
    // use jwt.sign to create a new JWT token. Takes two arguments, the payload and the secret key. We keep out secret key in ".env" file for safety
    const token = jwt.sign(
      {
        name: user.name,
        // alternative way to set expiration token after 5 minutes
        // exp: Math.floor(Date.now() / 1000) + 300,
        username,
        loginTime: Date.now(),
      },
      process.env.JWT_SECRET,
      { expiresIn: "1440m" }
    );

    // respond back to a client with the token we just created
    return res.status(200).json({ token });
  } else {
    // if username/password doesn't match we respond with error
    return res.status(403).json({
      success: false,
      message: "Username/password combination is wrong",
    });
  }
});

module.exports = loginRoute;
