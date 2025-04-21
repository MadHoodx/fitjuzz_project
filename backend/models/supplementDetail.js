const mongoose = require("mongoose");

const supplementDetailSchema = new mongoose.Schema({
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
    enum: ["protein", "creatine", "preworkout", "bcaa"],
    required: true,
  },

  picture: {
    type: String,
    required: true,
    default:
      "https://images.squarespace-cdn.com/content/v1/64c8035f53e9a56246c7c294/1723420893761-XYJVWOXL91SW5442P6RM/maxresdefault-29-1024x576.jpg",
  },
  heroImage: {
    type: String,
    required: true,
  },
  images: {
    benefits: String,
    whyUse: String,
    suitableFor: String,
    howToUse: String,
  },
  benefits: {
    type: [String],
    required: true,
  },
  whyUse: {
    type: [String],
    required: true,
  },
  suitableFor: {
    type: [String],
    required: true,
  },
  howToUse: {
    type: [String],
    required: true,
  },
  comparison: {
    digestionRate: String,
    bestTimeToUse: String,
    leucineContent: String,
    satiety: String,
    price: String,
  },
});

const supplementDetailModel = mongoose.model(
  "supplementDetailModel",
  supplementDetailSchema
);

module.exports = supplementDetailModel;
