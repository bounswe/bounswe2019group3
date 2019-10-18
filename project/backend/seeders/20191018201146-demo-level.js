'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Levels',[
      {
          id          :0,
          belongs_to:  0,
          lang_abbr: 'en',
          grade:   'B2',
          createdAt:  new Date(),
          updatedAt:  new Date()
      },
      {
          id          :1,
          belongs_to:  0,
          lang_abbr: 'de',
          grade:   'A2',
          createdAt:  new Date(),
          updatedAt:  new Date()
      },
      {
          id          :2,
          belongs_to:  1,
          lang_abbr: 'en',
          grade:   'C1',
          createdAt:  new Date(),
          updatedAt:  new Date()
      },
      {
          id          :3,
          belongs_to:  1,
          lang_abbr: 'de',
          grade:   'A1',
          createdAt:  new Date(),
          updatedAt:  new Date()
      },
      {
          id          :4,
          belongs_to:  2,
          lang_abbr: 'en',
          grade:   'C2',
          createdAt:  new Date(),
          updatedAt:  new Date()
      },
      {
          id          :5,
          belongs_to:  2,
          lang_abbr: 'de',
          grade:   'C1',
          createdAt:  new Date(),
          updatedAt:  new Date()
      },
      {
          id          :6,
          belongs_to:  3,
          lang_abbr: 'en',
          grade:   'A2',
          createdAt:  new Date(),
          updatedAt:  new Date()
      },
      {
          id          :7,
          belongs_to:  3,
          lang_abbr: 'de',
          grade:   'C1',
          createdAt:  new Date(),
          updatedAt:  new Date()
      },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    const ids = [...Array(8).keys()];
    return queryInterface.bulkDelete('Levels', 
      {id: {[Sequelize.Op.in]: ids}});
  }
};
