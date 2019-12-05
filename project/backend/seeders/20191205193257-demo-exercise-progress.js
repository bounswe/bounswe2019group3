'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('ExerciseProgresses',[
      {
          username:   'lazyostrich850',
          exercise_id:  1,
          progress:   30,
          createdAt:  new Date(),
          updatedAt:  new Date()
      },
      {
          username:   'lazyostrich850',
          exercise_id:  2,
          progress:   20,
          createdAt:  new Date(),
          updatedAt:  new Date()
      },
      {
          username:   'angrydog556',
          exercise_id:  3,
          progress:   60,
          createdAt:  new Date(),
          updatedAt:  new Date()
      },
      {
          username:   'angrydog556',
          exercise_id:  4,
          progress:   10,
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
