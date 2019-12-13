'use strict';
module.exports = (sequelize, DataTypes) => {
  const Writing = sequelize.define('Writing', {
    writing_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    author: {
      allowNull: false,
      type: DataTypes.STRING
    },
    reviewer: {
      allowNull: false,
      type: DataTypes.STRING
    },
    text: {
      allowNull: false,
      type: DataTypes.STRING
    },
    title: {
        type: DataTypes.STRING
    },
  });
  Writing.associate = function(models) {
    models.writing.belongsTo(models.User, {
      foreignKey: 'written_by',
      as: 'author',
      constraints: false
    });
  };
  return Writing;
};