"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("ExerciseQuestions", [
      {
        desc: "You hear a hotel manager talking about the staff who work for her.What does she say about them?",
        lang_abbr: "en",
        exercise_id: 1,
        answer_id: 1,
        media_url: "https://www.youtube.com/watch?v=ZoUCAGV0UeQ",
        media_type: "youtube",
        media_start_time: 51,
        media_end_time: 84,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        desc: "You hear a student talking on the phone.What does he say about life at college",
        lang_abbr: "en",
        exercise_id: 1,
        answer_id: 7,
        media_url: "https://www.youtube.com/watch?v=ZoUCAGV0UeQ",
        media_type: "youtube",
        media_start_time: 88,
        media_end_time: 116,
        createdAt: new Date(),
        updatedAt: new Date()
      },
   
      {
        desc: "You hear a caller on a radio phone-in programme. Why has she phoned?",
        lang_abbr: "en",
        exercise_id: 1,
        answer_id: 11,
        media_url: "https://www.youtube.com/watch?v=ZoUCAGV0UeQ",
        media_type: "youtube",
        media_start_time: 235,
        media_end_time: 295,
        createdAt: new Date(),
        updatedAt: new Date()
      },

      {
        desc: "You hear a man talking about a wildlife documentary. What aspect of it disappointed him?",
        lang_abbr: "en",
        exercise_id: 1,
        answer_id: 14,
        media_url: "https://www.youtube.com/watch?v=ZoUCAGV0UeQ",
        media_type: "youtube",
        media_start_time: 328,
        media_end_time: 367,
        createdAt: new Date(),
        updatedAt: new Date()
      },

      {
        desc: "You overhear two people talking in a cafe. The man has just come from?",
        lang_abbr: "en",
        exercise_id: 1,
        answer_id: 17,
        media_url: "https://www.youtube.com/watch?v=ZoUCAGV0UeQ",
        media_type: "youtube",
        media_start_time: 438,
        media_end_time: 467,
        createdAt: new Date(),
        updatedAt: new Date()
      },


