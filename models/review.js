'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Review.belongsTo(models.User)
    }
  };
  Review.init({
    UserId: DataTypes.INTEGER,
    movieId: DataTypes.INTEGER,
    rating: DataTypes.INTEGER,
    genre: DataTypes.STRING,
    review: DataTypes.STRING(3000)
  }, {
    sequelize,
    modelName: 'Review',
  });
  return Review;
};