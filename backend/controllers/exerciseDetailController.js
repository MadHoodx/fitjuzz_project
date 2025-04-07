const Exercise = require('../models/exerciseModel');
const ExerciseDetail = require('../models/exerciseDetail');

const exerciseDetailController = {
  getExerciseDetails: async (req, res) => {
    try {
      const exerciseId = req.params.id;
      console.log(`[DEBUG] Received request for exercise details with ID: ${exerciseId}`);
      
      // find exercise by id
      const exercise = await Exercise.findById(exerciseId);
      console.log(`[DEBUG] Exercise found:`, exercise ? 'Yes' : 'No');
      
      if (!exercise) {
        console.log(`[DEBUG] Exercise with ID ${exerciseId} not found`);
        return res.status(404).json({ message: 'ไม่พบท่าออกกำลังกายที่ระบุ' });
      }
      
      // create or find additional exercise details
      let exerciseDetail = await ExerciseDetail.findOne({ name: exercise.name });
      
      // if no additional exercise details, create new one
      if (!exerciseDetail) {
        console.log(`[DEBUG] Creating new exercise detail for: ${exercise.name}`);
        exerciseDetail = new ExerciseDetail({
          name: exercise.name,
          description: exercise.description,
          picture: exercise.picture,
          category: exercise.category,
        });
        await exerciseDetail.save();
      }
      
      const exerciseDetails = {
        ...exercise._doc,
        steps: exerciseDetail.steps,
        targetMuscles: exerciseDetail.targetMuscles || getDefaultTargetMuscles(exercise.category),
        tips: exerciseDetail.tips
      };
      
      console.log(`[DEBUG] Sending exercise details back to client`);
      res.json(exerciseDetails);
    } catch (error) {
      console.error('[ERROR] Error fetching exercise details:', error);
      res.status(500).json({ message: 'Error fetching exercise details', error: error.message });
    }
  }
};

function getDefaultTargetMuscles(category) {
  switch (category.toLowerCase()) {
    case 'chest':
      return 'กล้ามเนื้อหน้าอก, ไหล่, แขนส่วนหลัง';
    case 'back':
      return 'กล้ามเนื้อหลัง, บริเวณไหล่ด้านหลัง';
    case 'arms':
      return 'กล้ามเนื้อต้นแขน, ปลายแขน';
    case 'abs':
      return 'กล้ามเนื้อหน้าท้อง, แกนกลางลำตัว';
    case 'leg':
      return 'กล้ามเนื้อขา, น่อง, สะโพก';
    default:
      return 'กล้ามเนื้อทั่วไป';
  }
}

module.exports = exerciseDetailController; 