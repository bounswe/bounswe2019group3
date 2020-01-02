"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Messages", [
      //angrydog556 and lazyostrich850
      {
        to_username: "angrydog556",
        from_username: "lazyostrich850",
        message: "Hi there",
        new: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        to_username: "lazyostrich850",
        from_username: "angrydog556",
        message: "Hi, how are you?",
        new: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        to_username: "angrydog556",
        from_username: "lazyostrich850",
        message: "Thanks, I'm fine.Are you expert in writing?Can you help me?",
        new: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        to_username: "lazyostrich850",
        from_username: "angrydog556",
        message: "Sure, if you send me your essay, I can check it.",
        new: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      //browncat819 and orangelion929
      {
        to_username: "browncat819",
        from_username: "orangelion929",
        message: "Hi orangelion, how are you?",
        new: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        to_username: "orangelion929",
        from_username: "browncat819",
        message: "Hi, how are you?",
        new: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        to_username: "browncat819",
        from_username: "orangelion929",
        message: "Thanks, I'm fine.Are you expert in writing?Can you help me?",
        new: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        to_username: "orangelion929",
        from_username: "browncat819",
        message:
          "Sure, if you send me your essay, I can check it.I am going to wait you to send me your essay :)",
        new: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  down: (queryInterface, Sequelize) => {
    const ids = [...Array(9).keys()];
    return queryInterface.bulkDelete(
      "Messages",
      { id: { [Sequelize.Op.in]: ids } },
      {}
    );
  }
};
