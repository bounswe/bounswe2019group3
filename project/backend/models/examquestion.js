'use strict';
module.exports = (sequelize, DataTypes) => {
  const ExamQuestion = sequelize.define('ExamQuestion', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    lang_abbr: {
      type: DataTypes.STRING
    },
    desc: {
      type: DataTypes.STRING
    },
    answer_id: {
      type: DataTypes.INTEGER
    }
  }, {});
  ExamQuestion.associate = function(models) {
    models.ExamQuestion.hasMany(models.ExamChoice, {
      foreignKey: 'question_id',
      as: 'choices',
      constraints: false
    });
    models.ExamQuestion.belongsTo(models.ExamChoice, {
      foreignKey: 'answer_id',
      as: 'answer',
      constraints: false
    });
  };
  return ExamQuestion;
};