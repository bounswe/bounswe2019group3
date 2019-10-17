'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Comments',[
      {
          id          :0,
          comment_id:  0,
          rating:      5.0,
          text:        "Awesome",
          author_id:   1,
          createdAt:  new Date(),
          updatedAt:  new Date()
      },
      {
          id          :1,
          comment_id:  0,
          rating:      5.0,
          text:        "Marvelous",
          author_id:   1,
          createdAt:  new Date(),
          updatedAt:  new Date()
      },
      {
          id          :2,
          comment_id:  1,
          rating:      5.0,
          text:        "Fabulous",
          author_id:   0,
          createdAt:  new Date(),
          updatedAt:  new Date()
      }

  ]);
  },

  down: (queryInterface, Sequelize) => {
    const ids = [...Array(1).keys()];
    return queryInterface.bulkDelete('Comments', 
      {id: {[Sequelize.Op.in]: ids}});
  }
};
