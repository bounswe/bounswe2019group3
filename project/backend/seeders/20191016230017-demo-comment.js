'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Comments',[
      {
          comment_to:  'lazyostrich850',
          rating:      5.0,
          text:        "This is truly above and beyond.",
          comment_by:   'angrydog556',
          createdAt:  new Date(),
          updatedAt:  new Date()
      },
      {
          comment_to:  'angrydog556',
          rating:      5.0,
          text:        "You set a high bar with this one.",
          comment_by:   'browncat819',
          createdAt:  new Date(),
          updatedAt:  new Date()
      },
      {
          comment_to:  'browncat819',
          rating:      5.0,
          text:        "Wonderful, this is more than I expected.",
          comment_by:   'orangelion929',
          createdAt:  new Date(),
          updatedAt:  new Date()
      },
      {
          comment_to:  'orangelion929',
          rating:      5.0,
          text:        "This is so great I don’t need to make any revisions to it at all.",
          comment_by:  'angrydog556',
          createdAt:  new Date(),
          updatedAt:  new Date()
      },
      {
          comment_to:  'orangelion929',
          rating:      5.0,
          text:        "You have a vibrant imagination and excels in creative writing.",
          comment_by:  'lazyostrich850',
          createdAt:  new Date(),
          updatedAt:  new Date()
      }

  ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Comments', 
    {comment_to: {[Sequelize.Op.in]: ["lazyostrich850", "angrydog556", "browncat819", "orangelion929"]}}
    );
  }
};
