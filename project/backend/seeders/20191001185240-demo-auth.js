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
            }
        ], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Auths', 
      {username: {[Sequelize.Op.in]: ["admin", "user"]}}
      , {});
  }
};
