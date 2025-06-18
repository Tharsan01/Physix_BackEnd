const User = require('../models/User');
const ClassSchedule = require('../models/Class');
const Video = require('../models/Lesson');
const Tute = require('../models/Tute'); 

const getDashboardStats = async (req, res) => {
  try {
    const studentsCount = await User.countDocuments({ role: 'student' });
    const classesCount = await ClassSchedule.countDocuments({});
    const videosCount = await Video.countDocuments({});
    const tutesCount = await Tute.countDocuments({});
    
    res.status(200).json({
      studentsCount,
      classesCount,
      videosCount,
        tutesCount
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getDashboardStats };
