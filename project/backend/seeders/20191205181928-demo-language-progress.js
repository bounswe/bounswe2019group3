'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('LanguageProgresses',[
      {
          username:   'lazyostrich850',
          lang_abbr:  'en',
          exercise_done:   3,
          exercises:       4,
          createdAt:  new Date(),
          updatedAt:  new Date()
      },
      {
          username:   'lazyostrich850',
          lang_abbr:  'de',
          exercise_done:   2,
          exercises:       4,
          createdAt:  new Date(),
          updatedAt:  new Date()
      },
      {
          username:   'angrydog556',
          lang_abbr:  'en',
          exercise_done:   2,
          exercises:       4,
          createdAt:  new Date(),
          updatedAt:  new Date()
      },
      {
          username:   'angrydog556',
          lang_abbr:  'de',
          exercise_done:   4,
          exercises:       4,
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
