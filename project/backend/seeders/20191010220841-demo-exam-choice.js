'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('ExamChoices',[
      // ENGLISH
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
      {
        id:         2,
        question_id:0,
        desc:       "scientists have studied cloud seeding with the goal of making it rain in places experiencing prolonged droughts",
        createdAt:  new Date(),
        updatedAt:  new Date()
      },
      { // Correct Answer
        id:         3,
        question_id:0,
        desc:       "the weather has been a subject of intense interest and scrutiny by human beings since ancient times",
        createdAt:  new Date(),
        updatedAt:  new Date()
      },
      // Choices of Question 2
      { // Correct Answer
        id:         4,
        question_id:1,
        desc:       "it matured into a system of thinking about nature that contributed to the development of modern chemistry",
        createdAt:  new Date(),
        updatedAt:  new Date()
      },
      {
        id:         5,
        question_id:1,
        desc:       "alchemistic ideas and practices flourished in the ancient world within several cultural traditions",
        createdAt:  new Date(),
        updatedAt:  new Date()
      },
      {
        id:         6,
        question_id:1,
        desc:       "a number of spectacular failures eventually led to the disappearance of alchemy in China",
        createdAt:  new Date(),
        updatedAt:  new Date()
      },
      {
        id:         7,
        question_id:1,
        desc:       "alchemists continued in their relentless quest for gold well into the sixteenth century",
        createdAt:  new Date(),
        updatedAt:  new Date()
      },
      // Choices of Question 3
      { // Correct Answer
        id:         8,
        question_id:2,
        desc:       "even if the area is unsafe and they have to work under armed guard",
        createdAt:  new Date(),
        updatedAt:  new Date()
      },
      {
        id:         9,
        question_id:2,
        desc:       "although it is the job of forensic scientists to provide evidence at a criminal trial",
        createdAt:  new Date(),
        updatedAt:  new Date()
      },
      {
        id:         10,
        question_id:2,
        desc:       "as many sciences, from chemistry to engineering, are used in an investigation",
        createdAt:  new Date(),
        updatedAt:  new Date()
      },
      {
        id:         11,
        question_id:2,
        desc:       "since forensic scientists study evidence at the homes and workplaces of suspects",
        createdAt:  new Date(),
        updatedAt:  new Date()
      },
      // Choices of Question 4
      {
        id:         12,
        question_id:3,
        desc:       "the existence of twenty-five-thousand-year-old clothing suggests that footwear may be older than is even presently known",
        createdAt:  new Date(),
        updatedAt:  new Date()
      },
      { // Correct Answer
        id:         13,
        question_id:3,
        desc:       "the elaborate weaving on some shoes seems to indicate that prehistoric people would care about the appearance of the shoes",
        createdAt:  new Date(),
        updatedAt:  new Date()
      },
      {
        id:         14,
        question_id:3,
        desc:       "prehistoric shoes had to resist heavy usage, whether made from leather or from plant fibers",
        createdAt:  new Date(),
        updatedAt:  new Date()
      },
      {
        id:         15,
        question_id:3,
        desc:       "the oldest known shoes are ten-thousand-year-old sandals found in a desert area of eastern Oregon of the US",
        createdAt:  new Date(),
        updatedAt:  new Date()
      },
      // Choices of Question 5
      {
        id:         16,
        question_id:4,
        desc:       "since many small animals that live above the ground make their homes in trees",
        createdAt:  new Date(),
        updatedAt:  new Date()
      },
      { 
        id:         17,
        question_id:4,
        desc:       "given that they make mud huts that are placed in all kinds of places, from undergrowth to fence posts",
        createdAt:  new Date(),
        updatedAt:  new Date()
      },
      { // Correct Answer
        id:         18,
        question_id:4,
        desc:       "until they have learned how to look after themselves and survive in the wild on their own",
        createdAt:  new Date(),
        updatedAt:  new Date()
      },
      { 
        id:         19,
        question_id:4,
        desc:       "while colonies of wasps build their nests from the top downward",
        createdAt:  new Date(),
        updatedAt:  new Date()
      },
      // DEUTSCH
      // Choices of Question 1
      {
        id:         20,
        question_id:5,
        desc:       "Die Ernährungsweise und das Ernährungsverhalten der Bevölkerung haben sich dadurch nicht gebessert",
        createdAt:  new Date(),
        updatedAt:  new Date()
      },
      { // Correct Answer
        id:         21,
        question_id:5,
        desc:       "Erfolge einer guten Ernährung lassen sich nicht innerhalb weniger Tagen oder Wochen nachweisen",
        createdAt:  new Date(),
        updatedAt:  new Date()
      },
      { 
        id:         22,
        question_id:5,
        desc:       "Kohlenhydratreiche Lebensmittel werden nicht nur zu wenig konsumiert",
        createdAt:  new Date(),
        updatedAt:  new Date()
      },
      { 
        id:         23,
        question_id:5,
        desc:       "Ernährungsformen, die nur pflanzliche Lebensmittel umfassen, sind nicht gesund",
        createdAt:  new Date(),
        updatedAt:  new Date()
      },
      // Choices of Question 2
      { // Correct Answer
        id:         24,
        question_id:6,
        desc:       "würde die globale Erwärmung noch weitere Jahrhunderte anhalten",
        createdAt:  new Date(),
        updatedAt:  new Date()
      },
      { 
        id:         25,
        question_id:6,
        desc:       "würde unsere Umwelt weiterhin entlastet werden",
        createdAt:  new Date(),
        updatedAt:  new Date()
      },
      { 
        id:         26,
        question_id:6,
        desc:       "müsste man die Müllentsorgung ernster nehmen",
        createdAt:  new Date(),
        updatedAt:  new Date()
      },
      { 
        id:         27,
        question_id:6,
        desc:       "sollte man sich mit den Folgen der Luftverschmutzung auseinandersetzen",
        createdAt:  new Date(),
        updatedAt:  new Date()
      },
      // Choices of Question 3
      { 
        id:         28,
        question_id:7,
        desc:       "klagt fast jeder zweite Arbeitnehmer über steigenden Druck und permanente Erreichbarkeit",
        createdAt:  new Date(),
        updatedAt:  new Date()
      },
      { 
        id:         29,
        question_id:7,
        desc:       "denn Gebildete achten stärker auf ihre Gesundheit und können sich im Krankheitsfall Hilfe holen",
        createdAt:  new Date(),
        updatedAt:  new Date()
      },
      { 
        id:         30,
        question_id:7,
        desc:       "wird deswegen angedeutet, dass er ein geringeres Demenzrisiko hat",
        createdAt:  new Date(),
        updatedAt:  new Date()
      },
      { // Correct Answer
        id:         31,
        question_id:7,
        desc:       "hat ein gleichaltriger Bergarbeiter statistisch gesehen nur noch 26 Jahre vor sich",
        createdAt:  new Date(),
        updatedAt:  new Date()
      },
      // Choices of Question 4
      { 
        id:         32,
        question_id:8,
        desc:       "obwohl sie Kriminalität und Terrorismus begünstigen",
        createdAt:  new Date(),
        updatedAt:  new Date()
      },
      { 
        id:         33,
        question_id:8,
        desc:       "damit die Weltbevölkerung diese Probleme gemeinsam aufgreift",
        createdAt:  new Date(),
        updatedAt:  new Date()
      },
      { // Correct Answer
        id:         34,
        question_id:8,
        desc:       "mit denen die Menschheit heutzutage konfrontiert ist",
        createdAt:  new Date(),
        updatedAt:  new Date()
      },
      { 
        id:         35,
        question_id:8,
        desc:       "weil sich das Wirtschaftswachstum in den letzten Jahren verbessert hat",
        createdAt:  new Date(),
        updatedAt:  new Date()
      },
      // Choices of Question 5
      { // Correct Answer
        id:         36,
        question_id:9,
        desc:       "da es nach der Geburt geruchlos ist und von anderen Tieren nicht gewittert werden kann",
        createdAt:  new Date(),
        updatedAt:  new Date()
      },
      { 
        id:         37,
        question_id:9,
        desc:       "dass seine Mutter es vor Jägern und Raubtieren aller Art bewahrt",
        createdAt:  new Date(),
        updatedAt:  new Date()
      },
      { 
        id:         38,
        question_id:9,
        desc:       "obwohl Hirsche und Rehe ihren Nachwuchs mit großer Sorgfalt zu beschützen versuchen",
        createdAt:  new Date(),
        updatedAt:  new Date()
      },
      { 
        id:         39,
        question_id:9,
        desc:       "falls es sich auf der Suche nach Nahrung verirrt und von Jägern eingefangen wird",
        createdAt:  new Date(),
        updatedAt:  new Date()
      }  
      ]);
  },

  down: (queryInterface, Sequelize) => {
    const ids = [...Array(40).keys()];
    return queryInterface.bulkDelete('ExamChoices', 
      {id: {[Sequelize.Op.in]: ids}}, {});
  }
};
