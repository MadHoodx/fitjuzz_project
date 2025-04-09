const steroidDetailModel = require("../models/steroidDetail");
const supplementDetailModel = require("../models/supplementDetail");
const encyclopediaDetailModel = require("../models/encyclopediaDetail");

const guideController = {
  getSteroidDetails: async (req, res) => {
    try {
      const steroid = await steroidDetailModel.find();
      res.json(steroid);
    } catch (error) {
      res.status(500).json({ message: "Error fetching steroids detail" });
    }
  },
  getSupplementDetails: async (req, res) => {
    try {
      const supplement = await supplementDetailModel.find();
      res.json(supplement);
    } catch (error) {
      res.status(500).json({ message: "Error fetching supplements detail" });
    }
  },
  getEncyclopediaDetails: async (req, res) => {
    try {
      const encyclopedia = await encyclopediaDetailModel.find();
      res.json(encyclopedia);
    } catch (error) {
      res.status(500).json({ message: "Error fetching encyclopedia detail" });
    }
  },
};

module.exports = guideController;
