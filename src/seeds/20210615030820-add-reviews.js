const models = require('../models');

const Review = models.review;
module.exports = {
  // up: async (queryInterface, Sequelize) => {
  up: async () => {
    const reviewsArray = [];

    reviewsArray.push({
      content: 'Cool book! Luke is the bad guy',
      userId: 2,
      bookId: 1,
      score: 5,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    reviewsArray.push({
      content: 'Lame book, it\'s better the third one',
      userId: 3,
      bookId: 1,
      score: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    reviewsArray.push({
      content: 'Nice!',
      userId: 3,
      bookId: 1,
      score: 5,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    reviewsArray.push({
      content: 'There is a pretty girl in that book',
      userId: 3,
      bookId: 3,
      score: 5,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    reviewsArray.push({
      content: 'Awesome book!',
      userId: 2,
      bookId: 6,
      score: 5,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    reviewsArray.push({
      content: 'Loving it!',
      userId: 2,
      bookId: 8,
      score: 4,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    
    return Review.bulkCreate(reviewsArray);
  },

  // down: async (queryInterface, Sequelize) => {
  down: async () => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
