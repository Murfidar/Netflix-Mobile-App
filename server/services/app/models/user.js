"use strict";
const { Model } = require("sequelize");
const bcrypt = require("bcryptjs");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // User.hasMany(models.Movie, {
      //   foreignKey: "authorId",
      //   onDelete: "CASCADE",
      //   onUpdate: "CASCADE",
      // });
    }

    verifyPassword(password) {
      return bcrypt.compareSync(password, this.password);
    }
  }
  User.init(
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Email is required",
          },
          notNull: {
            msg: "Email is required",
          },
          isEmail: {
            msg: "Please enter the correct email format",
          },
        },
        unique: {
          args: true,
          msg: "There is already a user with this email",
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Password is required",
          },
          notNull: {
            msg: "Password is required",
          },
          len: {
            args: [5, Infinity],
            msg: "Password length must be 5 characters or more",
          },
        },
      },

      role: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      phoneNumber: DataTypes.STRING,
      address: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
    }
  );

  User.beforeValidate((user) => {
    if (!user.role) user.role = "Admin";
  });

  User.beforeCreate((user) => {
    user.password = bcrypt.hashSync(user.password, 10);
  });

  User.afterCreate((user) => {
    delete user.dataValues.password;
    delete user.dataValues.role;
    delete user.dataValues.phoneNumber;
    delete user.dataValues.address;
    delete user.dataValues.createdAt;
    delete user.dataValues.updatedAt;
  });

  return User;
};
