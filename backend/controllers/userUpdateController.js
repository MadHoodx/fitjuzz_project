const userModel = require("../models/userModel");
const userUpdateController = {
  updateWeight: async (req, res) => {
    const { id } = req.params;
    const { weight } = req.body;
    try {
      const user = await userModel.findByIdAndUpdate(
        id,
        { weight },
        { new: true }
      )

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json(user)
    } catch (error) {
      console.error("Error updating weight:", error);
      res.status(500).json({ message: "Server error" });
    }
  },
  updateHeight: async (req, res) => {
    const { id } = req.params;
    const { height } = req.body;
    try {
      const user = await userModel.findByIdAndUpdate(
        id,
        { height },
        { new: true }
      );

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      res.json(user)
    } catch (error) {
      console.error("Error updating height:", error);
      res.status(500).json({ message: "Server error" });
    }
  },
  updateFat: async (req, res) => {
    const { id } = req.params;
    const { fat } = req.body;

    try {
      const user = await userModel.findByIdAndUpdate(
        id,
        { fat },
        { new: true }
      );

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      res.json(user)
    } catch (error) {
      console.error("Error updating fat:", error);
      res.status(500).json({ message: "Server error" });
    }
  },
  updatePicture: async (req,res) => {
    const { id } = req.params
    const { picture } = req.body

    try {
      console.log(picture)
      const user = await userModel.findByIdAndUpdate(
        id,
        { picture },
        { new : true }
      )

      if(!user) {
        return res.status(400).json({message : "User not found"})
      }
    }
    catch (error) {
      console.error("Error updating picture:", error);
      res.status(500).json({ message: "Server error" });
    }
  }

};

module.exports = userUpdateController;
