const exerciseModel = require("../models/exerciseModel");
const { exerciseDetailModel } = require("../models/exerciseDetail");


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

    addExercise: async (req, res) => {
        try {
            const { name, description, picture, category, steps, targetMuscles, tips } = req.body;

            // ตรวจสอบข้อมูลที่จำเป็น
            if (!name || !description || !category) {
                return res.status(400).json({ message: 'กรุณากรอกข้อมูลที่จำเป็น: name, description, category' });
            }

            // สร้างท่าออกกำลังกายใหม่
            const newExercise = new exerciseModel({
                name,
                description,
                picture: picture || "https://images.squarespace-cdn.com/content/v1/64c8035f53e9a56246c7c294/1723420893761-XYJVWOXL91SW5442P6RM/maxresdefault-29-1024x576.jpg",
                category
            });

            // บันทึกท่าออกกำลังกายใหม่
            const savedExercise = await newExercise.save();

            // สร้างรายละเอียดเพิ่มเติมของท่าออกกำลังกาย
            const newExerciseDetail = new exerciseDetailModel({
                name,
                description,
                picture1: "",
                picture2: "",
                category,
                steps: steps || [
                    'เริ่มต้นด้วยท่ายืนหรือนั่งที่มั่นคง',
                    'จัดท่าทางให้ถูกต้องตามลักษณะของท่าที่ต้องการออกกำลังกาย',
                    'ทำการออกกำลังกายด้วยท่าที่ถูกต้อง โดยระวังไม่ให้เกิดการบาดเจ็บ',
                    'ทำซ้ำตามจำนวนครั้งที่ต้องการ'
                ],
                targetMuscles: targetMuscles || '',
                tips: tips || 'ควรเริ่มต้นด้วยน้ำหนักเบาๆ ก่อน เพื่อให้ร่างกายได้ปรับตัว และค่อยๆ เพิ่มน้ำหนักเมื่อร่างกายแข็งแรงขึ้น ควรหายใจเข้าออกอย่างสม่ำเสมอระหว่างออกกำลังกาย และพักให้เพียงพอระหว่างเซ็ต'
            });

            // บันทึกรายละเอียดเพิ่มเติม
            await newExerciseDetail.save();

            res.status(201).json({ 
                message: 'เพิ่มท่าออกกำลังกายสำเร็จ', 
                exercise: savedExercise 
            });
        } catch (error) {
            console.error('Error adding exercise:', error);
            res.status(500).json({ message: 'เกิดข้อผิดพลาดในการเพิ่มท่าออกกำลังกาย', error: error.message });
        }
    }
}


module.exports = exerciseController