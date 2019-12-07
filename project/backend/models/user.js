'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
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
      allowNull: true
    },
    avatar: {
      type: DataTypes.STRING,
      allowNull: true
    },
    rating: {
      type: DataTypes.FLOAT,
      allowNull: true
    }
  });
  User.associate = function(models) {
    models.User.hasMany(models.Comment, {
        foreignKey: 'comment_to',
        as: 'comments',
        constraints: false
    });
    models.User.hasMany(models.LanguageProgress, {
        foreignKey: 'username',
        as: 'language_progresses',
        constraints: false
    });
    models.User.hasMany(models.ExerciseProgress, {
        foreignKey: 'username',
        as: 'exercise_progress',
        constraints: false
    });
    models.User.hasMany(models.Level, {
      foreignKey: 'belongs_to',
      as: 'grade',
      constraints: false
    });
  };
  return User;
};