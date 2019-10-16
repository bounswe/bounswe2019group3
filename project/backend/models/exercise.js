'use strict';// not finished, just a skeleton
module.exports = (sequelize, DataTypes) => {
  const Exercise = sequelize.define('Exercise', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },

    desc: {
      allowNull: false,
      type: DataTypes.STRING
    }
  }, {});
  Exercise.associate = function(models) {
    // associations can be defined here
  };
  return Exercise;
};