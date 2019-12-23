"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Exercises", [
      {
        title: "Listening Exercise- Sample",
        lang_abbr: "en",
        exercise_type: "listening",
        level: "B2",
        tags: "phone, conversation, documentary",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: "Reading Exercise-Sample",
        lang_abbr: "en",
        exercise_type: "reading",
        level: "A2",
        tags: "school, career, youth",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: "Grammar Exercise-Sample",
        lang_abbr: "en",
        exercise_type: "grammar",
        level: "B1",
        tags: "conditionals,future tense,past tense",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      
      {
        title: "Writing Exercise-Sample",
        lang_abbr: "en",
        exercise_type: "writing",
        level: "B1",
        tags: "animal,zoo",
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
