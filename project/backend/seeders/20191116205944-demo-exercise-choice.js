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
        question_id: 1,
        desc: "All of them",
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
      {
        question_id: 2,
        desc: "None of them",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        question_id: 3,
        desc: "to disagree with a previous caller.",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        question_id: 3,
        desc: "to warn other listeners about something",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        question_id: 3,
        desc: "to explain how she feels about something",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        question_id: 3,
        desc: "to warn about global warming",
        createdAt: new Date(),
        updatedAt: new Date()
      },

      {
        question_id: 4,
        desc: " the animals which were featured",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        question_id: 4,
        desc: "the quality of the photography",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        question_id: 4,
        desc: "the style of the commentary",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        question_id: 4,
        desc: "the extinction of the lions",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        question_id: 5,
        desc: "  his workplace",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        question_id: 5,
        desc: "a shopping centre",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        question_id: 5,
        desc: " the house of a friend",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        question_id: 5,
        desc: "none of these",
        createdAt: new Date(),
        updatedAt: new Date()
      },

      {
        question_id: 6,
        desc: "advise young people about how to get to university.  ",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        question_id: 6,
        desc: "tell young people about the options available.",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        question_id: 6,
        desc: " advise young people to stay in education.",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        question_id: 6,
        desc: "all of them",
        createdAt: new Date(),
        updatedAt: new Date()
      },

      {
        question_id: 7,
        desc: " go to university immediately.  ",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        question_id: 7,
        desc: "stay at the same school for two more years.  ",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        question_id: 7,
        desc: "go to high school for two more years, then get a degree.  ",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        question_id: 7,
        desc: "make a trip to China",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        question_id: 8,
        desc: "good exam results. ",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        question_id: 8,
        desc: "facilities.  ",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        question_id: 8,
        desc: " humanities and sciences.  ",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        question_id: 8,
        desc: "all of these",
        createdAt: new Date(),
        updatedAt: new Date()
      },

      {
        question_id: 9,
        desc: " pay tuition fees.  ",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        question_id: 9,
        desc: "pass an exam.  ",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        question_id: 9,
        desc: "study both humanities and sciences.  ",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        question_id: 9,
        desc: "none of these",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        question_id: 10,
        desc: "pass an exam.  ",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        question_id: 10,
        desc: "are a boy. " ,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        question_id: 10,
        desc: "can afford the tuition fees.",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        question_id: 10,
        desc: "are less than 17 years old",
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
