
const mongoose = require("mongoose");

const weightEntrySchema = new mongoose.Schema({
  weight: { type: Number, required: true },
  date: { type: Date, default: Date.now }
});
const heightEntrySchema = new mongoose.Schema({
  height: { type: Number, required: true },
  date: { type: Date, default: Date.now }
});

const userSchema = new mongoose.Schema({
  userType: { type: String, enum: ['normal', 'google', 'x'], required: true },
  googleId: { type: String, sparse: true },
  xId: { type: String, sparse: true },
  username: {
    type: String, sparse: true, required: function () {
      return this.userType === ('normal' || 'x')
    }
  },
  name: { type: String, sparse: true },
  givenName: { type: String, sparse: true, },
  familyName: { type: String, sparse: true, },
  email: {
    type: String, sparse: true, required: function () {
      return this.userType === ('normal' || 'google')
    }
  },
  password: {
    type: String, sparse: true, required: function () {
      return this.userType === 'normal'
    }
  },
  picture: { type: String, default: 'https://upload.wikimedia.org/wikipedia/en/thumb/2/23/Kryptoross.PNG/220px-Kryptoross.PNG' },
  weight: { type: Number, default: 0 },
  height: { type: Number, default: 0 },
  fat: { type: Number, default: 0 },
  sex: { type: String, default: null },
  age: {type: Number, default: 0},
  muscle: { type: Number, default: 0 },
  weightHistory: [weightEntrySchema],
  heightHistory: [heightEntrySchema],
},
  { timestamps: true });


const userModel = mongoose.model("userModel", userSchema);

module.exports = userModel;
