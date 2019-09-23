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
3. /api/post/ (for testing)

<b>To Do:</b>

Update Schema to accomodate paired devices as well as the inventory items