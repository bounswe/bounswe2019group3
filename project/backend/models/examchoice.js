'use strict';
module.exports = (sequelize, DataTypes) => {
  const ExamChoice = sequelize.define('ExamChoice', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    question_id: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    desc: {
      allowNull: false,
      type: DataTypes.STRING
    }
  }, {});
  ExamChoice.associate = function(models) {

  };
  return ExamChoice;
};