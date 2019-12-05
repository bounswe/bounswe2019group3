'use strict';
module.exports = (sequelize, DataTypes) => {
  const LanguageProgress = sequelize.define('LanguageProgress', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    lang_abbr: {
      allowNull: false,
      type: DataTypes.STRING
    },
    progress: {
      allowNull: false,
      type: DataTypes.INTEGER
    }
  });
  LanguageProgress.associate = function(models) {

  };
  return LanguageProgress;
};