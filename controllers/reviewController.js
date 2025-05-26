const reviewService = require('../services/reviewService');

const createReview = async (req, res) => {
  try {
    const reviewerId = req.user.id;
    const reviewerRole = req.user.role;
    const { recipientId, title, rating, reviewText } = req.body;

    const review = await reviewService.createReview({
      reviewerId,
      reviewerRole,
      recipientId,
      title,
      rating,
      reviewText,
    });

    res.status(201).json({ message: 'Review created', review });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateReview = async (req, res) => {
  try {
    const reviewerId = req.user.id;
    const reviewId = req.params.id;
    const data = req.body;

    const updatedReview = await reviewService.updateReview(reviewId, reviewerId, data);
    res.json({ message: 'Review updated', review: updatedReview });
  } catch (error) {
    if (error.message === 'Review not found') return res.status(404).json({ error: error.message });
    if (error.message === 'Unauthorized') return res.status(403).json({ error: error.message });
    res.status(400).json({ error: error.message });
  }
};

const deleteReview = async (req, res) => {
  try {
    const reviewerId = req.user.id;
    const reviewId = req.params.id;

    await reviewService.deleteReview(reviewId, reviewerId);
    res.json({ message: 'Review deleted' });
  } catch (error) {
    if (error.message === 'Review not found') return res.status(404).json({ error: error.message });
    if (error.message === 'Unauthorized') return res.status(403).json({ error: error.message });
    res.status(400).json({ error: error.message });
  }
};

const getReviewsGiven = async (req, res) => {
  try {
    const reviewerId = req.user.id;
    const reviews = await reviewService.getReviewsGiven(reviewerId);
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getReviewsReceived = async (req, res) => {
  try {
    const recipientId = req.user.id;
    const reviews = await reviewService.getReviewsReceived(recipientId);
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createReview,
  updateReview,
  deleteReview,
  getReviewsGiven,
  getReviewsReceived,
};
