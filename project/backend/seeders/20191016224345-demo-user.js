'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users',[
      {
          username:   "lazyostrich850",
          email:      "robby.vanbaren@example.com",
          bio:        "I am Robby Van Baren, and I live in Wessem, Netherlands.I want to learn foreign languages.",
          avatar:     "https://randomuser.me/api/portraits/men/57.jpg",
          rating:     5.0,
          createdAt:  new Date(),
          updatedAt:  new Date()
      },
      {
          username:   "angrydog556",
          email:      "zachary.pelletier@example.com",
          bio:        "I am Zachary Pelletier, and I live in Fountainbleu, Canada.I want to learn foreign languages.",
          avatar:     "https://randomuser.me/api/portraits/men/42.jpg",
          rating:     5.0,
          createdAt:  new Date(),
          updatedAt:  new Date()
      },
      {
          username:   "browncat819",
          email:      "lily.edwards@example.com",
          bio:        "I am Lily Edwards, and I live in Whangarei, New Zealand.I want to learn foreign languages.",
          avatar:     "https://randomuser.me/api/portraits/women/82.jpg",
          rating:     5.0,
          createdAt:  new Date(),
          updatedAt:  new Date()
      },
      {
          username:   "orangelion929",
          email:      "zachary.pelletier@example.com",
          bio:        "I am Elza Vieira, and I live in Poços de Caldas, Brazil.I want to learn foreign languages.",
          avatar:     "https://randomuser.me/api/portraits/women/72.jpg",
          rating:     5.0,
          createdAt:  new Date(),
          updatedAt:  new Date()
      },
      {
          username:   "admin",
          email:      "admin@boun.edu.tr",
          bio:        "Anonymous.",
          avatar:     "https://randomuser.me/api/portraits/lego/2.jpg",
          rating:     5.0,
          createdAt:  new Date(),
          updatedAt:  new Date()
      }
    ]);
  },

  down: (queryInterface, Sequelize) => {
    // const ids = [...Array(5).keys()];
    // return queryInterface.bulkDelete('Users', 
    //   {id: {[Sequelize.Op.in]: ids}});

    return queryInterface.bulkDelete('Users', 
    {username: {[Sequelize.Op.in]: ["lazyostrich850", "angrydog556", "browncat819", "orangelion929", "admin"]}}
    );
  }
};
