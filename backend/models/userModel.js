
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true},
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  weight: { type: Number, default: 0 },
  height: { type: Number, default: 0 },
  fat: { type: Number, default: 0 },
});



const userModel = mongoose.model("userModel", userSchema);

module.exports = userModel;
