 
var request = require("request"),
    assert = require('assert'),
    base_url = "http://localhost:3000/";
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();
chai.use(chaiHttp);


let token_login;

    const {
      app
    } = require('../server');

describe('Unit-ish_testning', () => { 
  after(async () => {
      server.stop();
    });

    
    describe('register testing', () => {
          it('normal register - should work', (done) => {
              let user = {
                  email: "tester@yahoo.com",
                  password: "tester1234",
                  name: "tester"
                
              }
           chai.request(app)
                .post('/api/user/register')
                .send(user)
                .end((err, res) => {
                      res.should.have.status(200);
                  done();
                });

          });
        });
    describe('login testing', () => {
          it('normal login - should work', (done) => {
              let user = {
                  email: "tester@yahoo.com",
                  password: "tester1234"
              }
           chai.request(app)
                .post('/api/user/login')
                .send(user)
                .end((err, res) => {
                      res.should.have.status(200);                      
                      token_login = res.body.token
                  done();
                });

          });

      });
    describe('change passoword testing', () => {
          it('normal change 1 - should work', (done) => {
              let user = {
                  email: "tester@yahoo.com",
                  password: "tester1234",
                  newPassword:"tester4321"
              }
           chai.request(app)
                .post('/api/user/changepassword')
                .set('auth-token', token_login)
                .send(user)
                .end((err, res) => {
                      res.should.have.status(200);                      
                  done();
                });

          });
          it('normal change 2 - should work', (done) => {
              let user = {
                  email: "tester@yahoo.com",
                  newPassword: "tester1234",
                  password:"tester4321"
              }
           chai.request(app)
                .post('/api/user/changepassword')
                .set('auth-token', token_login)
                .send(user)
                .end((err, res) => {
                      res.should.have.status(200);                      
                  done();
                });

          });

      });
    describe('delete testing', () => {
          it('normal delete - should work', (done) => {
              let user = {
                  email: "tester@yahoo.com",
                  password: "tester1234"
              }
           chai.request(app)
                .post('/api/user/deleteuser')
                .set('auth-token', token_login)
                .send(user)
                .end((err, res) => {
                      res.should.have.status(200);
                     
                  done();
                });

          });

      });
});