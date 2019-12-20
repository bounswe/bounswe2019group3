'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Writings',[
      {
          writing_id:  1,
          title: "No real essay",
          desc: "You’re 16 and finally you can leave school!  By now, you’re probably sick of teachers, desks, tests and exams.  But don’t just run for the exit. You need to think carefully about what to do next."+
          "If you want a professional career, you will need to go to university and get a degree. To do that, you need to stay at high school for another two years.  But you needn’t stay at the same place. There are several options in the district of Northacre."+
          "St. Leopold’s School has the best pass rate of all the high schools in the district. It offers a wide range of subjects in the humanities and sciences.  St Leopold’s is, of course, a private school, so may be too expensive for you. But don’t worry, there are several other options if you want to follow the academic route.  Knowle Grammar School is a state school, so there are no fees, and it has excellent tuition and facilities. It is a boys’ school from the ages of 11-16, but from 16-18 it is co-educational. But it is selective, so you’ll have to pass an exam to get in.  If you’re interested in going into Business, check out Wyle River Academy.  This school specialises in subjects like Business Studies, Management and Economics.  If you prefer the arts, look at the courses on offer at Northacre College.  Here you can study woodwork, art, textiles and much more."+
          "Northacre College also offers a wide range of vocational qualifications.  You can do a 1-year certificate or a 2-year diploma in subjects like electrics, plumbing, roofing and hairdressing.  If you’d prefer to work outdoors, look at Milldown College, where there are courses in Farm Mechanics, Land Management, Animal Management and much more."+
          "A final option is to get an apprenticeship with a local or national company.  You will get on-the-job training, gain certificates or diplomas and start earning straight away.  But be warned - places are limited!  Find out more at the Jobs Fair on 26th May at Northacre College."+
          "You can only attend Knowle Grammar School if you…",
          written_by:  'lazyostrich850',
          assignee: 'angrydog556',
          createdAt:  new Date(),
          updatedAt:  new Date(),
      }

  ]);

  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Writings', 
    {comment_to: {[Sequelize.Op.in]: ["lazyostrich850", "angrydog556", "browncat819", "orangelion929"]}}
    );
  }
};



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
