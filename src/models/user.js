'use strict';
const {
  Model
} = require('sequelize');

const bcrypt = require('bcrypt');

const passwordSalt = 10;

async function buildPasswordHash(instance) {
  if (instance.changed('password')) {
    const hash = await bcrypt.hash(instance.password, passwordSalt);
    instance.set('password', hash);
  }
}

module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.book);
      this.hasMany(models.review);
    }
  };
  user.init({
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [6, 200],
      },
    },
  }, {
    sequelize,
    modelName: 'user',
  });

  user.beforeCreate(buildPasswordHash);
  user.beforeUpdate(buildPasswordHash);

  user.prototype.checkPassword = function checkPassword(password) {
    return bcrypt.compare(password, this.password);
  };

  /* eslint-disable no-param-reassign */
  user.beforeBulkCreate((users) => {
    users.forEach((u) => {
      const {
        password,
      } = u;
      const saltRounds = 10;
      const salt = bcrypt.genSaltSync(saltRounds);
      const hash = bcrypt.hashSync(password, salt);
      u.password = hash;
    });
  });
  /* eslint-enable no-param-reassign */


  return user;
};