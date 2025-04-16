const mongoose = require('mongoose');

// กำหนดโครงสร้างข้อมูลในรูปแบบ JSON เพื่อสะดวกในการใช้กับ frontend
const exerciseDetailJson = {
    "_id": "ObjectId", // ไอดีของรายละเอียดท่าออกกำลังกาย
    "name": "String", // ชื่อท่าออกกำลังกาย
    "description": "String", // รายละเอียดท่าออกกำลังกาย
    "picture1": "String", // รูปหลักในหน้ารายละเอียด (รูปแรกใน slider)
    "picture2": "String", // รูปที่สองในหน้ารายละเอียด (รูปที่สองใน slider)
    "category": "String", // หมวดหมู่ (chest, back, arms, abs, leg, shoulder)
    "steps": ["String"], // ขั้นตอนการทำท่าออกกำลังกาย
    "targetMuscles": "String", // กล้ามเนื้อเป้าหมาย
    "tips": "String", // เคล็ดลับในการทำท่าออกกำลังกาย
    "__v": "Number" // เวอร์ชันของข้อมูล (ใช้สำหรับ Mongoose)
};

const exerciseDetailSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    picture1: {
        type: String,
        default: "",
        description: "รูปหลักสำหรับแสดงในหน้ารายละเอียด (รูปแรกใน Slider)"
    },
    picture2: {
        type: String,
        default: "",
        description: "รูปที่สองสำหรับแสดงในหน้ารายละเอียด (รูปที่สองใน Slider)"
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

// ฟังก์ชันแปลง Document เป็น JSON ที่ใช้ได้กับ Modal
exerciseDetailSchema.methods.toModalJSON = function() {
    // แปลง targetMuscles เป็นรูปแบบที่เหมาะสม
    let parsedTargetMuscles = this.targetMuscles;
    
    // ถ้าเป็น string และมีรูปแบบที่แบ่งด้วย , ให้แปลงเป็น object
    if (typeof this.targetMuscles === 'string' && this.targetMuscles.includes(',')) {
        const muscleList = this.targetMuscles.split(',').map(m => m.trim());
        parsedTargetMuscles = {
            primary: muscleList.slice(0, Math.ceil(muscleList.length / 2)),
            secondary: muscleList.slice(Math.ceil(muscleList.length / 2))
        };
    }
    
    return {
        _id: this._id,
        name: this.name,
        description: this.description,
        picture1: this.picture1 || "",
        picture2: this.picture2 || "",
        category: this.category,
        steps: this.steps,
        targetMuscles: parsedTargetMuscles,
        tips: this.tips,
        __v: this.__v
    };
};

const exerciseDetailModel = mongoose.model('exerciseDetailModel', exerciseDetailSchema);

// ส่งออกทั้งโมเดลและโครงสร้าง JSON
module.exports = { 
    exerciseDetailModel,
    exerciseDetailJson
}; 