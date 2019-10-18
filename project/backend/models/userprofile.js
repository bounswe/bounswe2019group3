'use strict';
module.exports = (sequelize, DataTypes) => {
  const UserProfile = sequelize.define('UserProfile', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    username: {
      primaryKey: true,
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    bio: {
      type: DataTypes.STRING,
      allowNull: false
    },
    avatar: {
      type: DataTypes.STRING,
      allowNull: false
    },
    rating: {
      type: DataTypes.FLOAT,
      allowNull: false
    }
  });
  UserProfile.associate = function(models) {
    models.UserProfile.hasMany(models.Comment, {
        foreignKey: 'comment_id',
        as: 'comments',
        constraints: false
    });
  };
  UserProfile.associate = function(models) {
    models.UserProfile.hasMany(models.Level, {
        foreignKey: 'level_id',
        as: 'levels',
        constraints: false
    });
  };
  return UserProfile;
};