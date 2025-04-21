const mongoose = require('mongoose');

const exerciseSchema = new mongoose.Schema({
    id:{
        type: String,
        required: true
    },
    bodyPart:{
        type: String,
        required: true
    },
    equipment:{
        type: String,
        required: true
    },
    target: {
        type: String,
        required: true
    },

    name: {
        type: String,
        required: true
    },
    secondaryMuscles: {
        type: [String],
        required: true
    },
    instructions: {
        type: [String],
        required: true
    },
    gifUrl: {
        type: String,
        required: true,
        default: "https://images.squarespace-cdn.com/content/v1/64c8035f53e9a56246c7c294/1723420893761-XYJVWOXL91SW5442P6RM/maxresdefault-29-1024x576.jpg"
    },
  
   
});

const exerciseModel = mongoose.model('exerciseModel', exerciseSchema);

module.exports = exerciseModel;