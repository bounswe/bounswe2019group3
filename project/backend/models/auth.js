'use strict';
module.exports = (sequelize, DataTypes) => {
  const Auth = sequelize.define('Auth', {
    username: {
      primaryKey: true,
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {});
  Auth.associate = function(models) {
    // associations can be defined here
  };
  return Auth;
};