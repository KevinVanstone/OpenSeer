require("dotenv").config();
const express = require("express");
const app = express();

const { Router } = require("express");
const fs = require("fs");

const loginRoute = Router();
loginRoute.use(express.static("public"));

const jwt = require("jsonwebtoken");

// NTS: Borrowed from Brainstation demo - adjust as needed then adjust comment flow.



// Test "DB" of the users
const users = {
  KVanstone: {
    name: "Kevin",
    password: "password",
  },
  EvilTester: {
    name: "Tester",
    password: "pass",
  },
};

// login endpoint
loginRoute.post("/", (req, res) => {
  console.log("post endpoint hit! - Kev");
  // get username and password from the request body
  const { username, password } = req.body;

  console.log(username);
  console.log(password);

  // find a user in our naive "DB"
  const user = users[username];

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
