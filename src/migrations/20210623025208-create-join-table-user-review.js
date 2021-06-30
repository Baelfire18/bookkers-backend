module.exports = {
  up: async (queryInterface, Sequelize) => queryInterface.createTable('liked_reviews', {
    userId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      reference: {
        model: 'users',
        key: 'id',
      },
    },
    reviewId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      reference: {
        model: 'reviews',
        key: 'id',
      },
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
  }),
  // down: async (queryInterface, Sequelize) => queryInterface.dropTable('liked_reviews'),
  down: async (queryInterface) => queryInterface.dropTable('liked_reviews'),
};
