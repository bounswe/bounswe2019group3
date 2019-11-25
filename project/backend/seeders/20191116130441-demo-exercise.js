"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Exercises", [
      {
        title: "Listening Exercise- Sample",
        lang_abbr: "en",
        exercise_type: "listening",
        level: "B2",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: "Reading Exercise-Sample",
        lang_abbr: "en",
        exercise_type: "reading",
        level: "A2",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: "Grammar Exercise-Sample",
        lang_abbr: "en",
        exercise_type: "grammar",
        level: "B1",
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
