const models = require('../models');

const Report = models.report;
module.exports = {
  // up: async (queryInterface, Sequelize) => {
  up: async () => {
    const reportsArray = [];

    reportsArray.push({
      userId: 1,
      reviewId: 1,
      content: 'I dont like what he is saying here',
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    reportsArray.push({
      userId: 1,
      reviewId: 5,
      content: 'In mi opinion this is inappropiate',
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    reportsArray.push({
      userId: 2,
      reviewId: 2,
      content: 'I dont think that the score is fair',
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    reportsArray.push({
      userId: 3,
      reviewId: 3,
      content: 'The book isnt as good as he says',
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    reportsArray.push({
      userId: 4,
      reviewId: 4,
      content: 'It seems offensive to me',
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return Report.bulkCreate(reportsArray);
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
