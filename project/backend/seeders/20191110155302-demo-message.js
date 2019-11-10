"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Messages", [
      {
        id: 0,
        to_username: "lazyostrich850",
        from_username: "angrydog556",
        message: "Hi there",
        new: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 1,
        to_username: "browncat819",
        from_username: "orangelion929",
        message: "Hi, can you help me?",
        new: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        to_username: "angrydog556",
        from_username: "orangelion929",
        message: "Are you expert in writing?",
        new: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 3,
        to_username: "angrydog556",
        from_username: "orangelion929",
        message: "Are you expert in writing?",
        new: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 4,
        to_username: "angrydog556",
        from_username: "orangelion929",
        message: "Are you expert in writing?",
        new: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 5,
        to_username: "angrydog556",
        from_username: "orangelion929",
        message: "Are you expert in writing?",
        new: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 6,
        to_username: "angrydog556",
        from_username: "orangelion929",
        message: "Are you expert in writing?",
        new: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 7,
        to_username: "angrydog556",
        from_username: "orangelion929",
        message: "Are you expert in writing?",
        new: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 8,
        to_username: "angrydog556",
        from_username: "orangelion929",
        message: "Are you expert in writing?",
        new: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 9,
        to_username: "lazyostrich850",
        from_username: "angrydog556",
        message: "Hi there",
        new: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 10,
        to_username: "lazyostrich850",
        from_username: "angrydog556",
        message: "Hi there",
        new: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 11,
        to_username: "lazyostrich850",
        from_username: "angrydog556",
        message: "Hi there",
        new: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 12,
        to_username: "lazyostrich850",
        from_username: "angrydog556",
        message: "Hi there",
        new: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 13,
        to_username: "browncat819",
        from_username: "orangelion929",
        message: "Hi, can you help me?",
        new: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 14,
        to_username: "browncat819",
        from_username: "orangelion929",
        message: "Hi, can you help me?",
        new: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 15,
        to_username: "browncat819",
        from_username: "orangelion929",
        message: "Hi, can you help me?",
        new: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 16,
        to_username: "browncat819",
        from_username: "orangelion929",
        message: "Hi, can you help me?",
        new: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 17,
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
