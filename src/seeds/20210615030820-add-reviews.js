const models = require('../models');

const Review = models.review;
module.exports = {
  // up: async (queryInterface, Sequelize) => {
  up: async () => {
    const reviewsArray = [];

    reviewsArray.push({
      content: 'Cool book! I really like the way how the author redacts',
      userId: 2,
      bookId: 1,
      score: 5,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    reviewsArray.push({
      content: 'Lame book, it\'s better the third one in my opinon',
      userId: 3,
      bookId: 1,
      score: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    reviewsArray.push({
      content: 'Nice! I really think the author made a great work here. The new readers will love it',
      userId: 3,
      bookId: 7,
      score: 5,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    reviewsArray.push({
      content: 'There is a pretty girl in that book. However I cant believe she dies!',
      userId: 3,
      bookId: 3,
      score: 5,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    reviewsArray.push({
      content: 'Awesome book! The plot is really inmersive and with a lot of upside downs',
      userId: 2,
      bookId: 6,
      score: 5,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    reviewsArray.push({
      content: 'Loving it! At the moment i think this is my favorite book. i absolutely recommend it',
      userId: 2,
      bookId: 8,
      score: 5,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    reviewsArray.push({
      content: 'Nice, reading this book at night gives an absolute terror experience',
      userId: 3,
      bookId: 8,
      score: 4,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    reviewsArray.push({
      content: 'The way the author tells the story really scared me',
      userId: 2,
      bookId: 9,
      score: 5,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    reviewsArray.push({
      content: 'This book is too tetric for me. I didnt liked it too much',
      userId: 2,
      bookId: 10,
      score: 2,
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
