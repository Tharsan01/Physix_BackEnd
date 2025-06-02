const classDTO = (cls) => ({
  id: cls._id,
  classNumber: cls.classNumber,
  lesson: cls.lesson,
  date: cls.date,
  startTime: cls.startTime,
  endTime: cls.endTime,
  batchNumber: cls.batchNumber,
  status: cls.status,
  password: cls.password,
  teacherId: cls.teacherId,
  createdAt: cls.createdAt,
  updatedAt: cls.updatedAt,
});

module.exports = { classDTO };  // named export
