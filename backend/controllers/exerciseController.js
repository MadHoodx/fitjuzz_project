const exerciseModel = require("../models/exerciseModel");


const exerciseController = {
    exercises: async (req, res) => {
        try{
            console.log('[DEBUG] Fetching exercises from database');
            const exercises = await exerciseModel.find();
            console.log(`[DEBUG] Found ${exercises.length} exercises`);
            res.json(exercises);
        }
        catch(error) {
            console.error('[ERROR] Error fetching exercises:', error);
            res.status(500).json({ message : "Error fetching exercises"});
        }
    },

    
}


module.exports = exerciseController