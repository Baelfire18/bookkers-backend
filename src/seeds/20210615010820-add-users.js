const models = require('../models');

const User = models.user;
module.exports = {
  // up: async (queryInterface, Sequelize) => {
  up: async () => {
    const usersArray = [];

    usersArray.push({
      firstName: 'José Antonio',
      lastName: 'Castro',
      email: 'jacastro18@uc.cl',
      password: '123456',
      admin: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    usersArray.push({
      firstName: 'José',
      lastName: 'Madriaza',
      email: 'jm.madriaza@uc.cl',
      password: '123456',
      admin: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    usersArray.push({
      firstName: 'Bastian',
      lastName: 'Hilcker',
      email: 'bhilcker@uc.cl',
      password: '123456',
      admin: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    usersArray.push({
      firstName: 'Humberto',
      lastName: 'Ortuzar',
      email: 'hjortuzar@uc.cl',
      password: '123456',
      admin: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return User.bulkCreate(usersArray);
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
