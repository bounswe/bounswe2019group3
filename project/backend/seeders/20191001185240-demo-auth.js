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
            }
        ]);
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Auths', 
      {username: {[Sequelize.Op.in]: ["admin", "user", "lazyostrich850", "angrydog556", "browncat819", "orangelion929"]}});
  }
};
