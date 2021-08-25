module.exports = {
  // up: async (queryInterface, Sequelize) => {
  up: async (queryInterface) => {
    const likedReviewsArray = [];

    likedReviewsArray.push({
      userId: '1',
      reviewId: '1',
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    likedReviewsArray.push({
      userId: '1',
      reviewId: '8',
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    likedReviewsArray.push({
      userId: '1',
      reviewId: '3',
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    likedReviewsArray.push({
      userId: '1',
      reviewId: '4',
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    likedReviewsArray.push({
      userId: '2',
      reviewId: '2',
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    likedReviewsArray.push({
      userId: '2',
      reviewId: '4',
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    likedReviewsArray.push({
      userId: '3',
      reviewId: '3',
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    likedReviewsArray.push({
      userId: '3',
      reviewId: '5',
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    likedReviewsArray.push({
      userId: '3',
      reviewId: '1',
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    likedReviewsArray.push({
      userId: '4',
      reviewId: '1',
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    likedReviewsArray.push({
      userId: '4',
      reviewId: '5',
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    likedReviewsArray.push({
      userId: '4',
      reviewId: '2',
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return queryInterface.bulkInsert('liked_reviews', likedReviewsArray);
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
