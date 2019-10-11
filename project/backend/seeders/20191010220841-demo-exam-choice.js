'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('ExamChoices',[
      {
        id:         0,
        question_id:0,
        desc:       "modern meteorology has made notable improvements in the critical discipline of predicting severe weather",
        createdAt:  new Date(),
        updatedAt:  new Date()
      },
      {
        id:         1,
        question_id:0,
        desc:       "meteorologists are the only professionals who can keep their jobs and still be wrong half the time",
        createdAt:  new Date(),
        updatedAt:  new Date()
      }
  ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('ExamChoices', 
      {id: {[Sequelize.Op.in]: [0 , 1]}}
      , {});
  }
};
