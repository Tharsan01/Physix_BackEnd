const classRepository = require('../repository/classRepository');
const { classDTO } = require('../dtos/classDTO');

const addSchedule = async (data) => {
  // Validate required fields
  if (!data.lessonType || !data.lessonTopic) {
    throw new Error('Lesson type and topic are required');
  }
  
  const result = await classRepository.createSchedule(data);
  return classDTO(result);
};

async function getAllSchedulesForStudents(batchNumber) {
  const schedules = await classRepository.getAllSchedules(batchNumber);
  return schedules.map(classDTO);
}

const editSchedule = async (id, data) => {
  const updated = await classRepository.updateSchedule(id, data);
  return classDTO(updated);
};

const removeSchedule = async (id) => {
  return await classRepository.deleteSchedule(id);
};

const getAllSchedulesForTeacher = async () => {
  const schedules = await classRepository.getAllSchedulesForTeacher();
  return schedules.map(classDTO);
};

module.exports = {
  addSchedule,
  getAllSchedulesForStudents,
  editSchedule,
  removeSchedule,
  getAllSchedulesForTeacher
};