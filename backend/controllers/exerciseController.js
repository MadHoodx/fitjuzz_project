const exerciseModel = require("../models/exerciseModel");


const exerciseController = {
    exercises: async (req, res) => {

        try{
            
            const exercises = await exerciseModel.find()
            res.json(exercises)
        }
        catch(error) {
            res.status(500).json({ message : "Error fetching exercises"})
        }
    }
}


module.exports = exerciseController