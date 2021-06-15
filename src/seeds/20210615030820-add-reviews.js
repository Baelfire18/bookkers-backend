const models = require('../models');

const Review = models.review;
module.exports = {
  // up: async (queryInterface, Sequelize) => {
  up: async () => {
    const reviewsArray = [];

    reviewsArray.push({
      content: 'Pa que me deci spoilers',
      userId: 2,
      bookId: 1,
      score: 5,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    reviewsArray.push({
      content: 'Pa perkines, sabido es mejor el 3',
      userId: 3,
      bookId: 1,
      score: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    reviewsArray.push({
      content: 'Wenlo',
      userId: 3,
      bookId: 1,
      score: 5,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    reviewsArray.push({
      content: 'rica anabeth',
      userId: 1,
      bookId: 3,
      score: 5,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    reviewsArray.push({
      content: 'Manso libro',
      userId: 2,
      bookId: 4,
      score: 5,
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
