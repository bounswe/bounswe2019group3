'use strict';// not finished, just a skeleton
module.exports = (sequelize, DataTypes) => {
  const Level = sequelize.define('Level', {
    id: {
      allowNull: false,
      autoIncrement: false,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    belongs_to: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    lang_abbr: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.STRING
    },
    grade	: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.STRING
    },
  });
Level.associate = function(models) {
  models.Level.belongsTo(models.User, {
    foreignKey: 'belongs_to',
    as: 'grades',
    constraints: false
});
};
  return Level;
};