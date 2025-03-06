
const mongoose = require("mongoose");

const userGoogleSchema = new mongoose.Schema({
  googleid: { type: String, required: true, unique: true },
  name: {type: String, required: true},
  username: { type: String, required: true},
  email: { type: String, required: true, unique: true },
  picture: {type: String, required: true},
  weight: { type: Number, default: 0 },
  height: { type: Number, default: 0 },
  fat: { type: Number, default: 0 },
});



const userGoogleModel = mongoose.model("userGoogleModel", userGoogleSchema);

module.exports = userGoogleModel;
