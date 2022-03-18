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

    res.status(201).send();
  } catch {
    res.status(500).send();
  }
});

// Login Route - Allows valid user in test DB to see restricted content via JWT
loginRoute.post("/login", (req, res) => {
  const { name, password, email } = req.body;

  console.log(name);
  console.log(password);
  console.log(email);

  // Function to Find a user in our real MongoDB
  const verifyUserLogin = async (name, password, email) => {
    User.findOne({ email: email }, function (err, result) {
      if (err) throw err;
      console.log("findOne function found user:", result);

      // let testuser = result;
      var testnote = {note: "Hello world!"};

      result.NFTcollection.push(testnote);
      result.save();

      if(bcrypt.compareSync(password,result.password)) {
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
        return res.status(403).json({
          success: false,
          message: "Email/password combination is wrong",
        });
      }
    });
  };

  verifyUserLogin(name, password, email);
});

module.exports = loginRoute;
