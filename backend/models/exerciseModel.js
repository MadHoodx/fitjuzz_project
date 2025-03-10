const mongoose = require('mongoose');

const exerciseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    catagory: {
        type: String,
        enum: ['chest', 'back', 'arms', 'abs', 'leg'],
        required: true
    },
   
});



const exerciseModel = mongoose.model('exerciseModel', exerciseSchema);

module.exports = exerciseModel;