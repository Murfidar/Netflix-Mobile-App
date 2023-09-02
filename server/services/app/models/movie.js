"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Movie extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Movie.hasMany(models.Cast, {
        foreignKey: "movieId",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
      Movie.belongsTo(models.Genre, { foreignKey: "genreId" });
      // Movie.belongsTo(models.User, { foreignKey: "authorId" });
    }
  }
  Movie.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Title is required",
          },
          notNull: {
            msg: "Title is required",
          },
        },
      },
      slug: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Slug is required",
          },
          notNull: {
            msg: "Slug is required",
          },
        },
      },
      synopsis: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Synopsis is required",
          },
          notNull: {
            msg: "Synopsis is required",
          },
        },
      },
      trailerUrl: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Trailer url is required",
          },
          notNull: {
            msg: "Trailer url is required",
          },
        },
      },
      imgUrl: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Image url is required",
          },
          notNull: {
            msg: "Image url is required",
          },
        },
      },
      rating: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Rating is required",
          },
          notNull: {
            msg: "Rating is required",
          },
          min: {
            args: 1,
            msg: `Rating cannot be below 1`,
          },
        },
      },
      genreId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      authorId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      userMongoId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Movie",
    }
  );

  Movie.beforeValidate((movie) => {
    movie.slug = movie.title.replace(/\W\s|\s/g, "-").toLowerCase();
  });

  return Movie;
};
