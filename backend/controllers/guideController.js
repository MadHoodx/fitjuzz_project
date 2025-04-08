const steroidDetailModel = require('../models/steroidDetail')


const guideController = {
    getSteroidDetails: async (req, res) => {

        try{
            const steroid = await steroidDetailModel.find()
            res.json(steroid)
        }
        catch(error) {
            res.status(500).json({ message : "Error fetching steroids detail"})
        }
    }
}


module.exports = guideController