"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Exercises", [
      {
        title: "Listening Exercise-1",
        lang_abbr: "en",
        exercise_type: "reading",
        level: "B2",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: "Reading Exercise-1",
        lang_abbr: "en",
        exercise_type: "reading",
        level: "C1",
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ]);
  },

  down: (queryInterface, Sequelize) => {
    const ids = [...Array(6).keys()];
    return queryInterface.bulkDelete("Exercises", {
      exercise_id: { [Sequelize.Op.in]: ids }
    });
  }
};
