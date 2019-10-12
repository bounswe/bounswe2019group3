'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('ExamChoices',[
      // Choices of Question 1
      { 
        id:         0,
        question_id:0,
        desc:       "modern meteorology has made notable improvements in the critical discipline of predicting severe weather",
        createdAt:  new Date(),
        updatedAt:  new Date()
      },
      {
        id:         1,
        question_id:0,
        desc:       "meteorologists are the only professionals who can keep their jobs and still be wrong half the time",
        createdAt:  new Date(),
        updatedAt:  new Date()
      },
      { // Correct Answer
        id:         2,
        question_id:0,
        desc:       "the weather has been a subject of intense interest and scrutiny by human beings since ancient times",
        createdAt:  new Date(),
        updatedAt:  new Date()
      },
      // Choices of Question 2
      { // Correct Answer
        id:         3,
        question_id:1,
        desc:       "it matured into a system of thinking about nature that contributed to the development of modern chemistry",
        createdAt:  new Date(),
        updatedAt:  new Date()
      },
      {
        id:         4,
        question_id:1,
        desc:       "alchemistic ideas and practices flourished in the ancient world within several cultural traditions",
        createdAt:  new Date(),
        updatedAt:  new Date()
      },
      {
        id:         5,
        question_id:1,
        desc:       "a number of spectacular failures eventually led to the disappearance of alchemy in China",
        createdAt:  new Date(),
        updatedAt:  new Date()
      },
      // Choices of Question 3
      { // Correct Answer
        id:         6,
        question_id:2,
        desc:       "even if the area is unsafe and they have to work under armed guard",
        createdAt:  new Date(),
        updatedAt:  new Date()
      },
      {
        id:         7,
        question_id:2,
        desc:       "although it is the job of forensic scientists to provide evidence at a criminal trial",
        createdAt:  new Date(),
        updatedAt:  new Date()
      },
      {
        id:         8,
        question_id:2,
        desc:       "as many sciences, from chemistry to engineering, are used in an investigation",
        createdAt:  new Date(),
        updatedAt:  new Date()
      },
      // Choices of Question 4
      {
        id:         9,
        question_id:3,
        desc:       "the existence of twenty-five-thousand-year-old clothing suggests that footwear may be older than is even presently known",
        createdAt:  new Date(),
        updatedAt:  new Date()
      },
      { // Correct Answer
        id:         10,
        question_id:3,
        desc:       "the elaborate weaving on some shoes seems to indicate that prehistoric people would care about the appearance of the shoes",
        createdAt:  new Date(),
        updatedAt:  new Date()
      },
      {
        id:         11,
        question_id:3,
        desc:       "prehistoric shoes had to resist heavy usage, whether made from leather or from plant fibers",
        createdAt:  new Date(),
        updatedAt:  new Date()
      },
      // Choices of Question 5
      {
        id:         12,
        question_id:4,
        desc:       "since many small animals that live above the ground make their homes in trees",
        createdAt:  new Date(),
        updatedAt:  new Date()
      },
      { 
        id:         13,
        question_id:4,
        desc:       "given that they make mud huts that are placed in all kinds of places, from undergrowth to fence posts",
        createdAt:  new Date(),
        updatedAt:  new Date()
      },
      { // Correct Answer
        id:         14,
        question_id:4,
        desc:       "until they have learned how to look after themselves and survive in the wild on their own",
        createdAt:  new Date(),
        updatedAt:  new Date()
      }
      
  ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('ExamChoices', 
      {id: {[Sequelize.Op.in]: [0 , 1]}}
      , {});
  }
};
