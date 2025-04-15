const userModel = require("../models/userModel");
const userUpdateController = {
  updateWeight: async (req, res) => {
    const { id } = req.params;
    const { weight } = req.body;

    try {
      const user = await userModel.findById(id);

      if (!user) {
        console.log("User not found");
        return res.status(404).json({ message: "User not found" });
      }

      user.weightHistory.push({ weight, date: new Date() });

      user.weight = weight;
      await user.save();

      res.json(user);
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
      user.heightHistory.push({ height, date: new Date() });
      user.height = height;
      await user.save();
      res.json(user);
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
      user.fatHistory.push({ fat, date: new Date() });
      user.fat = fat;
      await user.save();
      res.json(user);
    } catch (error) {
      console.error("Error updating fat:", error);
      res.status(500).json({ message: "Server error" });
    }
  },
  updateMuscle: async (req, res) => {
    const { id } = req.params;
    const { muscle } = req.body;

    try {
      const user = await userModel.findByIdAndUpdate(
        id,
        { muscle },
        { new: true }
      );

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      res.json(user);
    } catch (error) {
      console.error("Error updating muscle:", error);
      res.status(500).json({ message: "Server error" });
    }
  },
  updateSex: async (req, res) => {
    const { id } = req.params;
    const { sex } = req.body;

    try {
      const user = await userModel.findByIdAndUpdate(
        id,
        { sex },
        { new: true }
      );

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      res.json(user);
    } catch (error) {
      console.error("Error updating sex:", error);
      res.status(500).json({ message: "Server error" });
    }
  },
  updateAge: async (req, res) => {
    const { id } = req.params;
    const { age } = req.body;

    try {
      const user = await userModel.findByIdAndUpdate(
        id,
        { age },
        { new: true }
      );

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      res.json(user);
    } catch (error) {
      console.error("Error updating age:", error);
      res.status(500).json({ message: "Server error" });
    }
  },
  updatePicture: async (req, res) => {
    const { id } = req.params;
    const { picture } = req.body;
    try {
      const user = await userModel.findByIdAndUpdate(
        id,
        { picture },
        { new: true }
      );

      if (!user) {
        return res.status(400).json({ message: "User not found" });
      }
    } catch (error) {
      console.error("Error updating picture:", error);
      res.status(500).json({ message: "Server error" });
    }
  },
};

module.exports = userUpdateController;
