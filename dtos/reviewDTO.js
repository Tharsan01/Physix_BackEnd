// dtos/reviewDTO.js

class reviewDTO {
  constructor(review) {
    this.id = review._id;
    this.reviewerId = review.reviewerId;
    this.reviewerRole = review.reviewerRole;
    this.recipientId = review.recipientId;
    this.recipientRole = review.recipientRole;
    this.title = review.title;
    this.rating = review.rating;
    this.reviewText = review.reviewText;
    this.status = review.status;
    this.createdDate = review.createdDate;
  }
}

module.exports = reviewDTO;
