require("dotenv").config();
const express = require("express");
const app = express();

const { Router } = require("express");
const fs = require("fs");

const loginRoute = Router();
loginRoute.use(express.static("public"));

const jwt = require("jsonwebtoken");


// NTS: Borrowed from Brainstation demo - adjust as needed then adjust comment flow.

// middleware that deals with auth tokens that we can use for all the protected routes that require auth
const authorize = (req, res, next) => {
    // if no authorization header is provided, respond with error
    if (!req.headers.authorization)
      return res
        .status(401)
        .json({
          success: false,
          message: "This route requires authorization header",
        });
  
    // if auth token is provided but missing "Bearer ", respond with error
    if (req.headers.authorization.indexOf("Bearer") === -1)
      return res
        .status(401)
        .json({ success: false, message: "This route requires Bearer token" });
  
    // because the authorization header comes in "Bearer encrypted-auth-token" format we are only interested in second portion of the token
    const authToken = req.headers.authorization.split(" ")[1];
  
    // to verify JWT token, we have three arguments: the token, the secret it was signed with and the callback after verifying. The callback comes with two parameters - the error and the decoded token (the payload)
    jwt.verify(authToken, process.env.JWT_SECRET, (err, decoded) => {
      // if token has been tampered with or has expired we respond with an error
      if (err)
        return res
          .status(401)
          .json({ success: false, message: "The token is invalid" });
  
      // if token is verified we are setting it on the request object for an endpoint to use
      req.jwtDecoded = decoded;
      next();
    });
  };

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
        { expiresIn: "5m" }
      );
  
      // respond back to a client with the token we just created
      return res.status(200).json({ token });
    } else {
      // if username/password doesn't match we respond with error
      return res
        .status(403)
        .json({
          success: false,
          message: "Username/password combination is wrong",
        });
    }
  });
  
  module.exports = loginRoute;
