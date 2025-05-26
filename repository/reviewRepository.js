// repositories/reviewRepository.js
const Review = require('../models/Review');

const create = async (data) => {
  const review = new Review(data);
  return await review.save();
};

const findById = async (id) => {
  return await Review.findById(id);
};

const updateById = async (id, data) => {
  return await Review.findByIdAndUpdate(id, data, { new: true });
};

const deleteById = async (id) => {
  return await Review.findByIdAndDelete(id);
};

const softDeleteById = async (id) => {
  return await Review.findByIdAndUpdate(id, { status: 'inactive' }, { new: true });
};

const findByReviewer = async (reviewerId) => {
  return await Review.find({ reviewerId, status: 'active' });
};

const findByRecipient = async (recipientId) => {
  return await Review.find({ recipientId, status: 'active' });
};

module.exports = {
  create,
  findById,
  updateById,
  deleteById,
  softDeleteById,
  findByReviewer,
  findByRecipient,
};
