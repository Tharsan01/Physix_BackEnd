const repo = require('../repository/classRepository');
const classDTO = require('../dtos/classDTO');


const addSchedule = async (data) => {
  const result = await repo.createSchedule(data);
  return classDTO(result);
};


const getAllSchedulesForStudents = async () => {
  const schedules = await repo.getAllSchedules();
  console.log('Schedules:', schedules); // Check what this prints
  if (!Array.isArray(schedules)) {
    throw new Error('Schedules is not an array');
  }
  return schedules.map(classDTO);
};


const editSchedule = async (id, data) => {
  const updated = await repo.updateSchedule(id, data);
  return classDTO(updated);
};

const removeSchedule = async (id) => {
  return await repo.deleteSchedule(id);
};

module.exports = {
  addSchedule,
  getAllSchedulesForStudents,
  editSchedule,
  removeSchedule,
};
