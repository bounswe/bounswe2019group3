'use strict';
module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    comment_id: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    rating: {
      allowNull: false,
      type: DataTypes.FLOAT
    },
    text: {
      allowNull: false,
      type: DataTypes.STRING
    },
    author_id: {
      allowNull: false,
      type: DataTypes.INTEGER
    }
  });
  Comment.associate = function(models) {
    models.Comment.belongsTo(models.UserProfile, {
      foreignKey: 'author_id',
      as: 'author',
      constraints: false
  });
  };
  return Comment;
};