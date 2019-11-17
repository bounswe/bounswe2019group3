"use strict";
module.exports = (sequelize, DataTypes) => {
  const Exercise = sequelize.define("Exercise", {
    exercise_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    title: {
      type: DataTypes.STRING
    },
    lang_abbr: {
      type: DataTypes.STRING
    },
    exercises_type: {
      type: DataTypes.STRING
    },
    level: {
      type: DataTypes.STRING
    }
  });
  Exercise.associate = function(models) {
    models.Exercise.hasMany(models.ExerciseQuestion, {
      foreignKey: "foreign_key",
      as: "exercise_questions",
      constraints: false
    });
  };
  return Exercise;
};
