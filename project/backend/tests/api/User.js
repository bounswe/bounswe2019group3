const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../../index');

chai.use(chaiHttp);
chai.use(require('chai-match'));
chai.should();

let cookie = undefined;

describe("Testing: User API", function () {
    before(function(done) {
        chai.request(app)
                .post('/api/auth/login')
                // set headers 
                .set('content-type', 'application/json')
                // send request body
                .send({  
                    id: 'lazyostrich850',
                    password: 'pass'
                })
                .end((err, res) => {
                    cookie = res.header['set-cookie'];
                    res.should.have.status(200);
                    res.body.username.should.be.eql('lazyostrich850');
                    res.body.email.should.be.eql('robby.vanbaren@example.com');
                    done();
                });
    });
    it("GET: /api/user/", done => {
        chai.request(app)
            .get('/api/user/')
            .set('content-type','application/json')
            .end((err,res) => {
                res.should.has.status(200);
                done();
            });
    });
    it("GET: /api/user/lazyostrich850", done => {
        chai.request(app)
            .get('/api/user/lazyostrich850')
            .set('content-type','application/json')
            .end((err,res) => {
                res.body.username.should.be.eql('lazyostrich850');
                res.body.email.should.be.eql('robby.vanbaren@example.com');
                res.body.bio.should.be.eql('I am Robby Van Baren, and I live in Wessem, Netherlands.I want to learn foreign languages.');
                res.body.avatar.should.be.eql('https://randomuser.me/api/portraits/men/57.jpg');
                res.body.rating.should.be.eql(3);
                res.should.has.status(200);
                done();
            });
    });
    it("GET: /api/user/lazyostrich850/comments", done => {
        chai.request(app)
            .get('/api/user/lazyostrich850/comments')
            .set('content-type','application/json')
            .end((err,res) => {
                res.body[0].text.should.be.eql('This is truly above and beyond.');
                res.body[0].comment_by.should.be.eql('angrydog556');
                res.body[0].comment_to.should.be.eql('lazyostrich850');
                res.body[0].createdAt.should.match(/^[2-9][0-9]\d\d-(0[1-9]|1[012])-(0[1-9]|[12]\d|3[01])T([0-2]\d:[0-5]\d:[0-5]\d)\.*/);
                res.body[0].rating.should.be.eql(5);
                res.should.has.status(200);
                done();
            });
    });
    it("GET: /api/user/lazyostrich850/language/level", done => {
        chai.request(app)
            .get('/api/user/lazyostrich850/language/level')
            .set('content-type','application/json')
            .end((err,res) => {
                res.body.map(level => {
                    level.lang_abbr.should.match(/^.*/);
                    level.grade.should.match(/^[ABC][12]$/);
                });
                done();
            });
    });
});
