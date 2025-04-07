const mongoose = require('mongoose');

const exerciseDetailSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    picture: {
        type: String,
        required: true,
        default: "https://images.squarespace-cdn.com/content/v1/64c8035f53e9a56246c7c294/1723420893761-XYJVWOXL91SW5442P6RM/maxresdefault-29-1024x576.jpg"
    },
    category: {
        type: String,
        enum: ['chest', 'back', 'arms', 'abs', 'leg', 'shoulder'],
        required: true
    },
    steps: {
        type: [String],
        default: [
            'เริ่มต้นด้วยท่ายืนหรือนั่งที่มั่นคง',
            'จัดท่าทางให้ถูกต้องตามลักษณะของท่าที่ต้องการออกกำลังกาย',
            'ทำการออกกำลังกายด้วยท่าที่ถูกต้อง โดยระวังไม่ให้เกิดการบาดเจ็บ',
            'ทำซ้ำตามจำนวนครั้งที่ต้องการ'
        ]
    },
    targetMuscles: {
        type: String,
        default: ''
    },
    tips: {
        type: String,
        default: 'ควรเริ่มต้นด้วยน้ำหนักเบาๆ ก่อน เพื่อให้ร่างกายได้ปรับตัว และค่อยๆ เพิ่มน้ำหนักเมื่อร่างกายแข็งแรงขึ้น ควรหายใจเข้าออกอย่างสม่ำเสมอระหว่างออกกำลังกาย และพักให้เพียงพอระหว่างเซ็ต'
    }
});

const exerciseDetailModel = mongoose.model('exerciseDetailModel', exerciseDetailSchema);

module.exports = exerciseDetailModel; 