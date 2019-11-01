# Server

API server: 198.199.89.191:3000/api/

This is a server that uses node.js to run an express server with a Mongo DB database

To run the server, run <b>npm start</b><endl>

It will run on <b>localhost:3000</b>

<b>Packages:</b>

@hapi/joi version 15.0.3
Will add the others later

When logging in, an auth token will be returned in the header. This token needs to be stored by the client until they are logged in and must be part of the header of every request made to the server.
When logging out, this token must be deleted.

<b>Endpoints created:</b>

| Type | Path                        | Parameters                                                           |
| ---- | --------------------------- | -------------------------------------------------------------------- |
| POST | /api/user/register/         | name (string), email (string), password (string)                     |
| POST | /api/user/login/            | email (string), password (string)                                    |
| POST | /api/user/changePassword/   | email (string), password (string), newPassword (string)              |
| POST | /api/user/deleteUser/       | email (string), password (string)                                    |
| POST | /api/raspi/pair/            | device(string id)                                                    |
| POST | /api/raspi/unpair/          | device(string id)                                                    |
| GET  | /api/user/                  | None                                                                 |
| POST | /api/raspi/postBarCodeData/ | name (string), flag (0 or 1), barCode (string), scannerID (9 digits) |
| POST | /api/manual/                | name (string), flag (0 or 1), quantity(integer)                      |
| GET  | /api/items/                 | None                                                                 |
| POST | /api/item/                  | item id (string)                                                     |
| GET  | /api/myitems/               | None                                                                 |
| GET  | /api/myitemsInfo/           | None                                                                 |
| GET  | /api/recipes/recipe/        | None                                                                 |
| GET  | /api/user/scanner/          | None                                                                 |
| POST | /api/item/deleteItem/       | name (string)                                                        |

<b> PostMan test cases </b>
https://app.getpostman.com/join-team?invite_code=f7a228669babd77bdd2a5ae7c1dac92d

<b> Unit testing</b>
run : npm test
