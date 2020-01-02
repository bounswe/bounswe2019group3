'use strict';
module.exports = (sequelize, DataTypes) => {
  const AnnotationResource = sequelize.define('AnnotationResource', {
    target_annotation_id: {
        type: DataTypes.INTEGER,
    },
    body_annotation_id: {
        type: DataTypes.INTEGER,
    },
    _id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    id: {
        type: DataTypes.STRING,
    },
    value: {
        type: DataTypes.TEXT,
    },
    source: {
        type: DataTypes.STRING,
    },
    type: {
        type: DataTypes.STRING,
    },
    format: {
        type: DataTypes.STRING,
    },
    language: {
        type: DataTypes.STRING,
    },
    processingLanguage: {
        type: DataTypes.STRING,
    },
    textDirection: {
        type: DataTypes.STRING,
    },
    creator: {
        type: DataTypes.STRING,
    },
    purpose: {
        type: DataTypes.STRING,
    },
    // selector: {
    //     type: DataTypes.STRING,
    //     get: function() {
    //         return JSON.parse(this.getDataValue('selector'));
    //     }, 
    //     set: function(val) {
    //         return this.setDataValue('selector', JSON.stringify(val));
    //     }
    // }
  }, {});
  AnnotationResource.associate = function(models) {
    models.AnnotationResource.hasMany(models.AnnotationSelector, {
        foreignKey: 'resource_id',
        as: 'selector',
        constraints: false,
        onDelete: 'CASCADE'
    });
  };
  return AnnotationResource;
};