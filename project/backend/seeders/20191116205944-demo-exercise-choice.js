"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("ExerciseChoices", [
      {
        foreign_key: 1,
        desc: "Sample Choice 1",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        foreign_key: 1,
        desc: "Sample Choice 2",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        foreign_key: 1,
        desc: "Sample Choice 3",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        foreign_key: 2,
        desc: "Sample Choice 4",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        foreign_key: 2,
        desc: "Sample Choice 5",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        foreign_key: 2,
        desc: "Sample Choice 6",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        foreign_key: 3,
        desc: "Sample Choice 7",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        foreign_key: 3,
        desc: "Sample Choice 8",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        foreign_key: 3,
        desc: "Sample Choice 9",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  down: (queryInterface, Sequelize) => {
    const ids = [...Array(10).keys()];
    return queryInterface.bulkDelete("ExerciseChoices", {
      choice_id: { [Sequelize.Op.in]: ids }
    });
  }
};
