'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('ExerciseProgresses',[
      {
          username:   'lazyostrich850',
          exercise_id:  1,
          question_done:  3,
          questions:  5,
          createdAt:  new Date(),
          updatedAt:  new Date()
      },
      {
          username:   'lazyostrich850',
          exercise_id:  2,
          question_done:  4,
          questions:  5,
          createdAt:  new Date(),
          updatedAt:  new Date()
      },
      {
          username:   'angrydog556',
          exercise_id:  3,
          question_done:  2,
          questions:  5,
          createdAt:  new Date(),
          updatedAt:  new Date()
      },
      {
          username:   'angrydog556',
          exercise_id:  4,
          question_done:  5,
          questions:  5,
          createdAt:  new Date(),
          updatedAt:  new Date()
      }
  ]);
  },

  down: (queryInterface, Sequelize) => {
    const ids = [...Array(6).keys()];
    return queryInterface.bulkDelete("ExerciseProgresses", {
      id: { [Sequelize.Op.in]: ids }
    });
  }
};
