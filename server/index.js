require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();

const collections = require("./routes/collections.js");
const login = require("./routes/login.js");
const profile = require("./routes/profile.js");
const PORT = process.env.PORT;

app.use(express.json());
app.use(cors());
app.use(express.static("public"));

app.use("/collections", collections);

app.use("/login", login);

app.use("/profile", profile);


const mongoose = require("mongoose");
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", error => console.log(error));
db.once("open", () => console.log("Connected to Mongoose!"));


app.listen(PORT, () => console.log(`🚀 server listening on port ${PORT}`));
