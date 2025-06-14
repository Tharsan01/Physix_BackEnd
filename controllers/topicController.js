const topicService = require('../services/topicService');

const addTopic = async (req, res) => {
  try {
    const teacherId = req.user.id;
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ error: 'Topic name is required' });
    }

    const topic = await topicService.addTopic(teacherId, { name });
    res.status(201).json({ message: 'Topic added successfully', topic });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getAllTopics = async (req, res) => {
  try {
    const topics = await topicService.getAllTopics();
    res.status(200).json(topics);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { addTopic, getAllTopics };