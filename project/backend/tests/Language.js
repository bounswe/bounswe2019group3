const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../index');

chai.use(chaiHttp);
chai.use(require('chai-match'));
chai.should();

let cookie = undefined;

describe("Testing: Language API", function () {
    this.timeout(40000); 
    before((done) => {
        console.log("waiting for db to be ready");
        setTimeout(() => {
            done()
        }, 35000);
    });
    chai.request(app)
            .post('/api/auth/login')
            // set headers 
            .set('content-type', 'application/json')
            // send request body
            .send({  
                id: 'admin',
                password: 'pass'
            })
            .end((err, res) => {
                cookie = res.header['set-cookie'];
                res.should.have.status(200);
                res.body.username.should.be.eql('admin');
                res.body.email.should.be.eql('email1');
            });
    it("GET: /api/language/", done => {
        chai.request(app)
            .get('/api/language/')
            .set('content-type','application/json')
            .end((err,res) => {
                res.should.has.status(200);
                done();
            });
    });
    it("GET: /api/language/en/exam/questions", done => {
        chai.request(app)
            .get('/api/language/en/exam/questions')
            .set('content-type','application/json')
            .set('Cookie', cookie)
            .end((err,res) => {
                res.should.has.status(200);
                res.body.map(question => {
                    question.desc.should.match(/.*/);
                    question.choices.map(choice => {
                        choice.desc.should.match(/.*/);
                    })
                });
                done();
            });
    });
    it("GET: /api/language/de/exam/questions", done => {
        chai.request(app)
            .get('/api/language/de/exam/questions')
            .set('content-type','application/json')
            .set('Cookie', cookie)
            .end((err,res) => {
                res.should.has.status(200);
                res.body.map(question => {
                    question.desc.should.match(/.*/);
                    question.choices.map(choice => {
                        choice.desc.should.match(/.*/);
                    })
                });
                done();
            });
    });
    it("POST: /api/language/en/exam/evaluate", (done) => {
        chai.request(app)
            .post('/api/language/en/exam/evaluate')
            // set headers 
            .set('content-type', 'application/json')
            .set('Cookie', cookie)
            // send request body
            .send([
                {
                "question_id": "0",
                "choice_id": "3"
                },
                {
                "question_id": "1",
                "choice_id": "4"
                },
                {
                "question_id": "2",
                "choice_id": "8"
                },
                {
                "question_id": "3",
                "choice_id": "13"
                },
                {
                "question_id": "4",
                "choice_id": "18"
                }]
            )
            .end((err, res) => {
                res.body.grade.should.be.eql('C2');
                res.should.have.status(200);
                done();
            });
    });
    it("POST: /api/language/de/exam/evaluate", (done) => {
        chai.request(app)
            .post('/api/language/de/exam/evaluate')
            // set headers 
            .set('content-type', 'application/json')
            .set('Cookie', cookie)
            // send request body
            .send([
                {
                "question_id": "5",
                "choice_id": "21"
                },
                {
                "question_id": "6",
                "choice_id": "24"
                },
                {
                "question_id": "7",
                "choice_id": "31"
                },
                {
                "question_id": "8",
                "choice_id": "34"
                },
                {
                "question_id": "9",
                "choice_id": "36"
                }]
            )
            .end((err, res) => {
                res.body.grade.should.be.eql('C2');
                res.should.have.status(200);
                done();
            });
    });
});