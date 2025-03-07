
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  userType: { type: String, enum: ['normal', 'google'], required: true },
  googleId: { type: String, sparse: true },
  username: { type: String, sparse: true,  required: function () {
    return this.userType === 'normal'
  }},
  name: { type: String, sparse: true},
  givenName: { type: String,  sparse: true, },
  familyName: { type: String,  sparse: true, },
  email: { type: String, required: true},
  password: { type: String, sparse: true, required: function () {
    return this.userType === 'normal'
  }},
  picture: {type: String,  default: 'https://upload.wikimedia.org/wikipedia/en/thumb/2/23/Kryptoross.PNG/220px-Kryptoross.PNG'},
  weight: { type: Number, default: 0 },
  height: { type: Number, default: 0 },
  fat: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date,  default: Date.now}
});


userSchema.index({ email: 1, userType: 1 }, { unique: true });


const userModel = mongoose.model("userModel", userSchema);

module.exports = userModel;
