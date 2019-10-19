'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Levels',[
      {
          belongs_to:  'lazyostrich850',
          lang_abbr: 'en',
          grade:   'B2',
          createdAt:  new Date(),
          updatedAt:  new Date()
      },
      {
          belongs_to:  'lazyostrich850',
          lang_abbr: 'de',
          grade:   'A2',
          createdAt:  new Date(),
          updatedAt:  new Date()
      },
      {
          belongs_to:  'angrydog556',
          lang_abbr: 'en',
          grade:   'C1',
          createdAt:  new Date(),
          updatedAt:  new Date()
      },
      {
          belongs_to:  'angrydog556',
          lang_abbr: 'de',
          grade:   'A1',
          createdAt:  new Date(),
          updatedAt:  new Date()
      },
      {
          belongs_to:  'browncat819',
          lang_abbr: 'en',
          grade:   'C2',
          createdAt:  new Date(),
          updatedAt:  new Date()
      },
      {
          belongs_to:  'browncat819',
          lang_abbr: 'de',
          grade:   'C1',
          createdAt:  new Date(),
          updatedAt:  new Date()
      },
      {
          belongs_to:  'orangelion929',
          lang_abbr: 'en',
          grade:   'A2',
          createdAt:  new Date(),
          updatedAt:  new Date()
      },
      {
          belongs_to:  'orangelion929',
          lang_abbr: 'de',
          grade:   'C1',
          createdAt:  new Date(),
          updatedAt:  new Date()
      },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Levels', 
    {belongs_to: {[Sequelize.Op.in]: ["lazyostrich850", "angrydog556", "browncat819", "orangelion929"]}}
    );
  }
};
