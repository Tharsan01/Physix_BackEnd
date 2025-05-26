const User = require('../models/User'); // adjust if needed
const reviewRepository = require('../repository/reviewRepository');

const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

const createReview = async ({ reviewerId, reviewerRole, recipientId, title, rating, reviewText }) => {
  const recipient = await User.findById(recipientId);
  if (!recipient) throw new Error('Recipient not found');

  // Capitalize roles for consistent comparison and storage
  const normalizedReviewerRole = capitalize(reviewerRole);
  const normalizedRecipientRole = capitalize(recipient.role);

  if (
    (normalizedReviewerRole === 'Student' && normalizedRecipientRole !== 'Teacher') ||
    (normalizedReviewerRole === 'Teacher' && normalizedRecipientRole !== 'Student')
  ) {
    throw new Error('You are not allowed to review this user');
  }

  const reviewData = {
    reviewerId,
    reviewerRole: normalizedReviewerRole,
    recipientId,
    recipientRole: normalizedRecipientRole,
    title,
    rating,
    reviewText,
  };

  return await reviewRepository.create(reviewData);
};


const updateReview = async (reviewId, reviewerId, data) => {
  const review = await reviewRepository.findById(reviewId);
  if (!review) throw new Error('Review not found');
  if (review.reviewerId.toString() !== reviewerId) throw new Error('Unauthorized');

  return await reviewRepository.updateById(reviewId, data);
};

const deleteReview = async (reviewId, reviewerId) => {
  const review = await reviewRepository.findById(reviewId);
  if (!review) throw new Error('Review not found');
  if (review.reviewerId.toString() !== reviewerId) throw new Error('Unauthorized');

  return await reviewRepository.softDelete(reviewId);
};

const getReviewsGiven = async (reviewerId) => {
  return await reviewRepository.findByReviewer(reviewerId);
};

const getReviewsReceived = async (recipientId) => {
  return await reviewRepository.findByRecipient(recipientId);
};

module.exports = {
  createReview,
  updateReview,
  deleteReview,
  getReviewsGiven,
  getReviewsReceived,
};
