# Server

This is a server that uses node.js to run an express server with a Mongo DB database

To run the server, run <b>npm start</b><endl>
  
It will run on <b>localhost:3000</b>

<b>Packages:</b>

@hapi/joi version 15.0.3
Will add the others later

When logging in, an auth token will be returned in the header. This token needs to be stored by the client until they are logged in and must be part of the header of every request made to the server.
When logging out, this token must be deleted.

<b>Endpoints created:</b>

1. /api/user/register/
2. /api/user/login/
3. /api/user/changepassword/


| Type  | Path                      | Parameters                                               |
| ---   | ---                       | ---                                                      |
| POST  | /api/user/register/       | name (string), email (string), password (string)         |
| POST  | /api/user/login/          | email (string), password (string)                        |
| POST  | /api/user/changepassword/ | email (string), password (string), new_password (string) |
| POST  | /api/user/deleteuser/     | email (string), password (string)                        |
| POST  | /api/raspi/pair/          | device(string id)                                        |
| POST  | /api/raspi/unpair/        | device(string id)                                        |



<b> PostMan test cases </b>
https://app.getpostman.com/join-team?invite_code=f7a228669babd77bdd2a5ae7c1dac92d

<b> Unit-ish testing</b>
run : npm test

<b>To Do:</b>

1. Update Schema to accomodate paired devices as well as the inventory items (Finished)
2. Make change password api endpoint (POST)
3. Basic POST API call to receive bar code from Raspi. No association with accounts needed right now.
4. Make pair/unpair scanner endpoints
