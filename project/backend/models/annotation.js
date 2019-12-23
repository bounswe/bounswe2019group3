'use strict';
module.exports = (sequelize, DataTypes) => {
  const Annotation = sequelize.define('Annotation', {
    '@context': {
        type: DataTypes.STRING,
        allowNull: false
    },
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    type: {
        type: DataTypes.STRING,
        allowNull: false
    },
    creator: {
        type: DataTypes.STRING
    },
    motivation: {
      type: DataTypes.STRING
    },
  }, {});
  Annotation.associate = function(models) {
    models.Annotation.hasMany(models.AnnotationResource, {
        foreignKey: 'target_annotation_id',
        as: 'target',
        constraints: false,
        onDelete: 'CASCADE'
    });
    models.Annotation.hasMany(models.AnnotationResource, {
        foreignKey: 'body_annotation_id',
        as: 'body',
        constraints: false,
        onDelete: 'CASCADE'
    });
  };
  return Annotation;
};