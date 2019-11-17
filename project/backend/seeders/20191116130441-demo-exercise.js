"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Exercises", [
      {
        title: "Dolphins",
        lang_abbr: "en",
        exercises_type: "reading",
        level: "B2",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: "Tigers",
        lang_abbr: "en",
        exercises_type: "reading",
        level: "C1",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: "Lions",
        lang_abbr: "en",
        exercises_type: "reading",
        level: "C2",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: "Tigers Listening",
        lang_abbr: "en",
        exercises_type: "listening",
        level: "A2",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: "Lions Listening",
        lang_abbr: "en",
        exercises_type: "listening",
        level: "B1",
        createdAt: new Date(),
        updatedAt: new Date()
      },

      {
        title: "Dolphins",
        lang_abbr: "de",
        exercises_type: "reading",
        level: "B2",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: "Tigers",
        lang_abbr: "de",
        exercises_type: "reading",
        level: "C1",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: "Lions",
        lang_abbr: "de",
        exercises_type: "reading",
        level: "C2",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: "Tigers Listening",
        lang_abbr: "de",
        exercises_type: "listening",
        level: "A2",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: "Lions Listening",
        lang_abbr: "de",
        exercises_type: "listening",
        level: "B1",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  down: (queryInterface, Sequelize) => {
    const ids = [...Array(6).keys()];
    return queryInterface.bulkDelete("Exercises", {
      exercise_id: { [Sequelize.Op.in]: ids }
    });
  }
};
