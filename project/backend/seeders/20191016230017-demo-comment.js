'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Comments',[
      {
          id          :0,
          comment_to:  0,
          rating:      5.0,
          text:        "This is truly above and beyond.",
          comment_by:   1,
          createdAt:  new Date(),
          updatedAt:  new Date()
      },
      {
          id          :1,
          comment_to:  1,
          rating:      5.0,
          text:        "You set a high bar with this one.",
          comment_by:   2,
          createdAt:  new Date(),
          updatedAt:  new Date()
      },
      {
          id          :2,
          comment_to:  2,
          rating:      5.0,
          text:        "Wonderful, this is more than I expected.",
          comment_by:   3,
          createdAt:  new Date(),
          updatedAt:  new Date()
      },
      {
          id          :3,
          comment_to:  3,
          rating:      5.0,
          text:        "This is so great I don’t need to make any revisions to it at all.",
          comment_by:   1,
          createdAt:  new Date(),
          updatedAt:  new Date()
      },
      {
          id          :4,
          comment_to:  3,
          rating:      5.0,
          text:        "You have a vibrant imagination and excels in creative writing.",
          comment_by:   0,
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
