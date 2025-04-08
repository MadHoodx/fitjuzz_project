const mongoose = require('mongoose');

const steroidDetailSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category:{
        type: String,
        enum: ['anabolic', 'oral', 'arms', 'injectable'],
        required: true
    },

    picture: {
        type: String,
        required: true,
        default: "https://images.squarespace-cdn.com/content/v1/64c8035f53e9a56246c7c294/1723420893761-XYJVWOXL91SW5442P6RM/maxresdefault-29-1024x576.jpg"
    },
    steps: {
        type: [String],
        default: [
            'ใช้ตามคำแนะนำจากผู้เชี่ยวชาญ',
            'ใช้ในปริมาณที่แนะนำเพื่อหลีกเลี่ยงผลข้างเคียง',
            'หลีกเลี่ยงการใช้เกินปริมาณที่แนะนำ',
         
        ]

         
    },
    sideEffect: {
        type: String,
        default: 'การใช้สเตียรอยด์อาจทำให้เกิดผลข้างเคียง เช่น ผิวมัน, สิว, การปรับฮอร์โมน'
    },
    tips: {
        type: String,
        default: 'ควรใช้ในปริมาณที่พอดีและอยู่ภายใต้การดูแลของผู้เชี่ยวชาญ'
    }
    
});

const steroidDetailModel = mongoose.model('steroidDetailModel', steroidDetailSchema);

module.exports = steroidDetailModel; 