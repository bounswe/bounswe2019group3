'use strict';
module.exports = (sequelize, DataTypes) => {
  const AnnotationSelector = sequelize.define('AnnotationSelector', {
    resource_id: {
        type: DataTypes.INTEGER,
    },
    type: {
        type: DataTypes.STRING,
    },
    value: {
        type: DataTypes.STRING,
    },
    conformsTo: {
        type: DataTypes.STRING,
    },
    exact: {
        type: DataTypes.STRING,
    },
    prefix: {
        type: DataTypes.STRING,
    },
    suffix: {
        type: DataTypes.STRING,
    },
    start: {
        type: DataTypes.STRING,
    },
    end: {
        type: DataTypes.STRING,
    }
  }, {});
  AnnotationSelector.associate = function(models) {

  };
  return AnnotationSelector;
};