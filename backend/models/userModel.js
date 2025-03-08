
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  userType: { type: String, enum: ['normal', 'google', 'x'], required: true },
  googleId: { type: String, sparse: true },
  xId: { type: String, sparse: true },
  username: { type: String, sparse: true,  required: function () {
    return this.userType ===  ('normal' || 'x')
  }},
  name: { type: String, sparse: true},
  givenName: { type: String,  sparse: true, },
  familyName: { type: String,  sparse: true, },
  email: { type: String, sparse: true, required: function () {
    return this.userType === ('normal' || 'google')
  }},
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


userSchema.index({ userType: 1, email: 1 }, { unique: true });
userSchema.index({ userType: 1, xId: 1 }, { unique: true });

const userModel = mongoose.model("userModel", userSchema);

module.exports = userModel;
