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
        answer_id: 7,
        media_url: "https://www.youtube.com/watch?v=ZoUCAGV0UeQ",
        media_type: "youtube",
        media_start_time: 88,
        media_end_time: 116,
        createdAt: new Date(),
        updatedAt: new Date()
      },
   
      {
        desc: "You hear a caller on a radio phone-in programme. Why has she phoned?",
        lang_abbr: "en",
        exercise_id: 1,
        answer_id: 11,
        media_url: "https://www.youtube.com/watch?v=ZoUCAGV0UeQ",
        media_type: "youtube",
        media_start_time: 235,
        media_end_time: 295,
        createdAt: new Date(),
        updatedAt: new Date()
      },

      {
        desc: "You hear a man talking about a wildlife documentary. What aspect of it disappointed him?",
        lang_abbr: "en",
        exercise_id: 1,
        answer_id: 14,
        media_url: "https://www.youtube.com/watch?v=ZoUCAGV0UeQ",
        media_type: "youtube",
        media_start_time: 328,
        media_end_time: 367,
        createdAt: new Date(),
        updatedAt: new Date()
      },

      {
        desc: "You overhear two people talking in a cafe. The man has just come from?",
        lang_abbr: "en",
        exercise_id: 1,
        answer_id: 17,
        media_url: "https://www.youtube.com/watch?v=ZoUCAGV0UeQ",
        media_type: "youtube",
        media_start_time: 438,
        media_end_time: 467,
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
