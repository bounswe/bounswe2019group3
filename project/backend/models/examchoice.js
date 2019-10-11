'use strict';
module.exports = (sequelize, DataTypes) => {
  const ExamChoice = sequelize.define('ExamChoice', {
    qid: DataTypes.INTEGER,
    desc: DataTypes.STRING
  }, {});
  ExamChoice.associate = function(models) {
    // associations can be defined here
  };
  return ExamChoice;
};