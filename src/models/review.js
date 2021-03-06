const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class review extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.user, { foreignKey: { allowNull: false } });
      this.belongsTo(models.book, { foreignKey: { allowNull: false } });
      this.hasMany(models.report);
      this.belongsToMany(models.user, { through: 'liked_reviews' });
    }
  }
  review.init({
    content: {
      type: DataTypes.STRING(1024),
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    bookId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    score: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  }, {
    sequelize,
    modelName: 'review',
  });
  return review;
};
