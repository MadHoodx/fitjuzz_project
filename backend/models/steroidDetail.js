const mongoose = require("mongoose");

const steroidDetailSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    enum: ["anabolic", "oral", "arms", "injectable"],
    required: true,
  },
  benefits: {
    type: [String],
  },
  risks: {
    type: [String],
  },
  medicalUses: {
    type: String,
  },
  picture: {
    type: String,
    required: true,
    default:
      "https://images.squarespace-cdn.com/content/v1/64c8035f53e9a56246c7c294/1723420893761-XYJVWOXL91SW5442P6RM/maxresdefault-29-1024x576.jpg",
  },
});

const steroidDetailModel = mongoose.model(
  "steroidDetailModel",
  steroidDetailSchema
);

module.exports = steroidDetailModel;
