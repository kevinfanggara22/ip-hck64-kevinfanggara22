"use strict";
const { hashPassword } = require("../helpers/bcrypt");
const bcrypt = require("bcryptjs");

const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Order);
    }
  }
  User.init(
    {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notNull: {
            args: true,
            msg: "Please input email",
          },
          notEmpty: {
            args: true,
            msg: "Please input email",
          },
          isEmail: {
            args: false,
            msg: "Please input email format",
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
        role: {
          type: DataTypes.STRING,
          defaultValue: "Staff",
        },
      },
      phoneNumber: DataTypes.STRING,
      address: DataTypes.STRING,
    },

    {
      hooks: {
        beforeCreate(instance, options) {
          instance.password = hashPassword(instance.password);
        },
      },
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
