"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("ExerciseQuestions", [
      {
        desc: "Sample Question Description 1",
        lang_abbr: "en",
        exercise_id: 1,
        answer_id: 1,
        media_url: "http://someurl.com/material",
        media_type: "MP4",
        media_start_time: 0,
        media_end_time: 47,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        desc: "Sample Question Description 2",
        lang_abbr: "en",
        exercise_id: 1,
        answer_id: 6,
        media_url: "http://someurl.com/material",
        media_type: "MP3",
        media_start_time: 0,
        media_end_time: 33,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        desc: "Sample Question Description 3",
        lang_abbr: "de",
        exercise_id: 2,
        answer_id: 8,
        media_url: "http://someurl.com/material",
        media_type: "MP4",
        media_start_time: 0,
        media_end_time: 38,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  down: (queryInterface, Sequelize) => {
    const ids = [...Array(4).keys()];
    return queryInterface.bulkDelete("ExerciseQuestions", {
      question_id: { [Sequelize.Op.in]: ids }
    });
  }
};
