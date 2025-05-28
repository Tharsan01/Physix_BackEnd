const Notice = require('../models/Notice');

async function createNotice(data) {
  return await Notice.create(data);
}

async function updateNotice(id, data) {
  return await Notice.findByIdAndUpdate(id, data, { new: true });
}

async function deleteNotice(id) {
  return await Notice.findByIdAndDelete(id);
}

async function getAllNotices() {
  return await Notice.find().sort({ createdAt: -1 });
}

async function getPublishedNotices() {
  return await Notice.find({ status: 'Published' }).sort({ createdAt: -1 });
}

async function getNoticeById(id) {
  return await Notice.findById(id);
}

module.exports = {
  createNotice,
  updateNotice,
  deleteNotice,
  getAllNotices,
  getPublishedNotices,
  getNoticeById,
};
