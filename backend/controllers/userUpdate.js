const user = require("../models/user");

const userUpdate = {
  updateWeight: async (req, res) => {
        
        try {
          const { id } = req.params;
          const { weight } = req.body;
      
          const updatedUser = await user.findByIdAndUpdate(
            id,
            { weight },
            { new: true } 
          );
      
          if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
          }
      
          res.json(updatedUser);

        } catch (error) {
          console.error('Error updating weight:', error);
          res.status(500).json({ message: 'Server error' });
        }
      }


  }


module.exports = userUpdate;

