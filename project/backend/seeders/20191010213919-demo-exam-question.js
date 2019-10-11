'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('ExamQuestions',[
      {
          id:         0,
          abbr:    "en",
          desc:       "Because of its power and potential for both harm and good, ----.",
          answid:     3,
          createdAt:  new Date(),
          updatedAt:  new Date()
      },
      {
          id:         1,
          abbr:    "en",
          desc:       "Forensic investigators must collect evidence while the crime scene is still fresh ----.",
          answid:     3,
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
