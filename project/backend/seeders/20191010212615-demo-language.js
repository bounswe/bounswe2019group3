'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Languages',[
      {
          abbr: "en",
          name: "English",
          createdAt: new Date(),
          updatedAt: new Date()
      },
      {
        abbr: "de",
        name: "Deutsch",
        createdAt: new Date(),
        updatedAt: new Date()
      }
  ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Languages', 
      {abbr: {[Sequelize.Op.in]: ["en", "de"]}}
      , {});
  }
};
