const axios = require('axios');
const Reviews = require('../models/rating.model');
const User = require('../models/user.model');

const getSentiment = async (req, res) => {
  try {
    const reviews = await Reviews.find().populate({
      path: 'rated_user user',
      select: 'first_name last_name imageUrl',
      model: User,
    });

    // Create an empty array to hold the review objects with sentiment status
    const reviewsWithStatus = [];

    // Loop over the reviews array and send a sentiment analysis request for each review
    for (const review of reviews) {
      if (review.feedback) {
        const response = await axios.get('http://localhost:9090/sentiment', {
          data: {
            text: review.feedback,
          },
        });

        // Create a new review object with the sentiment status and push it to the reviewsWithStatus array
        const reviewWithStatus = {
          ...review.toObject(),
          status: response.data,
        };
        reviewsWithStatus.push(reviewWithStatus);
      }
    }

    // Send the reviewsWithStatus array as the response
    return res.status(200).json({ reviews: reviewsWithStatus });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getSentiment,
};
