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
    // please check Sabri
    
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
  return ExamChoice;
};