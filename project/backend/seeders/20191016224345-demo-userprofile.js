'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('UserProfiles',[
      {
          id          :0,
          username:   "yusuf",
          email:      "yusufsabribayrakdar@gmail.com",
          bio:        "Student at BOUN",
          avatar:     "https://avatars.githubusercontent.com/yusufbayrakdar?size=70",
          rating:     5.0,
          createdAt:  new Date(),
          updatedAt:  new Date()
      },
      {
          id          :1,
          username:   "bayrakdar",
          email:      "sabri.bayrakdar@boun.edu.tr",
          bio:        "Student at BOUN",
          avatar:     "https://avatars.githubusercontent.com/yusufbayrakdar?size=70",
          rating:     5.0,
          createdAt:  new Date(),
          updatedAt:  new Date()
      }
    ]);
  },

  down: (queryInterface, Sequelize) => {
    const ids = [...Array(1).keys()];
    return queryInterface.bulkDelete('UserProfiles', 
      {id: {[Sequelize.Op.in]: ids}});
  }
};
