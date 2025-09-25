'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Challenge extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Challenge.belongsTo(models.User, {foreignKey: "EducatorId"})
      Challenge.belongsTo(models.Subject)
    }
  }
  Challenge.init({
    question: DataTypes.STRING,
    optionA: DataTypes.STRING,
    optionB: DataTypes.STRING,
    optionC: DataTypes.STRING,
    optionD: DataTypes.STRING,
    correctAnswer: DataTypes.STRING,
    EducatorId: DataTypes.INTEGER,
    SubjectId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Challenge',
  });
  return Challenge;
};