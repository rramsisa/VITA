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
                 email: "unit_test@yahoo.com",
                 password: "tester1234",
                 name: "unit_test"

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
                 email: "unit_test@yahoo.com",
                 password: "tester1234",
                 name: "unit_test"

             }
             chai.request(app)
                 .post('/api/user/register')
                 .send(user)
                 .end((err, res) => {
                     res.should.have.status(409);
                     res.body.should.have.property('message').eql("Email already exists");

                     done();
                 });

         });
         it('register - no password', (done) => {
             let user = {
                 email: "unit_test1@yahoo.com",
                 password: "",
                 name: "unit_test"

             }
             chai.request(app)
                 .post('/api/user/register')
                 .send(user)
                 .end((err, res) => {

                     res.should.have.status(422);
                     res.body.should.have.property('message').eql("\"password\" is not allowed to be empty");

                     done();
                 });

         });
         it('register - no email', (done) => {
             let user = {
                 email: "",
                 password: "tester1234",
                 name: "unit_test"

             }
             chai.request(app)
                 .post('/api/user/register')
                 .send(user)
                 .end((err, res) => {

                     res.should.have.status(422);
                     res.body.should.have.property('message').eql("\"email\" is not allowed to be empty");
                     done();
                 });

         });
         it('register - no name', (done) => {
             let user = {
                 email: "unit_test1@yahoo.com",
                 password: "tester1234",
                 name: ""

             }
             chai.request(app)
                 .post('/api/user/register')
                 .send(user)
                 .end((err, res) => {

                     res.should.have.status(422);
                     res.body.should.have.property('message').eql("\"name\" is not allowed to be empty");
                     done();
                 });

         });
         it('register - short name', (done) => {
             let user = {
                 email: "unit_test1@yahoo.com",
                 password: "tester1234",
                 name: "hi"

             }
             chai.request(app)
                 .post('/api/user/register')
                 .send(user)
                 .end((err, res) => {

                     res.should.have.status(422);
                     done();
                 });

         });
         it('register - short password', (done) => {
             let user = {
                 email: "unit_test1@yahoo.com",
                 password: "test",
                 name: "unit_test"

             }
             chai.request(app)
                 .post('/api/user/register')
                 .send(user)
                 .end((err, res) => {

                     res.should.have.status(422);
                     done();
                 });

         });
         it('register - non email', (done) => {
             let user = {
                 email: "unit_test1",
                 password: "tester1234",
                 name: "unit_test"

             }
             chai.request(app)
                 .post('/api/user/register')
                 .send(user)
                 .end((err, res) => {
                     //console.log();
                     res.should.have.status(422);
                     done();
                 });

         });
     });
     describe('login testing', () => {
         it('login - normal', (done) => {
             let user = {
                 email: "unit_test@yahoo.com",
                 password: "tester1234"
             }
             chai.request(app)
                 .post('/api/user/login')
                 .send(user)
                 .end((err, res) => {
                     //console.log(res.body)
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
                     res.should.have.status(422);
                     res.body.should.have.property('message').eql("\"email\" is not allowed to be empty");

                     done();
                 });
         });
         it('login - no password', (done) => {
             let user = {
                 email: "unit_test@yahoo.com",
                 password: ""
             }
             chai.request(app)
                 .post('/api/user/login')
                 .send(user)
                 .end((err, res) => {
                     res.should.have.status(422);
                     res.body.should.have.property('message').eql("\"password\" is not allowed to be empty");

                     done();
                 });

         });
         it('login - wrong password', (done) => {
             let user = {
                 email: "unit_test@yahoo.com",
                 password: "1234tester"
             }
             chai.request(app)
                 .post('/api/user/login')
                 .send(user)
                 .end((err, res) => {
                     res.should.have.status(403);
                     res.body.should.have.property('message').eql("Invalid Password");
                     done();
                 });
         });
         it('login - short password', (done) => {
             let user = {
                 email: "unit_test@yahoo.com",
                 password: "test"
             }
             chai.request(app)
                 .post('/api/user/login')
                 .send(user)
                 .end((err, res) => {
                     res.should.have.status(422);

                     done();
                 });

         });
         it('login - non email', (done) => {
             let user = {
                 email: "unit_test",
                 password: "tester123"
             }
             chai.request(app)
                 .post('/api/user/login')
                 .send(user)
                 .end((err, res) => {
                     res.should.have.status(422);

                     done();
                 });

         });
     });
     describe('change passoword testing', () => {
         it('change passoword - normal 1', (done) => {
             let user = {
                 email: "unit_test@yahoo.com",
                 password: "tester1234",
                 newPassword: "tester4321"
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
                 email: "unit_test@yahoo.com",
                 newPassword: "tester1234",
                 password: "tester4321"
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
                 password: "tester4321"
             }
             chai.request(app)
                 .post('/api/user/changepassword')
                 .set('auth-token', token_login)
                 .send(user)
                 .end((err, res) => {
                     res.should.have.status(422);
                     res.body.should.have.property('message').eql("\"email\" is not allowed to be empty");
                     done();
                 });

         });
         it('change passoword - no password', (done) => {
             let user = {
                 email: "unit_test@yahoo.com",
                 newPassword: "tester1234",
                 password: ""
             }
             chai.request(app)
                 .post('/api/user/changepassword')
                 .set('auth-token', token_login)
                 .send(user)
                 .end((err, res) => {
                     res.should.have.status(422);
                     res.body.should.have.property('message').eql("\"password\" is not allowed to be empty");
                     done();
                 });
         });
         it('change passoword - no new password', (done) => {
             let user = {
                 email: "unit_test@yahoo.com",
                 newPassword: "",
                 password: "tester4321"
             }
             chai.request(app)
                 .post('/api/user/changepassword')
                 .set('auth-token', token_login)
                 .send(user)
                 .end((err, res) => {

                     res.should.have.status(422);
                     res.body.should.have.property('message').eql("\"newPassword\" is not allowed to be empty");
                     done();
                 });

         });
         it('change passoword - same password', (done) => {
             let user = {
                 email: "unit_test@yahoo.com",
                 newPassword: "tester1234",
                 password: "tester1234"
             }
             chai.request(app)
                 .post('/api/user/changepassword')
                 .set('auth-token', token_login)
                 .send(user)
                 .end((err, res) => {

                     res.should.have.status(422);
                     res.body.should.have.property('message').eql("New password is same as old password");
                     done();
                 });

         });
         it('change passoword - wrong original password', (done) => {
             let user = {
                 email: "unit_test@yahoo.com",
                 newPassword: "tester1234",
                 password: "tester4321"
             }
             chai.request(app)
                 .post('/api/user/changepassword')
                 .set('auth-token', token_login)
                 .send(user)
                 .end((err, res) => {
                     res.should.have.status(403);
                     res.body.should.have.property('message').eql("Invalid Password");

                     done();
                 });

         });
         it('change passoword - short password', (done) => {
             let user = {
                 email: "unit_test@yahoo.com",
                 newPassword: "unit_test",
                 password: "test"
             }
             chai.request(app)
                 .post('/api/user/changepassword')
                 .set('auth-token', token_login)
                 .send(user)
                 .end((err, res) => {
                     res.should.have.status(422);
                     done();
                 });

         });
         it('change passoword - short new password', (done) => {
             let user = {
                 email: "unit_test@yahoo.com",
                 newPassword: "test",
                 password: "tester4321"
             }
             chai.request(app)
                 .post('/api/user/changepassword')
                 .set('auth-token', token_login)
                 .send(user)
                 .end((err, res) => {
                     res.should.have.status(422);
                     done();
                 });

         });
         it('change passoword - non email', (done) => {
             let user = {
                 email: "unit_test",
                 newPassword: "tester4321",
                 password: "tester4321"
             }
             chai.request(app)
                 .post('/api/user/changepassword')
                 .set('auth-token', token_login)
                 .send(user)
                 .end((err, res) => {
                     res.should.have.status(422);
                     done();
                 });

         });
     });
     describe('pair device testing', () => {
         it('pair - no id', (done) => {
             let device = {
                 device: ""
             }
             chai.request(app)
                 .post('/api/raspi/pair')
                 .set('auth-token', token_login)
                 .send(device)
                 .end((err, res) => {

                     res.should.have.status(422);
                     res.body.should.have.property('message').eql("\"device\" is not allowed to be empty");

                     done();
                 });
         });
         it('pair - normal', (done) => {
             let device = {
                 device: "987654321"
             }
             chai.request(app)
                 .post('/api/raspi/pair')
                 .set('auth-token', token_login)
                 .send(device)
                 .end((err, res) => {
                     res.should.have.status(200);
                     done();
                 });
         });
         it('pair - already added', (done) => {
             let device = {
                 device: "987654321"
             }
             chai.request(app)
                 .post('/api/raspi/pair')
                 .set('auth-token', token_login)
                 .send(device)
                 .end((err, res) => {
                     res.should.have.status(400);
                     res.body.should.have.property('message').eql("Device already paired to this account");
                     done();
                 });
         });
     });
     describe('unpair device testing', () => {
         it('unpair - no id', (done) => {
             let device = {
                 device: ""
             }
             chai.request(app)
                 .post('/api/raspi/unpair')
                 .set('auth-token', token_login)
                 .send(device)
                 .end((err, res) => {

                     res.should.have.status(422);
                     res.body.should.have.property('message').eql("\"device\" is not allowed to be empty");

                     done();
                 });
         });
         it('unpair - normal', (done) => {
             let device = {
                 device: "987654321"
             }
             chai.request(app)
                 .post('/api/raspi/unpair')
                 .set('auth-token', token_login)
                 .send(device)
                 .end((err, res) => {
                     res.should.have.status(200);
                     done();
                 });
         });
         it('unpair - already removed', (done) => {
             let device = {
                 device: "987654321"
             }
             chai.request(app)
                 .post('/api/raspi/unpair')
                 .set('auth-token', token_login)
                 .send(device)
                 .end((err, res) => {
                     res.should.have.status(404);
                     res.body.should.have.property('message').eql("Device not found");

                     done();
                 });
         });
     });

     describe('adding items testing', () => {
         it('add item - normal', (done) => {
             let data = {
                 name: "milk", 
                 barCode:"123456789012",
                 flag: "1"
             }
             chai.request(app)
                 .post('/api/raspi/postBarCodeData')
                 .set('auth-token', token_login)
                 .send(data)
                 .end((err, res) => {
                        res.should.have.status(200);
                        done();
                 });
         });
         it('add item - normal with list check', (done) => {
            var resolvingPromise = new Promise(  (resolve, reject) => {
                    let data = {
                         name: "apple", 
                         barCode:"123456789012",
                         flag: "1"
                    }
                    chai.request(app)
                         .post('/api/raspi/postBarCodeData')
                         .set('auth-token', token_login)
                         .send(data)
                         .end((err, res) => {
                            if(res.should.have.status(200)){
                                resolve(res.body.item)
                            }
                            else{
                                reject(null)
                            }
                        });
                })

             resolvingPromise.then( (result) => {
                    if(result != null){
                        let data1 = {
                             item_id: result
                         }
                         chai.request(app)
                             .post('/api/findMyItem')
                             .set('auth-token', token_login)
                             .send(data1)
                             .end((err1, res1) => {
                                assert.equal(res1.body.found, true, 'item found');
                                done(); 
                             });
                    }
                    else{
                        assert.equal(false, true, 'item not found');
                        done();
                    }
                  });
             
         });
        
         it('add item - missing name', (done) => {
             let data = {
                 name: "", 
                 barCode:"123456789012",
                 flag: "1"
             }
             chai.request(app)
                 .post('/api/raspi/postBarCodeData')
                 .set('auth-token', token_login)
                 .send(data)
                 .end((err, res) => {
                     res.should.have.status(422);
                     done();
                 });
         });
         it('add item - missing name with list check', (done) => {
            var resolvingPromise = new Promise(  (resolve, reject) => {
                    let data = {
                         name: "", 
                         barCode:"123456789012",
                         flag: "1"
                    }
                    chai.request(app)
                         .post('/api/raspi/postBarCodeData')
                         .set('auth-token', token_login)
                         .send(data)
                         .end((err, res) => {
                            if(res.should.have.status(422)){
                                resolve("")
                            }
                            else{
                                resolve(res.body.item)
                            }
                        });
                })

             resolvingPromise.then( (result) => {
                        let data1 = {
                             item_id: result
                         }
                         chai.request(app)
                             .post('/api/findMyItem')
                             .set('auth-token', token_login)
                             .send(data1)
                             .end((err1, res1) => {
                                assert.equal(res1.body.found, false, 'item found');
                                done(); 
                             });
                  });
             
         });
         it('add item - missing barcode', (done) => {
             let data = {
                 name: "milk", 
                 barCode:"",
                 flag: "1"
             }
             chai.request(app)
                 .post('/api/raspi/postBarCodeData')
                 .set('auth-token', token_login)
                 .send(data)
                 .end((err, res) => {
                     res.should.have.status(422);
                     done();
                 });
         });
         it('add item - missing barcode with list check', (done) => {
            var resolvingPromise = new Promise(  (resolve, reject) => {
                    let data = {
                         name: "milk", 
                         barCode:"",
                         flag: "1"
                    }
                    chai.request(app)
                         .post('/api/raspi/postBarCodeData')
                         .set('auth-token', token_login)
                         .send(data)
                         .end((err, res) => {
                            if(res.should.have.status(422)){
                                resolve("")
                            }
                            else{
                                resolve(res.body.item)
                            }
                        });
                })

             resolvingPromise.then( (result) => {
                        let data1 = {
                             item_id: result
                         }
                         chai.request(app)
                             .post('/api/findMyItem')
                             .set('auth-token', token_login)
                             .send(data1)
                             .end((err1, res1) => {
                                assert.equal(res1.body.found, false, 'item found');
                                done(); 
                             });
                  });
         });

         it('add item - missing flag', (done) => {
             let data = {
                 name: "milk", 
                 barCode:"123456789012",
                 flag: ""
             }
             chai.request(app)
                 .post('/api/raspi/postBarCodeData')
                 .set('auth-token', token_login)
                 .send(data)
                 .end((err, res) => {

                     res.should.have.status(422);
                     done();
                 });
         });
         it('add item - missing flag with list check', (done) => {
            var resolvingPromise = new Promise(  (resolve, reject) => {
                    let data = {
                         name: "milk", 
                         barCode:"123456789012",
                         flag: ""
                    }
                    chai.request(app)
                         .post('/api/raspi/postBarCodeData')
                         .set('auth-token', token_login)
                         .send(data)
                         .end((err, res) => {
                            if(res.should.have.status(422)){
                                resolve("")
                            }
                            else{
                                resolve(res.body.item)
                            }
                        });
                })

              resolvingPromise.then( (result) => {
                        let data1 = {
                             item_id: result
                         }
                         chai.request(app)
                             .post('/api/findMyItem')
                             .set('auth-token', token_login)
                             .send(data1)
                             .end((err1, res1) => {
                                assert.equal(res1.body.found, false, 'item found');
                                done(); 
                             });
                  
            });
          });
    });
      describe('removing items testing', () => {
         it('remove item - normal', (done) => {
             let data = {
                 name: "milk", 
                 barCode:"123456789012",
                 flag: "0"
             }
             chai.request(app)
                 .post('/api/raspi/postBarCodeData')
                 .set('auth-token', token_login)
                 .send(data)
                 .end((err, res) => {
                    // console.log(res.body)
                     res.should.have.status(200);
                     done();
                 });
         });
          it('remove item - normal with list check', (done) => {
            var resolvingPromise = new Promise(  (resolve, reject) => {
                    let data = {
                         name: "apple", 
                         barCode:"123456789012",
                         flag: "0"
                    }
                    chai.request(app)
                         .post('/api/raspi/postBarCodeData')
                         .set('auth-token', token_login)
                         .send(data)
                         .end((err, res) => {
                            // console.log("in here")
                            if(res.should.have.status(200)){
                                // console.log(res.body.item)
                                resolve(res.body.item)
                            }
                            else{
                                resolve("")
                            }
                        });
                })

             resolvingPromise.then( (result) => {
                // console.log("resultgrade")
                // console.log(result)
                    if(result != null){
                        let data1 = {
                             item_id: result
                         }
                         chai.request(app)
                             .post('/api/findMyItem')
                             .set('auth-token', token_login)
                             .send(data1)
                             .end((err1, res1) => {
                                // console.log("yoooo")
                                assert.equal(res1.body.found, false, 'item not found');
                                done(); 
                             });
                    }
                    else{
                        assert.equal(false, true, 'item found');
                        done();
                    }
                  });
             
         });
         it('remove item - missing name', (done) => {
             let data = {
                 name: "", 
                 barCode:"123456789012",
                 flag: "0"
             }
             chai.request(app)
                 .post('/api/raspi/postBarCodeData')
                 .set('auth-token', token_login)
                 .send(data)
                 .end((err, res) => {
                     res.should.have.status(422);
                     done();
                 });
         });
         it('remove item - missing name with list check', (done) => {
            var resolvingPromise = new Promise(  (resolve, reject) => {
                    let data = {
                         name: "", 
                         barCode:"123456789012",
                         flag: "0"
                    }
                    chai.request(app)
                         .post('/api/raspi/postBarCodeData')
                         .set('auth-token', token_login)
                         .send(data)
                         .end((err, res) => {
                            if(res.should.have.status(422)){
                                resolve("")
                            }
                            else{
                                resolve(res.body.item)
                            }
                        });
                })

             resolvingPromise.then( (result) => {
                        let data1 = {
                             item_id: result
                         }
                         chai.request(app)
                             .post('/api/findMyItem')
                             .set('auth-token', token_login)
                             .send(data1)
                             .end((err1, res1) => {
                                assert.equal(res1.body.found, false, 'item found');
                                done(); 
                             });
                  });
             
         });
         it('remove item - missing barcode', (done) => {
             let data = {
                 name: "milk", 
                 barCode:"",
                 flag: "0"
             }
             chai.request(app)
                 .post('/api/raspi/postBarCodeData')
                 .set('auth-token', token_login)
                 .send(data)
                 .end((err, res) => {
                     res.should.have.status(422);
                     done();
                 });
         });
         it('remove item - missing barcode with list check', (done) => {
            var resolvingPromise = new Promise(  (resolve, reject) => {
                    let data = {
                         name: "milk", 
                         barCode:"",
                         flag: "0"
                    }
                    chai.request(app)
                         .post('/api/raspi/postBarCodeData')
                         .set('auth-token', token_login)
                         .send(data)
                         .end((err, res) => {
                            if(res.should.have.status(422)){
                                resolve("")
                            }
                            else{
                                resolve(res.body.item)
                            }
                        });
                })

             resolvingPromise.then( (result) => {
                        let data1 = {
                             item_id: result
                         }
                         chai.request(app)
                             .post('/api/findMyItem')
                             .set('auth-token', token_login)
                             .send(data1)
                             .end((err1, res1) => {
                                assert.equal(res1.body.found, false, 'item found');
                                done(); 
                             });
                  });
         });
         it('remove item - missing flag', (done) => {
             let data = {
                 name: "milk", 
                 barCode:"123456789012",
                 flag: ""
             }
             chai.request(app)
                 .post('/api/raspi/postBarCodeData')
                 .set('auth-token', token_login)
                 .send(data)
                 .end((err, res) => {
                     res.should.have.status(422);
                     done();
                 });
         });
         it('remove item - missing flag with list check', (done) => {
            var resolvingPromise = new Promise(  (resolve, reject) => {
                    let data = {
                         name: "milk", 
                         barCode:"123456789012",
                         flag: ""
                    }
                    chai.request(app)
                         .post('/api/raspi/postBarCodeData')
                         .set('auth-token', token_login)
                         .send(data)
                         .end((err, res) => {
                            if(res.should.have.status(422)){
                                resolve("")
                            }
                            else{
                                resolve(res.body.item)
                            }
                        });
                })

             resolvingPromise.then( (result) => {
                        let data1 = {
                             item_id: result
                         }
                         chai.request(app)
                             .post('/api/findMyItem')
                             .set('auth-token', token_login)
                             .send(data1)
                             .end((err1, res1) => {
                                assert.equal(res1.body.found, false, 'item found');
                                done(); 
                             });
                  
            });
         });
        
     });
  describe('manual adding items testing', () => {
         it('manual add item - normal', (done) => {
             let data = {
                 name: "milk", 
                 quantity:"1",
                 flag: "1"
             }
             chai.request(app)
                 .post('/api/manual')
                 .set('auth-token', token_login)
                 .send(data)
                 .end((err, res) => {
                        res.should.have.status(200);
                        done();
                 });
         });
         it('manual add item - normal with list check', (done) => {
            var resolvingPromise = new Promise(  (resolve, reject) => {
                    let data = {
                         name: "apple", 
                         quantity:"1",
                         flag: "1"
                    }
                    chai.request(app)
                         .post('/api/manual')
                         .set('auth-token', token_login)
                         .send(data)
                         .end((err, res) => {
                            if(res.should.have.status(200)){
                                resolve(res.body.item)
                            }
                            else{
                                reject(null)
                            }
                        });
                })

             resolvingPromise.then( (result) => {
                    if(result != null){
                        let data1 = {
                             item_id: result
                         }
                         chai.request(app)
                             .post('/api/findMyItem')
                             .set('auth-token', token_login)
                             .send(data1)
                             .end((err1, res1) => {
                                assert.equal(res1.body.found, true, 'item found');
                                done(); 
                             });
                    }
                    else{
                        assert.equal(false, true, 'item not found');
                        done();
                    }
                  });
             
         });
        
         it('manual add item - missing name', (done) => {
             let data = {
                 name: "", 
                 quantity:"1",
                 flag: "1"
             }
             chai.request(app)
                 .post('/api/manual')
                 .set('auth-token', token_login)
                 .send(data)
                 .end((err, res) => {
                     res.should.have.status(422);
                     done();
                 });
         });
         it('manual add item - missing name with list check', (done) => {
            var resolvingPromise = new Promise(  (resolve, reject) => {
                    let data = {
                         name: "", 
                         quantity:"1",
                         flag: "1"
                    }
                    chai.request(app)
                         .post('/api/manual')
                         .set('auth-token', token_login)
                         .send(data)
                         .end((err, res) => {
                            if(res.should.have.status(422)){
                                resolve("")
                            }
                            else{
                                resolve(res.body.item)
                            }
                        });
                })

             resolvingPromise.then( (result) => {
                        let data1 = {
                             item_id: result
                         }
                         chai.request(app)
                             .post('/api/findMyItem')
                             .set('auth-token', token_login)
                             .send(data1)
                             .end((err1, res1) => {
                                assert.equal(res1.body.found, false, 'item found');
                                done(); 
                             });
                  });
             
         });
         it('manual add item - missing barcode', (done) => {
             let data = {
                 name: "milk", 
                 quantity:"",
                 flag: "1"
             }
             chai.request(app)
                 .post('/api/manual')
                 .set('auth-token', token_login)
                 .send(data)
                 .end((err, res) => {
                     res.should.have.status(422);
                     done();
                 });
         });
         it('manual add item - missing barcode with list check', (done) => {
            var resolvingPromise = new Promise(  (resolve, reject) => {
                    let data = {
                         name: "milk", 
                         quantity:"",
                         flag: "1"
                    }
                    chai.request(app)
                         .post('/api/manual')
                         .set('auth-token', token_login)
                         .send(data)
                         .end((err, res) => {
                            if(res.should.have.status(422)){
                                resolve("")
                            }
                            else{
                                resolve(res.body.item)
                            }
                        });
                })

             resolvingPromise.then( (result) => {
                        let data1 = {
                             item_id: result
                         }
                         chai.request(app)
                             .post('/api/findMyItem')
                             .set('auth-token', token_login)
                             .send(data1)
                             .end((err1, res1) => {
                                assert.equal(res1.body.found, false, 'item found');
                                done(); 
                             });
                  });
         });

         it('manual add item - missing flag', (done) => {
             let data = {
                 name: "milk", 
                 quantity:"1",
                 flag: ""
             }
             chai.request(app)
                 .post('/api/manual')
                 .set('auth-token', token_login)
                 .send(data)
                 .end((err, res) => {

                     res.should.have.status(422);
                     done();
                 });
         });
         it('manual add item - missing flag with list check', (done) => {
            var resolvingPromise = new Promise(  (resolve, reject) => {
                    let data = {
                         name: "milk", 
                         quantity:"1",
                         flag: ""
                    }
                    chai.request(app)
                         .post('/api/manual')
                         .set('auth-token', token_login)
                         .send(data)
                         .end((err, res) => {
                            if(res.should.have.status(422)){
                                resolve("")
                            }
                            else{
                                resolve(res.body.item)
                            }
                        });
                })

              resolvingPromise.then( (result) => {
                        let data1 = {
                             item_id: result
                         }
                         chai.request(app)
                             .post('/api/findMyItem')
                             .set('auth-token', token_login)
                             .send(data1)
                             .end((err1, res1) => {
                                assert.equal(res1.body.found, false, 'item found');
                                done(); 
                             });
                  
            });
          });
    });
      describe('manual removing items testing', () => {
         it('manual remove item - normal', (done) => {
             let data = {
                 name: "milk", 
                 quantity:"1",
                 flag: "0"
             }
             chai.request(app)
                 .post('/api/manual')
                 .set('auth-token', token_login)
                 .send(data)
                 .end((err, res) => {
                    // console.log(res.body)
                     res.should.have.status(200);
                     done();
                 });
         });
          it('manual remove item - normal with list check', (done) => {
            var resolvingPromise = new Promise(  (resolve, reject) => {
                    let data = {
                         name: "apple", 
                         quantity:"1",
                         flag: "0"
                    }
                    chai.request(app)
                         .post('/api/manual')
                         .set('auth-token', token_login)
                         .send(data)
                         .end((err, res) => {
                            // console.log("in here")
                            if(res.should.have.status(200)){
                                // console.log(res.body.message)
                                resolve(res.body.item)
                            }
                            else{
                                resolve("")
                            }
                        });
                })

             resolvingPromise.then( (result) => {
                // console.log("resultgrade")
                // console.log(result)
                    if(result != null){
                        let data1 = {
                             item_id: result
                         }
                         chai.request(app)
                             .post('/api/findMyItem')
                             .set('auth-token', token_login)
                             .send(data1)
                             .end((err1, res1) => {
                                // console.log("yoooo")
                                assert.equal(res1.body.found, false, 'item not found');
                                done(); 
                             });
                    }
                    else{
                        assert.equal(false, true, 'item found');
                        done();
                    }
                  });
             
         });
         it('manual remove item - missing name', (done) => {
             let data = {
                 name: "", 
                 quantity:"1",
                 flag: "0"
             }
             chai.request(app)
                 .post('/api/manual')
                 .set('auth-token', token_login)
                 .send(data)
                 .end((err, res) => {
                     res.should.have.status(422);
                     done();
                 });
         });
         it('manual remove item - missing name with list check', (done) => {
            var resolvingPromise = new Promise(  (resolve, reject) => {
                    let data = {
                         name: "", 
                         quantity:"1",
                         flag: "0"
                    }
                    chai.request(app)
                         .post('/api/manual')
                         .set('auth-token', token_login)
                         .send(data)
                         .end((err, res) => {
                            if(res.should.have.status(422)){
                                resolve("")
                            }
                            else{
                                resolve(res.body.item)
                            }
                        });
                })

             resolvingPromise.then( (result) => {
                        let data1 = {
                             item_id: result
                         }
                         chai.request(app)
                             .post('/api/findMyItem')
                             .set('auth-token', token_login)
                             .send(data1)
                             .end((err1, res1) => {
                                assert.equal(res1.body.found, false, 'item found');
                                done(); 
                             });
                  });
             
         });
         it('manual remove item - missing barcode', (done) => {
             let data = {
                 name: "milk", 
                 quantity:"",
                 flag: "0"
             }
             chai.request(app)
                 .post('/api/manual')
                 .set('auth-token', token_login)
                 .send(data)
                 .end((err, res) => {
                     res.should.have.status(422);
                     done();
                 });
         });
         it('manual remove item - missing barcode with list check', (done) => {
            var resolvingPromise = new Promise(  (resolve, reject) => {
                    let data = {
                         name: "milk", 
                         quantity:"",
                         flag: "0"
                    }
                    chai.request(app)
                         .post('/api/manual')
                         .set('auth-token', token_login)
                         .send(data)
                         .end((err, res) => {
                            if(res.should.have.status(422)){
                                resolve("")
                            }
                            else{
                                resolve(res.body.item)
                            }
                        });
                })

             resolvingPromise.then( (result) => {
                        let data1 = {
                             item_id: result
                         }
                         chai.request(app)
                             .post('/api/findMyItem')
                             .set('auth-token', token_login)
                             .send(data1)
                             .end((err1, res1) => {
                                assert.equal(res1.body.found, false, 'item found');
                                done(); 
                             });
                  });
         });
         it('manual remove item - missing flag', (done) => {
             let data = {
                 name: "milk", 
                 quantity:"1",
                 flag: ""
             }
             chai.request(app)
                 .post('/api/manual')
                 .set('auth-token', token_login)
                 .send(data)
                 .end((err, res) => {
                     res.should.have.status(422);
                     done();
                 });
         });
         it('manual remove item - missing flag with list check', (done) => {
            var resolvingPromise = new Promise(  (resolve, reject) => {
                    let data = {
                         name: "milk", 
                         quantity:"1",
                         flag: ""
                    }
                    chai.request(app)
                         .post('/api/manual')
                         .set('auth-token', token_login)
                         .send(data)
                         .end((err, res) => {
                            if(res.should.have.status(422)){
                                resolve("")
                            }
                            else{
                                resolve(res.body.item)
                            }
                        });
                })

             resolvingPromise.then( (result) => {
                        let data1 = {
                             item_id: result
                         }
                         chai.request(app)
                             .post('/api/findMyItem')
                             .set('auth-token', token_login)
                             .send(data1)
                             .end((err1, res1) => {
                                assert.equal(res1.body.found, false, 'item found');
                                done(); 
                             });
                  
            });
         });
        
     });

     describe('delete testing', () => {
         it('delete - no password', (done) => {
             let user = {
                 email: "unit_test@yahoo.com",
                 password: ""
             }
             chai.request(app)
                 .post('/api/user/deleteuser')
                 .set('auth-token', token_login)
                 .send(user)
                 .end((err, res) => {
                     res.should.have.status(422);
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
                     res.should.have.status(422);
                     res.body.should.have.property('message').eql("\"email\" is not allowed to be empty");

                     done();
                 });

         });
         it('delete - short password', (done) => {
             let user = {
                 email: "unit_test@yahoo.com",
                 password: "test"
             }
             chai.request(app)
                 .post('/api/user/deleteuser')
                 .set('auth-token', token_login)
                 .send(user)
                 .end((err, res) => {
                     res.should.have.status(422);
                     done();
                 });
         });
         it('delete - non email', (done) => {
             let user = {
                 email: "test",
                 password: "tester1234"
             }
             chai.request(app)
                 .post('/api/user/deleteuser')
                 .set('auth-token', token_login)
                 .send(user)
                 .end((err, res) => {
                     res.should.have.status(422);
                     done();
                 });

         });
         it('delete - wrong password', (done) => {
             let user = {
                 email: "unit_test@yahoo.com",
                 password: "1234tester"
             }
             chai.request(app)
                 .post('/api/user/deleteuser')
                 .set('auth-token', token_login)
                 .send(user)
                 .end((err, res) => {
                     res.should.have.status(403);
                     res.body.should.have.property('message').eql("Invalid Password");


                     done();
                 });

         });
         it('delete - normal', (done) => {
             let user = {
                 email: "unit_test@yahoo.com",
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