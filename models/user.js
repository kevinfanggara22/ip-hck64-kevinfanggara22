'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Order)
    }
  }
  User.init(
    {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: "Please input email",
          },
          notEmpty: {
            args: true,
            msg: "Please input email",
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: "Please input password",
          },
          notEmpty: {
            args: true,
            msg: "Please input password",
          },
        },
      },
      role: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: "Please input user role",
          },
          notEmpty: {
            args: true,
            msg: "Please input user role",
          },
        },
      },
      phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: "Please input phone number",
          },
          notEmpty: {
            args: true,
            msg: "Please input phone number",
          },
        },
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: "Please input shipping address",
          },
          notEmpty: {
            args: true,
            msg: "Please input shipping address",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};