'use strict';// not finished, just a skeleton
module.exports = (sequelize, DataTypes) => {
  const Level = sequelize.define('Level', {
    lang_abbr: {
      allowNull: false,
      autoIncrement: false,
      primaryKey: true,
      type: DataTypes.STRING
    },
    grade	: {
        allowNull: false,
        autoIncrement: false,
        primaryKey: true,
        type: DataTypes.STRING
      },


  }, {});
Level.associate = function(models) {
    models.Level.belongsTo(models.UserProfile, {
      foreignKey: 'user_id',
      as: 'user',
      constraints: false
  });
  };
  return Level;
};