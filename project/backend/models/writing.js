'use strict';
module.exports = (sequelize, DataTypes) => {
  const Writing = sequelize.define('Writing', {
    writing_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    title: {
      type: DataTypes.STRING
    },
    text: {
      allowNull: false,
      type: DataTypes.TEXT
    },
    written_by: {
      allowNull: false,
      type: DataTypes.STRING
    },
    assignee: {
      type: DataTypes.STRING
    }
  });
  Writing.associate = function(models) {
  //   models.Writing.belongsTo(models.User, {
  //     foreignKey: 'written_by',
  //     as: 'author',
  //     constraints: false
  // });
  };
  return Writing;
};