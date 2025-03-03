
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  weight: { type: String, default: "0" },
  height: { type: String, default: "0" },
  fat: { type: String, default: "0" },
});



const user = mongoose.model("user", userSchema);

module.exports = user;
