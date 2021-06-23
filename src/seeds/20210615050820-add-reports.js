const models = require('../models');

const Report = models.report;
module.exports = {
  // up: async (queryInterface, Sequelize) => {
  up: async () => {
    const reportsArray = [];

    reportsArray.push({
      userId: 1,
      reviewId: 1,
      content: 'Esto no es vegano, report',
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    reportsArray.push({
      userId: 1,
      reviewId: 5,
      content: 'En mi opinion esto es inadecuado',
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    reportsArray.push({
      userId: 2,
      reviewId: 2,
      content: 'No creo que el score sea justo',
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    reportsArray.push({
      userId: 3,
      reviewId: 3,
      content: 'El libro no es tan bueno como dice',
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    reportsArray.push({
      userId: 4,
      reviewId: 4,
      content: 'Me parece ofensivo',
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
