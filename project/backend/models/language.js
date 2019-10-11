'use strict';
module.exports = (sequelize, DataTypes) => {
  const Language = sequelize.define('Language', {
    abbr: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.STRING
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING
    }
  }, {});
  Language.associate = function(models) {
    models.Language.hasMany(models.ExamQuestion, {
      foreignKey: 'lang_abbr',
      as: 'exam_questions',
      constraint: false
    });
  };
  return Language;
};