/*
      {
        desc: "You’re 16 and finally you can leave school!  By now, you’re probably sick of teachers, desks, tests and exams.  But don’t just run for the exit. You need to think carefully about what to do next."+
        "If you want a professional career, you will need to go to university and get a degree. To do that, you need to stay at high school for another two years.  But you needn’t stay at the same place. There are several options in the district of Northacre."+
        "St. Leopold’s School has the best pass rate of all the high schools in the district. It offers a wide range of subjects in the humanities and sciences.  St Leopold’s is, of course, a private school, so may be too expensive for you. But don’t worry, there are several other options if you want to follow the academic route.  Knowle Grammar School is a state school, so there are no fees, and it has excellent tuition and facilities. It is a boys’ school from the ages of 11-16, but from 16-18 it is co-educational. But it is selective, so you’ll have to pass an exam to get in.  If you’re interested in going into Business, check out Wyle River Academy.  This school specialises in subjects like Business Studies, Management and Economics.  If you prefer the arts, look at the courses on offer at Northacre College.  Here you can study woodwork, art, textiles and much more."+
        "Northacre College also offers a wide range of vocational qualifications.  You can do a 1-year certificate or a 2-year diploma in subjects like electrics, plumbing, roofing and hairdressing.  If you’d prefer to work outdoors, look at Milldown College, where there are courses in Farm Mechanics, Land Management, Animal Management and much more."+
        "A final option is to get an apprenticeship with a local or national company.  You will get on-the-job training, gain certificates or diplomas and start earning straight away.  But be warned - places are limited!  Find out more at the Jobs Fair on 26th May at Northacre College."+
        "The aim of the article is to…",
        lang_abbr: "en",
        exercise_id: 2,
        answer_id: 22,

        createdAt: new Date(),
        updatedAt: new Date()
      },


      {
        desc: "You’re 16 and finally you can leave school!  By now, you’re probably sick of teachers, desks, tests and exams.  But don’t just run for the exit. You need to think carefully about what to do next."+
        "If you want a professional career, you will need to go to university and get a degree. To do that, you need to stay at high school for another two years.  But you needn’t stay at the same place. There are several options in the district of Northacre."+
        "St. Leopold’s School has the best pass rate of all the high schools in the district. It offers a wide range of subjects in the humanities and sciences.  St Leopold’s is, of course, a private school, so may be too expensive for you. But don’t worry, there are several other options if you want to follow the academic route.  Knowle Grammar School is a state school, so there are no fees, and it has excellent tuition and facilities. It is a boys’ school from the ages of 11-16, but from 16-18 it is co-educational. But it is selective, so you’ll have to pass an exam to get in.  If you’re interested in going into Business, check out Wyle River Academy.  This school specialises in subjects like Business Studies, Management and Economics.  If you prefer the arts, look at the courses on offer at Northacre College.  Here you can study woodwork, art, textiles and much more."+
        "Northacre College also offers a wide range of vocational qualifications.  You can do a 1-year certificate or a 2-year diploma in subjects like electrics, plumbing, roofing and hairdressing.  If you’d prefer to work outdoors, look at Milldown College, where there are courses in Farm Mechanics, Land Management, Animal Management and much more."+
        "A final option is to get an apprenticeship with a local or national company.  You will get on-the-job training, gain certificates or diplomas and start earning straight away.  But be warned - places are limited!  Find out more at the Jobs Fair on 26th May at Northacre College."+
        " The article advises reader who want a professional career to…",
        lang_abbr: "en",
        exercise_id: 2,
        answer_id: 27,

        createdAt: new Date(),
        updatedAt: new Date()
      },



      {
        desc: "You’re 16 and finally you can leave school!  By now, you’re probably sick of teachers, desks, tests and exams.  But don’t just run for the exit. You need to think carefully about what to do next."+
        "If you want a professional career, you will need to go to university and get a degree. To do that, you need to stay at high school for another two years.  But you needn’t stay at the same place. There are several options in the district of Northacre."+
        "St. Leopold’s School has the best pass rate of all the high schools in the district. It offers a wide range of subjects in the humanities and sciences.  St Leopold’s is, of course, a private school, so may be too expensive for you. But don’t worry, there are several other options if you want to follow the academic route.  Knowle Grammar School is a state school, so there are no fees, and it has excellent tuition and facilities. It is a boys’ school from the ages of 11-16, but from 16-18 it is co-educational. But it is selective, so you’ll have to pass an exam to get in.  If you’re interested in going into Business, check out Wyle River Academy.  This school specialises in subjects like Business Studies, Management and Economics.  If you prefer the arts, look at the courses on offer at Northacre College.  Here you can study woodwork, art, textiles and much more."+
        "Northacre College also offers a wide range of vocational qualifications.  You can do a 1-year certificate or a 2-year diploma in subjects like electrics, plumbing, roofing and hairdressing.  If you’d prefer to work outdoors, look at Milldown College, where there are courses in Farm Mechanics, Land Management, Animal Management and much more."+
        "A final option is to get an apprenticeship with a local or national company.  You will get on-the-job training, gain certificates or diplomas and start earning straight away.  But be warned - places are limited!  Find out more at the Jobs Fair on 26th May at Northacre College."+
        "St Leopold’s is the best school for…",
        lang_abbr: "en",
        exercise_id: 2,
        answer_id: 29,

        createdAt: new Date(),
        updatedAt: new Date()
      },


      {
        desc: "You’re 16 and finally you can leave school!  By now, you’re probably sick of teachers, desks, tests and exams.  But don’t just run for the exit. You need to think carefully about what to do next."+
        "If you want a professional career, you will need to go to university and get a degree. To do that, you need to stay at high school for another two years.  But you needn’t stay at the same place. There are several options in the district of Northacre."+
        "St. Leopold’s School has the best pass rate of all the high schools in the district. It offers a wide range of subjects in the humanities and sciences.  St Leopold’s is, of course, a private school, so may be too expensive for you. But don’t worry, there are several other options if you want to follow the academic route.  Knowle Grammar School is a state school, so there are no fees, and it has excellent tuition and facilities. It is a boys’ school from the ages of 11-16, but from 16-18 it is co-educational. But it is selective, so you’ll have to pass an exam to get in.  If you’re interested in going into Business, check out Wyle River Academy.  This school specialises in subjects like Business Studies, Management and Economics.  If you prefer the arts, look at the courses on offer at Northacre College.  Here you can study woodwork, art, textiles and much more."+
        "Northacre College also offers a wide range of vocational qualifications.  You can do a 1-year certificate or a 2-year diploma in subjects like electrics, plumbing, roofing and hairdressing.  If you’d prefer to work outdoors, look at Milldown College, where there are courses in Farm Mechanics, Land Management, Animal Management and much more."+
        "A final option is to get an apprenticeship with a local or national company.  You will get on-the-job training, gain certificates or diplomas and start earning straight away.  But be warned - places are limited!  Find out more at the Jobs Fair on 26th May at Northacre College."+
        "You can only attend St Leopold’s school if you…",
        lang_abbr: "en",
        exercise_id: 2,
        answer_id: 33,

        createdAt: new Date(),
        updatedAt: new Date()
      },


      {
        desc: "You’re 16 and finally you can leave school!  By now, you’re probably sick of teachers, desks, tests and exams.  But don’t just run for the exit. You need to think carefully about what to do next."+
        "If you want a professional career, you will need to go to university and get a degree. To do that, you need to stay at high school for another two years.  But you needn’t stay at the same place. There are several options in the district of Northacre."+
        "St. Leopold’s School has the best pass rate of all the high schools in the district. It offers a wide range of subjects in the humanities and sciences.  St Leopold’s is, of course, a private school, so may be too expensive for you. But don’t worry, there are several other options if you want to follow the academic route.  Knowle Grammar School is a state school, so there are no fees, and it has excellent tuition and facilities. It is a boys’ school from the ages of 11-16, but from 16-18 it is co-educational. But it is selective, so you’ll have to pass an exam to get in.  If you’re interested in going into Business, check out Wyle River Academy.  This school specialises in subjects like Business Studies, Management and Economics.  If you prefer the arts, look at the courses on offer at Northacre College.  Here you can study woodwork, art, textiles and much more."+
        "Northacre College also offers a wide range of vocational qualifications.  You can do a 1-year certificate or a 2-year diploma in subjects like electrics, plumbing, roofing and hairdressing.  If you’d prefer to work outdoors, look at Milldown College, where there are courses in Farm Mechanics, Land Management, Animal Management and much more."+
        "A final option is to get an apprenticeship with a local or national company.  You will get on-the-job training, gain certificates or diplomas and start earning straight away.  But be warned - places are limited!  Find out more at the Jobs Fair on 26th May at Northacre College."+
        "You can only attend Knowle Grammar School if you…",
        lang_abbr: "en",
        exercise_id: 2,
        answer_id: 37,

        createdAt: new Date(),
        updatedAt: new Date()
      },

*/
      {
        desc: " Which word or phrase CANNOT complete the sentence?…"+
        "The match was cancelled ____ the rain.",
        lang_abbr: "en",
        exercise_id: 3,
        answer_id: 41,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        desc: " Complete the sentence."+
        "Alex ___ late. He’s stuck in traffic.",
        lang_abbr: "en",
        exercise_id: 3,
        answer_id: 45,
        createdAt: new Date(),
        updatedAt: new Date()
      },

      {
        desc: 
        "What would you do if there _____ an earthquake?",
        lang_abbr: "en",
        exercise_id: 3,
        answer_id: 51,
        createdAt: new Date(),
        updatedAt: new Date()
      },

      {
        desc: 
        "Do you know how tall ____?",
        lang_abbr: "en",
        exercise_id: 3,
        answer_id: 53,
        createdAt: new Date(),
        updatedAt: new Date()
      },

      {
        desc: 
        "Which sentence uses too incorrectly?",
        lang_abbr: "en",
        exercise_id: 3,
        answer_id: 57,
        createdAt: new Date(),
        updatedAt: new Date()
      },

    ]);
  },

  down: (queryInterface, Sequelize) => {
    const ids = [...Array(4).keys()];
    return queryInterface.bulkDelete("ExerciseQuestions", {
      question_id: { [Sequelize.Op.in]: ids }
    });
  }
};
