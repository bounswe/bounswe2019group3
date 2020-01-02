
const db = require('../models/index');
const path = require("path");

before(function(done) {
    this.timeout(60000); 
    const delay = (t, v) => {
        return new Promise(function(resolve) { 
            setTimeout(resolve.bind(null, v), t)
        });
    };
    
    console.log("Waiting 30s for DB to get up!")
    delay(30000)
    .then(()=> console.log("SYNC DB"))
    .then(() => db.sequelize.sync({
        force: true
    })).then(async function() {
        console.log("Seeding DB")
        const seed_dir = path.join(__dirname, "/../seeders");
        let files = require("fs").readdirSync(seed_dir);
        for(let i=0;i<files.length;i++){
            let seed_name = files[i];
            console.log(seed_name);
            const seeder = require(path.join(seed_dir, seed_name));
            await seeder.down(db.sequelize.getQueryInterface(), db.Sequelize);
            await seeder.up(db.sequelize.getQueryInterface(), db.Sequelize);
            console.log("Seeding successful: "+ seed_name);
        }
    }).then(() => done());
});

