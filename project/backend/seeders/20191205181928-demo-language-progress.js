'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('LanguageProgresses',[
      {
          username:   'lazyostrich850',
          lang_abbr:  'en',
          progress:   30,
          createdAt:  new Date(),
          updatedAt:  new Date()
      },
      {
          username:   'lazyostrich850',
          lang_abbr:  'de',
          progress:   20,
          createdAt:  new Date(),
          updatedAt:  new Date()
      },
      {
          username:   'angrydog556',
          lang_abbr:  'en',
          progress:   60,
          createdAt:  new Date(),
          updatedAt:  new Date()
      },
      {
          username:   'angrydog556',
          lang_abbr:  'de',
          progress:   10,
          createdAt:  new Date(),
          updatedAt:  new Date()
      }
  ]);
  },

  down: (queryInterface, Sequelize) => {
    const ids = [...Array(6).keys()];
    return queryInterface.bulkDelete("LanguageProgresses", {
      id: { [Sequelize.Op.in]: ids }
    });
  }
};
