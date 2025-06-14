const topicRepository = require('../repository/topicRepository');

const addTopic = async (teacherId, { name }) => {
  const existingTopic = await topicRepository.findTopicByName(name);
  if (existingTopic) {
    throw new Error('Topic already exists');
  }

  const topic = await topicRepository.createTopic({
    name,
    createdBy: teacherId,
  });

  return toTopicDTO(topic);
};

const getAllTopics = async () => {
  const topics = await topicRepository.getAllTopics();
  return topics.map(toTopicDTO);
};

const toTopicDTO = (topic) => ({
  _id: topic._id,
  name: topic.name,
  createdBy: topic.createdBy,
  createdAt: topic.createdAt,
  updatedAt: topic.updatedAt,
});

module.exports = { addTopic, getAllTopics };