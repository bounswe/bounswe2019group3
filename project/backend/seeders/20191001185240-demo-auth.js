'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      const crypto = require("crypto");
      return queryInterface.bulkInsert('Auths',[
            {
                username: "admin",
                email: "email1",
                password: crypto.createHash('md5').update("pass").digest('hex'),
                role: "ADMIN",
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                username: "user",
                email: "email2",
                password: crypto.createHash('md5').update("pass").digest('hex'),
                role: "USER",
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                username:   "lazyostrich850",
                email:      "robby.vanbaren@example.com",
                password: crypto.createHash('md5').update("pass").digest('hex'),
                role: "USER",
                createdAt:  new Date(),
                updatedAt:  new Date()
            },
            {
                username:   "angrydog556",
                email:      "zachary.pelletier@example.com",
                password: crypto.createHash('md5').update("pass").digest('hex'),
                role: "USER",
                createdAt:  new Date(),
                updatedAt:  new Date()
            },
            {
                username:   "browncat819",
                email:      "lily.edwards@example.com",
                password: crypto.createHash('md5').update("pass").digest('hex'),
                role: "USER",
                createdAt:  new Date(),
                updatedAt:  new Date()
            },
            {
                username:   "orangelion929",
                email:      "zachary.pelletier@example.com",
                password: crypto.createHash('md5').update("pass").digest('hex'),
                role: "USER",
                createdAt:  new Date(),
                updatedAt:  new Date()
            },
            {
                username:   "Anakin_Skywalker",
                email:      "email3",
                password: crypto.createHash('md5').update("pass").digest('hex'),
                role: "USER",
                createdAt:  new Date(),
                updatedAt:  new Date()
            },
            {
                username:   "Darth_Vader",
                email:      "email4",
                password: crypto.createHash('md5').update("pass").digest('hex'),
                role: "USER",
                createdAt:  new Date(),
                updatedAt:  new Date()
            },
            {
                username:   "Luke_Skywalker",
                email:      "email5",
                password: crypto.createHash('md5').update("pass").digest('hex'),
                role: "USER",
                createdAt:  new Date(),
                updatedAt:  new Date()
            },
            {
                username:   "Palpatine",
                email:      "email6",
                password: crypto.createHash('md5').update("pass").digest('hex'),
                role: "USER",
                createdAt:  new Date(),
                updatedAt:  new Date()
            },
            {
                username:   "Leia_Organa",
                email:      "email7",
                password: crypto.createHash('md5').update("pass").digest('hex'),
                role: "USER",
                createdAt:  new Date(),
                updatedAt:  new Date()
            },
            {
                username:   "Rey",
                email:      "email8",
                password: crypto.createHash('md5').update("pass").digest('hex'),
                role: "USER",
                createdAt:  new Date(),
                updatedAt:  new Date()
            },
            {
                username:   "Kylo_Ren",
                email:      "email9",
                password: crypto.createHash('md5').update("pass").digest('hex'),
                role: "USER",
                createdAt:  new Date(),
                updatedAt:  new Date()
            },
            {
                username:   "Master_Yoda",
                email:      "email10",
                password: crypto.createHash('md5').update("pass").digest('hex'),
                role: "USER",
                createdAt:  new Date(),
                updatedAt:  new Date()
            },
            {
                username:   "Obi-Wan_Kenobi",
                email:      "email11",
                password: crypto.createHash('md5').update("pass").digest('hex'),
                role: "USER",
                createdAt:  new Date(),
                updatedAt:  new Date()
            },
            {
                username:   "C-3PO",
                email:      "email12",
                password: crypto.createHash('md5').update("pass").digest('hex'),
                role: "USER",
                createdAt:  new Date(),
                updatedAt:  new Date()
            },
            {
                username:   "Han_Solo",
                email:      "email13",
                password: crypto.createHash('md5').update("pass").digest('hex'),
                role: "USER",
                createdAt:  new Date(),
                updatedAt:  new Date()
            },
            {
                username:   "Chewbacca",
                email:      "email14",
                password: crypto.createHash('md5').update("pass").digest('hex'),
                role: "USER",
                createdAt:  new Date(),
                updatedAt:  new Date()
            },
            {
                username:   "Padmé_Amidala",
                email:      "email15",
                password: crypto.createHash('md5').update("pass").digest('hex'),
                role: "USER",
                createdAt:  new Date(),
                updatedAt:  new Date()
            },
            {
                username:   "R2-D2",
                email:      "email16",
                password: crypto.createHash('md5').update("pass").digest('hex'),
                role: "USER",
                createdAt:  new Date(),
                updatedAt:  new Date()
            },
            {
                username:   "Jabba_the_Hutt",
                email:      "email17",
                password: crypto.createHash('md5').update("pass").digest('hex'),
                role: "USER",
                createdAt:  new Date(),
                updatedAt:  new Date()
            },
            {
                username:   "Mace_Windu",
                email:      "email18",
                password: crypto.createHash('md5').update("pass").digest('hex'),
                role: "USER",
                createdAt:  new Date(),
                updatedAt:  new Date()
            },
            {
                username:   "BB-8",
                email:      "email19",
                password: crypto.createHash('md5').update("pass").digest('hex'),
                role: "USER",
                createdAt:  new Date(),
                updatedAt:  new Date()
            },
            {
                username:   "Kont_Dooku",
                email:      "email20",
                password: crypto.createHash('md5').update("pass").digest('hex'),
                role: "USER",
                createdAt:  new Date(),
                updatedAt:  new Date()
            }
            
        ]);
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Auths', 
      {username: {[Sequelize.Op.in]: ["admin", "user", "lazyostrich850", "angrydog556", "browncat819", "orangelion929", "Anakin_Skywalker", "Darth_Vader", "Luke_Skywalker", "Palpatine", "Leia_Organa", "Rey", "Kylo_Ren", "Master_Yoda", "Obi-Wan_Kenobi", "C-3PO", "Han_Solo", "Chewbacca", "Padmé_Amidala", "R2-D2", "Jabba_the_Hutt", "Mace_Windu", "BB-8", "Kont_Dooku", "Poe_Dameron"]}});
  }
};
