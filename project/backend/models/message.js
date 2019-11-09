'use strict';
module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define('Message', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    to_username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    from_username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    message: {
      type: DataTypes.STRING,
      allowNull: false
    },
    new: {
      type: Sequelize.BOOLEAN, 
      allowNull: false, 
      defaultValue: true
    },
  }, {});
  Message.associate = function(models) {
    // associations can be defined here
  };
  return Message;
};


