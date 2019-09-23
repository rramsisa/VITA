# Server

This is a server that uses node.js to run an express server with a Mongo DB database

@hapi/joi version 15.0.3

When logging in, an auth token will be returned in the header. This token needs to be stored by the client until they are logged in and must be part of the header of every request made to the server.
When logging out, this token must be deleted.

Endpoints created:

/api/user/register/
/api/user/login/
/api/post/ (for testing)

To Do:
Update Schema to accomodate paired devices as well as the inventory items
