'use strict';
module.exports = (sequelize, DataTypes) => {
  const ExamQuestion = sequelize.define('ExamQuestion', {
    abbr: DataTypes.STRING,
    desc: DataTypes.STRING,
    answid: DataTypes.INTEGER
  }, {});
  ExamQuestion.associate = function(models) {
    // associations can be defined here
  };
  return ExamQuestion;
};