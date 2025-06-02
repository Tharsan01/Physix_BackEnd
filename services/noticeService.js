const noticeRepo = require('../repository/noticeRepository');
const { toNoticeDTO } = require('../dtos/noticeDTO');
const Notice = require('../models/Notice');

async function createNotice(data) {
  const notice = await noticeRepo.createNotice(data);
  return toNoticeDTO(notice);
}

async function updateNotice(id, data) {
  const notice = await noticeRepo.updateNotice(id, data);
  return notice ? toNoticeDTO(notice) : null;
}

async function deleteNotice(id) {
  return await noticeRepo.deleteNotice(id);
}

async function getAllNotices() {
  const notices = await noticeRepo.getAllNotices();
  return notices.map(toNoticeDTO);
}

async function getPublishedNotices(batchNumber) {
  const notices = await noticeRepo.getPublishedNotices(batchNumber);
  return notices.map(toNoticeDTO);
}


async function getNoticeById(id) {
  const notice = await noticeRepo.getNoticeById(id);
  return notice ? toNoticeDTO(notice) : null;
}

module.exports = {
  createNotice,
  updateNotice,
  deleteNotice,
  getAllNotices,
  getPublishedNotices,
  getNoticeById,
};
