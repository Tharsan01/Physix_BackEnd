const lessonService = require('../services/lessonService');

// Upload a new lesson (Teacher only)
const uploadLesson = async (req, res) => {
  try {
    const teacherId = req.user.id;
    const { title, videoUrl, thumbnailUrl, videoType,batchNumber } = req.body;

    if (!title || !videoUrl || !videoType) {
      return res.status(400).json({ error: 'Title, videoUrl, and videoType are required' });
    }

    const lesson = await lessonService.uploadLesson(teacherId, {
      title,
      videoUrl,
      thumbnailUrl,
      videoType,
      batchNumber,
    });

    res.status(201).json({ message: 'Lesson uploaded successfully', lesson });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Edit existing lesson (Teacher only)
const updateLesson = async (req, res) => {
  try {
    const teacherId = req.user.id;
    const lessonId = req.params.id;
    const updatedData = req.body;

    const lesson = await lessonService.updateLesson(lessonId, teacherId, updatedData);
    res.json({ message: 'Lesson updated successfully', lesson });
  } catch (error) {
    if (error.message === 'Lesson not found') {
      return res.status(404).json({ error: error.message });
    }
    if (error.message === 'You are not authorized to edit this lesson') {
      return res.status(403).json({ error: error.message });
    }
    res.status(400).json({ error: error.message });
  }
};

// Delete lesson (Teacher only)
const deleteLesson = async (req, res) => {
  try {
    const teacherId = req.user.id;
    const lessonId = req.params.id;

    const result = await lessonService.deleteLesson(lessonId, teacherId);
    res.json(result);
  } catch (error) {
    if (error.message === 'Lesson not found') {
      return res.status(404).json({ error: error.message });
    }
    if (error.message === 'You are not authorized to delete this lesson') {
      return res.status(403).json({ error: error.message });
    }
    res.status(400).json({ error: error.message });
  }
};

// Get all lessons (Teacher & Student)
const getAllLessons = async (req, res) => {
  try {
    const { category } = req.query;
    const batchNumber = req.user.batchNumber;  // get batchNumber from decoded token (set by auth middleware)

    if (!batchNumber) {
      return res.status(403).json({ error: 'Batch number not found in token' });
    }

    const lessons = await lessonService.getAllLessons(category, batchNumber);
    res.status(200).json(lessons);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Get lesson by ID (Teacher & Student)
const getLessonById = async (req, res) => {
  try {
    const lessonId = req.params.id;
    const lesson = await lessonService.getLessonById(lessonId);
    res.json(lesson);
  } catch (error) {
    if (error.message === 'Lesson not found') {
      return res.status(404).json({ error: error.message });
    }
    res.status(500).json({ error: error.message });
  }
};

const getAllLessonsForTeacher = async (req, res) => {
  try {
    const lessons = await lessonService.getAllLessonsForTeacher(); // no batch filter
    res.status(200).json(lessons);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



module.exports = {
  uploadLesson,
  updateLesson,
  deleteLesson,
  getAllLessons,
  getLessonById,
  getAllLessonsForTeacher
};
