"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("ExerciseChoices", [
      {
        question_id: 1,
        desc: "They get to do a range of tasks",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        question_id: 1,
        desc: "They often suggest new idead ",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        question_id: 1,
        desc: "They sometimes arrive late",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        question_id: 2,
        desc: "He's made a lot of new friends.",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        question_id: 2,
        desc: "His teachers are pleased with hi progress",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        question_id: 2,
        desc: "He find his accommodation is very convenient",
        createdAt: new Date(),
        updatedAt: new Date()
      },
    
    ]);
  },

  down: (queryInterface, Sequelize) => {
    const ids = [...Array(10).keys()];
    return queryInterface.bulkDelete("ExerciseChoices", {
      choice_id: { [Sequelize.Op.in]: ids }
    });
  }
};
