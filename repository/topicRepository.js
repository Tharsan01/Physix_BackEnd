const Topic = require('../models/Topic');

const createTopic = async (topicData) => {
  const topic = new Topic(topicData);
  return await topic.save();
};

const findTopicByName = async (name) => {
  return await Topic.findOne({ name });
};

const getAllTopics = async () => {
  return await Topic.find().lean();
};

module.exports = { createTopic, findTopicByName, getAllTopics };