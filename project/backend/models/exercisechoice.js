"use strict";
module.exports = (sequelize, DataTypes) => {
  const ExerciseChoice = sequelize.define("ExerciseChoice", {
    choice_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    foreign_key: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    desc: {
      allowNull: false,
      type: DataTypes.STRING
    }
  });
  ExerciseChoice.associate = function(models) {};
  return ExerciseChoice;
};
