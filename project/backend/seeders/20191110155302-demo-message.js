"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Messages", [
      {
        to_username: "angrydog556",
        from_username: "lazyostrich850",
        message: "Hi there",
        new: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        to_username: "browncat819",
        from_username: "orangelion929",
        message: "Hi, can you help me?",
        new: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        to_username: "angrydog556",
        from_username: "orangelion929",
        message: "Are you expert in writing?",
        new: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        to_username: "angrydog556",
        from_username: "orangelion929",
        message: "Are you expert in writing?",
        new: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        to_username: "angrydog556",
        from_username: "orangelion929",
        message: "Are you expert in writing?",
        new: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        to_username: "angrydog556",
        from_username: "orangelion929",
        message: "Are you expert in writing?",
        new: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        to_username: "angrydog556",
        from_username: "orangelion929",
        message: "Are you expert in writing?",
        new: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        to_username: "angrydog556",
        from_username: "orangelion929",
        message: "Are you expert in writing?",
        new: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        to_username: "angrydog556",
        from_username: "orangelion929",
        message: "Are you expert in writing?",
        new: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        to_username: "lazyostrich850",
        from_username: "angrydog556",
        message: "Hi there",
        new: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        to_username: "lazyostrich850",
        from_username: "angrydog556",
        message: "Hi there",
        new: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        to_username: "lazyostrich850",
        from_username: "angrydog556",
        message: "Hi there",
        new: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        to_username: "lazyostrich850",
        from_username: "angrydog556",
        message: "Hi there",
        new: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        to_username: "browncat819",
        from_username: "orangelion929",
        message: "Hi, can you help me?",
        new: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        to_username: "browncat819",
        from_username: "orangelion929",
        message: "Hi, can you help me?",
        new: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        to_username: "browncat819",
        from_username: "orangelion929",
        message: "Hi, can you help me?",
        new: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        to_username: "browncat819",
        from_username: "orangelion929",
        message: "Hi, can you help me?",
        new: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        to_username: "browncat819",
        from_username: "orangelion929",
        message: "Hi, can you help me?",
        new: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  down: (queryInterface, Sequelize) => {
    const ids = [...Array(18).keys()];
    return queryInterface.bulkDelete(
      "Messages",
      { id: { [Sequelize.Op.in]: ids } },
      {}
    );
  }
};
