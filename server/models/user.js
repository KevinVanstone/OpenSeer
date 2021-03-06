const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  NFTcollection: {
    type: Array,
    required: false,
  },
});

module.exports = mongoose.model("User", userSchema);
