const models = require('../models');

const Book = models.book;
module.exports = {
  // up: async (queryInterface, Sequelize) => {
  up: async () => {
    const booksArray = [];

    booksArray.push({
      title: 'Percy Jackson: El ladrón del rayo',
      isbn: '9786124497001',
      author: 'Rick Riordan',
      genre: 'Literatura Fantástica',
      userId: 1,
      description: 'Fue Luke el hijo de Hermes',
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    booksArray.push({
      title: 'Percy Jackson: El mar de los mostruos',
      isbn: '9786124497002',
      author: 'Rick Riordan',
      genre: 'Literatura Fantástica',
      userId: 1,
      description: 'Amo a Calipso',
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    booksArray.push({
      title: 'Percy Jackson: La maldición del titán',
      isbn: '9786124497003',
      author: 'Rick Riordan',
      genre: 'Literatura Fantástica',
      userId: 1,
      description: 'Anabeth',
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    booksArray.push({
      title: 'Percy Jackson: El laberinto del minotauro',
      isbn: '9786124497004',
      author: 'Rick Riordan',
      genre: 'Literatura Fantástica',
      userId: 1,
      description: 'Dédalo en Quintus',
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    booksArray.push({
      title: 'Percy Jackson: El último héroe del Olimpo',
      isbn: '9786124497005',
      author: 'Rick Riordan',
      genre: 'Literatura Fantástica',
      userId: 1,
      description: 'Maldición de Aquiles',
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    
    return Book.bulkCreate(booksArray);
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
