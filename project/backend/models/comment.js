'use strict';
module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    comment_to: {
      allowNull: false,
      type: DataTypes.STRING
    },
    rating: {
      allowNull: false,
      type: DataTypes.FLOAT
    },
    text: {
      allowNull: false,
      type: DataTypes.STRING
    },
    comment_by: {
      allowNull: false,
      type: DataTypes.STRING
    }
  });
  Comment.associate = function(models) {
    models.Comment.belongsTo(models.User, {
      foreignKey: 'comment_by',
      as: 'author',
      constraints: false
  });
  };
  return Comment;
};