 
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
      it('register - normal', (done) => {
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
      it('register - email already exists', (done) => {
          let user = {
              email: "tester@yahoo.com",
              password: "tester1234",
              name: "tester"
            
          }
           chai.request(app)
                .post('/api/user/register')
                .send(user)
                .end((err, res) => {
                      res.should.have.status(400);
                      res.body.should.have.property('message').eql("Email already exists");

                  done();
                });

          });
      it('register - no password', (done) => {
          let user = {
              email: "tester1@yahoo.com",
              password: "",
              name: "tester"
            
          }
           chai.request(app)
                .post('/api/user/register')
                .send(user)
                .end((err, res) => {
                  
                      res.should.have.status(400);
                      res.body.should.have.property('message').eql("\"password\" is not allowed to be empty");
                      
                  done();
                });

          });
      it('register - no email', (done) => {
          let user = {
              email: "",
              password: "tester1234",
              name: "tester"
            
          }
           chai.request(app)
                .post('/api/user/register')
                .send(user)
                .end((err, res) => {
                  
                      res.should.have.status(400);
                      res.body.should.have.property('message').eql("\"email\" is not allowed to be empty");                  done();
                });

          });
      it('register - no name', (done) => {
          let user = {
              email: "tester1@yahoo.com",
              password: "tester1234",
              name: ""
            
           }
          chai.request(app)
                .post('/api/user/register')
                .send(user)
                .end((err, res) => {
                  
                      res.should.have.status(400);
                      res.body.should.have.property('message').eql("\"name\" is not allowed to be empty"); 
                  done();
                });

           });      
    });
    describe('login testing', () => {
      it('login - normal', (done) => {
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
      it('login - no email', (done) => {
        let user = {
            email: "",
            password: "tester1234"
        }
        chai.request(app)
            .post('/api/user/login')
            .send(user)
            .end((err, res) => {
                  res.should.have.status(400);    
                  res.body.should.have.property('message').eql("\"email\" is not allowed to be empty");                   
                  
              done();
            });
       });
      it('login - no password', (done) => {
        let user = {
              email: "tester@yahoo.com",
              password: ""
          }
        chai.request(app)
            .post('/api/user/login')
            .send(user)
            .end((err, res) => {
                  res.should.have.status(400); 
                  res.body.should.have.property('message').eql("\"password\" is not allowed to be empty");                      
                  
              done();
            });

       });
      it('login - wrong password', (done) => {
            let user = {
                email: "tester@yahoo.com",
                password: "1234tester"
            }
            chai.request(app)
              .post('/api/user/login')
              .send(user)
              .end((err, res) => {
                    res.should.have.status(400); 
                    res.body.should.have.property('message').eql("Invalid Password");                       
                done();
              });
             });
    });
    describe('change passoword testing', () => {
      it('change passoword - normal 1', (done) => {
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
      it('change passoword - normal 2', (done) => {
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
      it('change passoword - no email', (done) => {
          let user = {
              email: "",
              newPassword: "tester1234",
              password:"tester4321"
          }
         chai.request(app)
            .post('/api/user/changepassword')
            .set('auth-token', token_login)
            .send(user)
            .end((err, res) => {
                  res.should.have.status(400);  
                  res.body.should.have.property('message').eql("\"email\" is not allowed to be empty");                    
              done();
            });

         });
      it('change passoword - no password', (done) => {
          let user = {
              email: "tester@yahoo.com",
              newPassword: "tester1234",
              password:""
          }
          chai.request(app)
            .post('/api/user/changepassword')
            .set('auth-token', token_login)
            .send(user)
            .end((err, res) => {
                  res.should.have.status(400);   
                  res.body.should.have.property('message').eql("\"password\" is not allowed to be empty");                   
              done();
            });
           });
      it('change passoword - no new password', (done) => {
          let user = {
              email: "tester@yahoo.com",
              newPassword: "",
              password:"tester4321"
          }
         chai.request(app)
            .post('/api/user/changepassword')
            .set('auth-token', token_login)
            .send(user)
            .end((err, res) => {
            
                  res.should.have.status(400); 
                  res.body.should.have.property('message').eql("\"newPassword\" is not allowed to be empty");                     
              done();
            });

         });
      it('change passoword - same password', (done) => {
          let user = {
              email: "tester@yahoo.com",
              newPassword: "tester1234",
              password:"tester1234"
          }
         chai.request(app)
            .post('/api/user/changepassword')
            .set('auth-token', token_login)
            .send(user)
            .end((err, res) => {
          
                  res.should.have.status(400); 
                  res.body.should.have.property('message').eql("New password is same as old password");                      
              done();
            });

          });
      it('change passoword - wrong original password', (done) => {
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
              
                  res.should.have.status(400);    
                   res.body.should.have.property('message').eql("Invalid Password");                      
              
              done();
            });

          });
    });
    describe('delete testing', () => {
      it('delete - no password', (done) => {
          let user = {
              email: "tester@yahoo.com",
              password: ""
          }
         chai.request(app)
            .post('/api/user/deleteuser')
            .set('auth-token', token_login)
            .send(user)
            .end((err, res) => {
                  res.should.have.status(400);
                  res.body.should.have.property('message').eql("\"password\" is not allowed to be empty"); 

              done();
            });
         });
      it('delete - no email', (done) => {
          let user = {
            email: "",
            password: "tester1234"
          }
           chai.request(app)
                .post('/api/user/deleteuser')
                .set('auth-token', token_login)
                .send(user)
                .end((err, res) => {
                      res.should.have.status(400);
                      res.body.should.have.property('message').eql("\"email\" is not allowed to be empty"); 
                     
                  done();
                });

          });
      it('delete - wrong password', (done) => {
          let user = {
              email: "tester@yahoo.com",
              password: "1234tester"
          }
           chai.request(app)
                .post('/api/user/deleteuser')
                .set('auth-token', token_login)
                .send(user)
                .end((err, res) => {
                      res.should.have.status(400);
                      res.body.should.have.property('message').eql("Invalid Password"); 

                     
                  done();
                });

          });
      it('delete - normal', (done) => {
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