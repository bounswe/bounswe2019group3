'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('ExamQuestions',[
      // ENGLISH
      {
          id:         0,
          lang_abbr:  "en",
          desc:       "Because of its power and potential for both harm and good, ----.",
          answer_id:  3,
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
      },
      // DEUTSCH
      {
          id:         5,
          lang_abbr:  "de",
          desc:       "----, sondern benötigen meist Monate oder Jahre, um sichtbar zu werden.",
          answer_id:  1,
          createdAt:  new Date(),
          updatedAt:  new Date()
      },
      {
        id:         6,
        lang_abbr:  "de",
        desc:       "Selbst wenn die Kohlenstoffdioxid-Emissionen heute drastisch reduziert würden, ----.",
        answer_id:  0,
        createdAt:  new Date(),
        updatedAt:  new Date()
      },
      {
        id:         7,
        lang_abbr:  "de",
        desc:       "Während etwa ein 40-jähriger Lehrer noch mit 40 weiteren Jahren Lebenszeit rechnen kann, ----.",
        answer_id:  3,
        createdAt:  new Date(),
        updatedAt:  new Date()
      },
      {
        id:         8,
        lang_abbr:  "de",
        desc:       "Armut und Rückständigkeit sind eine der gefährlichsten Herausforderungen, ----.",
        answer_id:  2,
        createdAt:  new Date(),
        updatedAt:  new Date()
      },
      {
        id:         9,
        lang_abbr:  "de",
        desc:       "Ein neugeborenes Rehkitz wird so gut wie nie von Fressfeinden angegriffen, ----.",
        answer_id:  0,
        createdAt:  new Date(),
        updatedAt:  new Date()
      }
  ]);
  },

  down: (queryInterface, Sequelize) => {
    const ids = [...Array(10).keys()];
    return queryInterface.bulkDelete('ExamQuestions', 
      {id: {[Sequelize.Op.in]: ids}});
  }
};
