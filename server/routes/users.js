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

// const verifySignUp = require("../middleware/verifySignUp");



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
// loginRoute.get('/new', (req, res) => {
//   res.render({ user: new User() })
// })

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

// loginRoute.get('/', (req, res) => {
//   res.json(users);
// })

// Registration Route - works and stores an encrypted password
loginRoute.post('/register', async (req, res) => {
  try {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(req.body.password, salt)
    console.log(salt);
    console.log(hashedPassword);

  const user = new User({
    name: req.body.name,
    password: hashedPassword,
  })
  const newUser = await user.save();

  console.log("User created:", user);

  res.status(201).send();
} catch {
  res.status(500).send();
}
})

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

// Login endpoint (working) - Allows valid user in test DB to see restricted content
// NTS: Must now adapt this to call proper DB, not test DB it

loginRoute.post("/basicdb", (req, res) => {
  // console.log("post endpoint hit! - Kev");
  // get username and password from the request body
  // const { username, password } = req.body;
  // console.log(username);
  // console.log(password);

  const { name, password } = req.body;

  console.log(name);
  console.log(password);


  // find a user in our naive "DB"
  // const user = users[username];

  // Find a user in our real MongoDB
  // User.findOne({
  //   name: name
  // })

  User.findOne({"name": name}, function(err, result) {
    if (err) throw err;
    console.log("findOne function found:", result.name);
    db.close();
  });

  // console.log("User found:", User);

  // if user is not found, respond with an error
  if (!User)
    return res
      .status(403)
      .json({ success: false, message: "User is not found" });

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        User.password
      );
      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }



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
})
module.exports = loginRoute;
