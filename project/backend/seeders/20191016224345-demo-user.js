'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users',[
      {
          username:   "admin",
          email:      "email1",
          bio:        "Anonymous",
          avatar:     "https://randomuser.me/api/portraits/lego/2.jpg",
          rating:     1.0,
          createdAt:  new Date(),
          updatedAt:  new Date()
      },
      {
          username:   "user",
          email:      "email2",
          bio:        "Anonymous",
          avatar:     "https://randomuser.me/api/portraits/lego/2.jpg",
          rating:     1.0,
          createdAt:  new Date(),
          updatedAt:  new Date()
      },
      {
          username:   "Anakin_Skywalker",
          email:      "email3",
          bio:        "Anonymous",
          avatar:     "https://randomuser.me/api/portraits/lego/2.jpg",
          rating:     5.0,
          createdAt:  new Date(),
          updatedAt:  new Date()
      },
      {
          username:   "Darth_Vader",
          email:      "email4",
          bio:        "Anonymous",
          avatar:     "https://randomuser.me/api/portraits/lego/2.jpg",
          rating:     5.0,
          createdAt:  new Date(),
          updatedAt:  new Date()
      },
      {
          username:   "Luke_Skywalker",
          email:      "email5",
          bio:        "Anonymous",
          avatar:     "https://randomuser.me/api/portraits/lego/2.jpg",
          rating:     4.0,
          createdAt:  new Date(),
          updatedAt:  new Date()
      },
      {
          username:   "Palpatine",
          email:      "email6",
          bio:        "Anonymous",
          avatar:     "https://randomuser.me/api/portraits/lego/2.jpg",
          rating:     2.0,
          createdAt:  new Date(),
          updatedAt:  new Date()
      },
      {
          username:   "Leia_Organa",
          email:      "email7",
          bio:        "Anonymous",
          avatar:     "https://randomuser.me/api/portraits/lego/2.jpg",
          rating:     3.0,
          createdAt:  new Date(),
          updatedAt:  new Date()
      },
      {
          username:   "Rey",
          email:      "email8",
          bio:        "Anonymous",
          avatar:     "https://randomuser.me/api/portraits/lego/2.jpg",
          rating:     3.0,
          createdAt:  new Date(),
          updatedAt:  new Date()
      },
      {
          username:   "Kylo_Ren",
          email:      "email9",
          bio:        "Anonymous",
          avatar:     "https://randomuser.me/api/portraits/lego/2.jpg",
          rating:     1.0,
          createdAt:  new Date(),
          updatedAt:  new Date()
      },
      {
          username:   "Master_Yoda",
          email:      "email10",
          bio:        "Anonymous",
          avatar:     "https://randomuser.me/api/portraits/lego/2.jpg",
          rating:     4.0,
          createdAt:  new Date(),
          updatedAt:  new Date()
      },
      {
          username:   "Obi-Wan_Kenobi",
          email:      "email11",
          bio:        "Anonymous",
          avatar:     "https://randomuser.me/api/portraits/lego/2.jpg",
          rating:     4.0,
          createdAt:  new Date(),
          updatedAt:  new Date()
      },
      {
          username:   "C-3PO",
          email:      "email12",
          bio:        "Anonymous",
          avatar:     "https://randomuser.me/api/portraits/lego/2.jpg",
          rating:     2.0,
          createdAt:  new Date(),
          updatedAt:  new Date()
      },
      {
          username:   "Han_Solo",
          email:      "email13",
          bio:        "Anonymous",
          avatar:     "https://randomuser.me/api/portraits/lego/2.jpg",
          rating:     4.0,
          createdAt:  new Date(),
          updatedAt:  new Date()
      },
      {
          username:   "Chewbacca",
          email:      "email14",
          bio:        "Anonymous",
          avatar:     "https://randomuser.me/api/portraits/lego/2.jpg",
          rating:     4.0,
          createdAt:  new Date(),
          updatedAt:  new Date()
      },
      {
          username:   "Padmé_Amidala",
          email:      "email15",
          bio:        "Anonymous",
          avatar:     "https://randomuser.me/api/portraits/lego/2.jpg",
          rating:     2.0,
          createdAt:  new Date(),
          updatedAt:  new Date()
      },
      {
          username:   "R2-D2",
          email:      "email16",
          bio:        "Anonymous",
          avatar:     "https://randomuser.me/api/portraits/lego/2.jpg",
          rating:     2.0,
          createdAt:  new Date(),
          updatedAt:  new Date()
      },
      {
          username:   "Jabba_the_Hutt",
          email:      "email17",
          bio:        "Anonymous",
          avatar:     "https://randomuser.me/api/portraits/lego/2.jpg",
          rating:     3.0,
          createdAt:  new Date(),
          updatedAt:  new Date()
      },
      {
          username:   "Mace_Windu",
          email:      "email18",
          bio:        "Anonymous",
          avatar:     "https://randomuser.me/api/portraits/lego/2.jpg",
          rating:     1.0,
          createdAt:  new Date(),
          updatedAt:  new Date()
      },
      {
          username:   "BB-8",
          email:      "email19",
          bio:        "Anonymous",
          avatar:     "https://randomuser.me/api/portraits/lego/2.jpg",
          rating:     2.0,
          createdAt:  new Date(),
          updatedAt:  new Date()
      },
      {
          username:   "Kont_Dooku",
          email:      "email20",
          bio:        "Anonymous",
          avatar:     "https://randomuser.me/api/portraits/lego/2.jpg",
          rating:     1.0,
          createdAt:  new Date(),
          updatedAt:  new Date()
      },
      {
          username:   "Poe_Dameron",
          email:      "email21",
          bio:        "Anonymous",
          avatar:     "https://randomuser.me/api/portraits/lego/2.jpg",
          rating:     1.0,
          createdAt:  new Date(),
          updatedAt:  new Date()
      },
      {
          username:   "lazyostrich850",
          email:      "robby.vanbaren@example.com",
          bio:        "I am Robby Van Baren, and I live in Wessem, Netherlands.I want to learn foreign languages.",
          avatar:     "https://randomuser.me/api/portraits/men/57.jpg",
          rating:     3.0,
          createdAt:  new Date(),
          updatedAt:  new Date()
      },
      {
          username:   "angrydog556",
          email:      "zachary.pelletier@exarmple.com",
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
          rating:     4.0,
          createdAt:  new Date(),
          updatedAt:  new Date()
      },
      {
          username:   "orangelion929",
          email:      "elza.vieira@example.com",
          bio:        "I am Elza Vieira, and I live in Poços de Caldas, Brazil.I want to learn foreign languages.",
          avatar:     "https://randomuser.me/api/portraits/women/72.jpg",
          rating:     5.0,
          createdAt:  new Date(),
          updatedAt:  new Date()
      }
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', 
    {username: {[Sequelize.Op.in]: ["admin", "user", "Anakin_Skywalker", "Darth_Vader", "Luke_Skywalker", "Palpatine", "Leia_Organa", "Rey", "Kylo_Ren", "Master_Yoda", "Obi-Wan_Kenobi", "C-3PO", "Han_Solo", "Chewbacca", "Padmé_Amidala", "R2-D2", "Jabba_the_Hutt", "Mace_Windu", "BB-8", "Kont_Dooku", "Poe_Dameron", "lazyostrich850", "angrydog556", "browncat819", "orangelion929", "admin"]}}
    );
  }
};
