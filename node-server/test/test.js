 
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
      it('email already exists', (done) => {
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
      it('register no password', (done) => {
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
      it('register no email', (done) => {
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
      it('register no name', (done) => {
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
      it('no email', (done) => {
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
      it('no password', (done) => {
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
      it('wrong password', (done) => {
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
      it('no email', (done) => {
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
      it('no password', (done) => {
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
      it('no new password', (done) => {
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
      it('same password', (done) => {
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
      it('wrong original password', (done) => {
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
      it('no password', (done) => {
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
      it('no email', (done) => {
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
      it('wrong password', (done) => {
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