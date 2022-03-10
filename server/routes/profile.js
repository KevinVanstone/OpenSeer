require("dotenv").config();
const express = require("express");
const app = express();

const { Router } = require("express");
const fs = require("fs");

const profileRoute = Router();
profileRoute.use(express.static("public"));

const jwt = require("jsonwebtoken");

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



  // a protected route, note we are using a second parameter "authorize" which is our middleware for authentication
  profileRoute.get("/", authorize, (req, res) => {
    // if user is authenticated send back the token info that we stored in request object in the middleware but also any additional sensitive information

    console.log("Get request hit /profile endpoint! - kev")
    res.json({
      tokenInfo: req.jwtDecoded,
      accountInfo: {
        performanceLevel: "7.5",
        reviewDate: "09/15/2020",
      },
    });
  });















module.exports = profileRoute;