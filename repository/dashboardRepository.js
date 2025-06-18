const User = require('../models/User');
const ClassSchedule = require('../models/Class');
const LessonVideo = require('../models/Lesson');
const Tute = require('../models/Tute'); 

const countStudents = async () => {
  return await User.countDocuments({ role: 'student' });
};

const countClasses = async () => {
  return await ClassSchedule.countDocuments();
};

const countVideos = async () => {
  return await LessonVideo.countDocuments();
};

const countTutes = async () => {
  return await Tute.countDocuments();
};

module.exports = {
  countStudents,
  countClasses,
  countVideos,
    countTutes
};
