require("dotenv").config();
const express = require("express");
const app = express();
const bcrypt = require("bcrypt");
const { Router } = require("express");
const fs = require("fs");
const loginRoute = Router();
const User = require("../models/user");
const jwt = require("jsonwebtoken");
loginRoute.use(express.static("public"));
loginRoute.use(express.json());
const nodemailer = require("nodemailer");

const emailPass = process.env.EMAIL_PASS;

// Data for transporter (sender) of back-end email
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "OpenSeerComms@gmail.com",
    pass: emailPass,
  },
});

// All Users Route
loginRoute.get("/", async (req, res) => {
  try {
    const users = await User.find({});
    console.log(users);
    res.status(201).send();
  } catch {
    console.log("Error with GET request for users!");
    res.status(500).send();
  }
});

// Registration Route - works and stores an encrypted password
loginRoute.post("/register", async (req, res) => {
  try {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    console.log(salt);
    console.log(hashedPassword);

    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    });
    const newUser = await user.save();

    console.log("User created:", user);

    // Set variables for email sendout
    const mailOptions = {
      from: "OpenSeerComms@gmail.com",
      to: req.body.email,
      subject: "Welcome to Open Seer!",
      text: `Welcome to Open Seer, ${req.body.name}`,
    };

    // "Function" to send email (Eventually will be verification email)
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });

    res.status(201).send();
  } catch {
    res.status(500).send();
  }
});

// Save to collection route
loginRoute.post("/savetodb", (req, res) => {
  const { nft, email } = req.body;

  console.log(nft);
  console.log(email);

  try {
    User.findOne({ email: email }, function (err, result) {
      if (err) throw err;
      console.log("findOne function found user:", result);

      result.NFTcollection.push(nft);
      result.save();
    });

    res.status(201).send();
  } catch {
    res.status(500).send();
  }
});

// Delete from DB route
loginRoute.post("/deletefromdb/:nftID", (req, res) => {
  const { nft, email } = req.body;

  // console.log("Via link:", req.params.nftID);

  console.log(email);

  try {
    User.findOne({ email: email }, function (err, result) {
      if (err) throw err;
      // console.log("findOne function found user:", result);
      // console.log("NFT ID to delete:", nft.id);

      // Assign existing collection to userData
      let userData = result.NFTcollection;

      // Filter out the selected NFT from the NFTcollection array
      const newCollection = userData.filter((item) => item.id !== nft.id);

      // Assign the filtered array to the existing DB object
      result.NFTcollection = newCollection;

      // Save changes to DB
      result.save();
    });

    res.status(201).send();
  } catch {
    res.status(500).send();
  }
});

// Login Route - Allows valid user in test DB to see restricted content via JWT
loginRoute.post("/login", (req, res) => {
  const { name, password, email } = req.body;

  console.log(password);
  console.log(email);

  // Function to Find a user in our real MongoDB
  const verifyUserLogin = async (name, password, email) => {
    User.findOne({ email: email }, function (err, result) {
      if (!result) {
        return res.status(403).json({
          success: false,
          message: "Warning: The email entered was not found. Please check the Email field and try again.",
        })
      } 
      console.log("findOne function found user:", result);

      if (bcrypt.compareSync(password, result.password)) {
        console.log("Password the same!");

        // use jwt.sign to create a new JWT token. Takes two arguments, the payload and the secret key. We keep out secret key in ".env" file for safety
        const token = jwt.sign(
          {
            name: result.name,
            email: result.email,
            loginTime: Date.now(),
          },
          process.env.JWT_SECRET,
          { expiresIn: "1440m" }
        );

        // respond back to a client with the token we just created
        return res.status(200).json({ token });
      } else {
        console.log("Password incorrect!");
        // if username/password doesn't match we respond with error
        return res.status(403).send({
          success: false,
          message: "Warning: The email/password combination you entered is incorrect. Please try again.",
        });
      }
    });
  };

  verifyUserLogin(name, password, email);
});

module.exports = loginRoute;
