"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("ExerciseQuestions", [
      {
        desc: "You hear a hotel manager talking about the staff who work for her.What does she say about them?",
        lang_abbr: "en",
        exercise_id: 1,
        answer_id: 1,
        media_url: "https://www.youtube.com/watch?v=ZoUCAGV0UeQ",
        media_type: "youtube",
        media_start_time: 51,
        media_end_time: 84,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        desc: "You hear a student talking on the phone.What does he say about life at college",
        lang_abbr: "en",
        exercise_id: 1,
        answer_id: 6,
        media_url: "https://www.youtube.com/watch?v=ZoUCAGV0UeQ",
        media_type: "youtube",
        media_start_time: 88,
        media_end_time: 116,
        createdAt: new Date(),
        updatedAt: new Date()
      },

    ]);
  },

  down: (queryInterface, Sequelize) => {
    const ids = [...Array(4).keys()];
    return queryInterface.bulkDelete("ExerciseQuestions", {
      question_id: { [Sequelize.Op.in]: ids }
    });
  }
};
