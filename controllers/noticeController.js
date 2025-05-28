const noticeService = require('../services/noticeService');

async function createNotice(req, res) {
  try {
    const { title, status, imageUrl } = req.body;
    const notice = await noticeService.createNotice({ title, status, imageUrl });
    res.status(201).json({ success: true, notice });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

async function updateNotice(req, res) {
  try {
    const { id } = req.params;
    const updatedNotice = await noticeService.updateNotice(id, req.body);
    if (!updatedNotice) {
      return res.status(404).json({ message: 'Notice not found' });
    }
    res.json({ success: true, notice: updatedNotice });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

async function deleteNotice(req, res) {
  try {
    const { id } = req.params;
    await noticeService.deleteNotice(id);
    res.json({ success: true, message: 'Notice deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

async function getAllNotices(req, res) {
  try {
    const notices = await noticeService.getAllNotices();
    res.json({ success: true, notices });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

async function getPublishedNotices(req, res) {
  try {
    const notices = await noticeService.getPublishedNotices();
    res.json({ success: true, notices });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

module.exports = {
  createNotice,
  updateNotice,
  deleteNotice,
  getAllNotices,
  getPublishedNotices,
};
