const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../../index');

chai.use(chaiHttp);
chai.should();

let cookie = undefined;

describe("Testing: Auth API", function () {
    it("POST: /api/auth/signup", (done) => {
        chai.request(app)
            .post('/api/auth/signup')
            // set headers 
            .set('content-type', 'application/json')
            // send request body
            .send({  
                username: 'testuser',
                email: 'testuser@test.com',
                password: '12345678'
            })
            .end((err, res) => {
                res.should.have.status(204);
                done();
            });
    });
    it("POST: /api/auth/login", (done) => {
        chai.request(app)
            .post('/api/auth/login')
            // set headers 
            .set('content-type', 'application/json')
            // send request body
            .send({  
                id: 'testuser',
                password: '12345678'
            })
            .end((err, res) => {
                cookie = res.header['set-cookie'];
                res.should.have.status(200);
                res.body.username.should.be.eql('testuser');
                res.body.email.should.be.eql('testuser@test.com');
                done();
            });
    });

    it("POST: /api/auth/logout", (done) => {
        chai.request(app)
            .post('/api/auth/logout')
            // set headers 
            .set('content-type', 'application/json')
            .set('Cookie', cookie)
            // send request body
            .send({})
            .end((err, res) => {
                res.should.have.status(204);
                done();
            });
    });
});