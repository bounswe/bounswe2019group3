'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('ExamQuestions',[
      {
          id:         0,
          lang_abbr:  "en",
          desc:       "Because of its power and potential for both harm and good, ----.",
          answer_id:  2,
          createdAt:  new Date(),
          updatedAt:  new Date()
      },
      {
          id:         1,
          lang_abbr:  "en",
          desc:       "Although alchemy began as a way to turn other metals into gold, ----.",
          answer_id:  0,
          createdAt:  new Date(),
          updatedAt:  new Date()
      },
      {
          id:         2,
          lang_abbr:  "en",
          desc:       "Forensic investigators must collect evidence while the crime scene is still fresh ----.",
          answer_id:  0,
          createdAt:  new Date(),
          updatedAt:  new Date()
      },
      {
          id:         3,
          lang_abbr:  "en",
          desc:       "Although the available evidence shows no use of colour or decoration on early footwear, ----.",
          answer_id:  1,
          createdAt:  new Date(),
          updatedAt:  new Date()
      },
      {
          id:         4,
          lang_abbr:  "en",
          desc:       "Some birds build nests simply to protect their young ----.",
          answer_id:  2,
          createdAt:  new Date(),
          updatedAt:  new Date()
      }
  ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('ExamQuestions', 
      {id: {[Sequelize.Op.in]: [0 , 1]}}
      , {});
  }
};
