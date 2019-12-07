'use strict';
module.exports = (sequelize, DataTypes) => {
  const ExerciseProgress = sequelize.define('ExerciseProgress', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    username: {
      allowNull: false,
      type: DataTypes.STRING
    },
    exercise_id: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    question_done: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    questions: {
      allowNull: false,
      type: DataTypes.INTEGER
    }
  });
  ExerciseProgress.associate = function(models) {

  };
  return ExerciseProgress;
};