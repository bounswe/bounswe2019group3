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
      {
          belongs_to:  'Anakin_Skywalker',
          lang_abbr: 'en',
          grade:   'B2',
          createdAt:  new Date(),
          updatedAt:  new Date()
      },
      {
          belongs_to:  'Darth_Vader',
          lang_abbr: 'en',
          grade:   'B2',
          createdAt:  new Date(),
          updatedAt:  new Date()
      },
      {
          belongs_to:  'Luke_Skywalker',
          lang_abbr: 'en',
          grade:   'B1',
          createdAt:  new Date(),
          updatedAt:  new Date()
      },
      {
          belongs_to:  'Palpatine',
          lang_abbr: 'de',
          grade:   'A1',
          createdAt:  new Date(),
          updatedAt:  new Date()
      },
      {
          belongs_to:  'Leia_Organa',
          lang_abbr: 'de',
          grade:   'A2',
          createdAt:  new Date(),
          updatedAt:  new Date()
      },
      {
          belongs_to:  'Rey',
          lang_abbr: 'de',
          grade:   'A2',
          createdAt:  new Date(),
          updatedAt:  new Date()
      },
      {
          belongs_to:  'Kylo_Ren',
          lang_abbr: 'de',
          grade:   'A1',
          createdAt:  new Date(),
          updatedAt:  new Date()
      },
      {
          belongs_to:  'Master_Yoda',
          lang_abbr: 'en',
          grade:   'C1',
          createdAt:  new Date(),
          updatedAt:  new Date()
      },
      {
          belongs_to:  'Obi-Wan_Kenobi',
          lang_abbr: 'en',
          grade:   'B2',
          createdAt:  new Date(),
          updatedAt:  new Date()
      },
      {
          belongs_to:  'C-3PO',
          lang_abbr: 'de',
          grade:   'A1',
          createdAt:  new Date(),
          updatedAt:  new Date()
      },
      {
          belongs_to:  'Han_Solo',
          lang_abbr: 'en',
          grade:   'B2',
          createdAt:  new Date(),
          updatedAt:  new Date()
      },
      {
          belongs_to:  'Chewbacca',
          lang_abbr: 'en',
          grade:   'B1',
          createdAt:  new Date(),
          updatedAt:  new Date()
      },
      {
          belongs_to:  'Padmé_Amidala',
          lang_abbr: 'en',
          grade:   'A2',
          createdAt:  new Date(),
          updatedAt:  new Date()
      },
      {
          belongs_to:  'R2-D2',
          lang_abbr: 'en',
          grade:   'A1',
          createdAt:  new Date(),
          updatedAt:  new Date()
      },
      {
          belongs_to:  'Jabba_the_Hutt',
          lang_abbr: 'en',
          grade:   'B1',
          createdAt:  new Date(),
          updatedAt:  new Date()
      },
      {
          belongs_to:  'Mace_Windu',
          lang_abbr: 'en',
          grade:   'A1',
          createdAt:  new Date(),
          updatedAt:  new Date()
      },
      {
          belongs_to:  'BB-8',
          lang_abbr: 'en',
          grade:   'A1',
          createdAt:  new Date(),
          updatedAt:  new Date()
      },
      {
          belongs_to:  'Kont_Dooku',
          lang_abbr: 'en',
          grade:   'A1',
          createdAt:  new Date(),
          updatedAt:  new Date()
      },
      {
          belongs_to:  'Poe_Dameron',
          lang_abbr: 'en',
          grade:   'A1',
          createdAt:  new Date(),
          updatedAt:  new Date()
      }
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Levels', 
    {belongs_to: {[Sequelize.Op.in]: ["lazyostrich850", "angrydog556", "browncat819", "orangelion929"]}}
    );
  }
};
