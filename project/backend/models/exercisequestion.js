"use strict";
module.exports = (sequelize, DataTypes) => {
  const ExerciseQuestion = sequelize.define("ExerciseQuestion", {
    question_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    lang_abbr: {
      type: DataTypes.STRING
    },
    exercise_id: {
      type: DataTypes.INTEGER
    },
    answer_id: {
      type: DataTypes.INTEGER
    },
    desc: {
      type: DataTypes.STRING
    },
    media_url: {
      type: DataTypes.STRING
    },
    media_type: {
      type: DataTypes.STRING
    },
    media_start_time: {
      type: DataTypes.INTEGER
    },
    media_end_time: {
      type: DataTypes.INTEGER
    }
  });
  ExerciseQuestion.associate = function(models) {
    models.ExerciseQuestion.hasMany(models.ExerciseChoice, {
      foreignKey: "question_id",
      as: "choices",
      constraints: false
    });
    models.ExerciseQuestion.belongsTo(models.ExerciseChoice, {
      foreignKey: "answer_id",
      as: "answer",
      constraints: false
    });
  };
  return ExerciseQuestion;
};
