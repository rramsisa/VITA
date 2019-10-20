const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const verify = require('./verifyToken');
const unirest = require('unirest')



async function recipe(req, res) {
    
API_KEY = "9b5ecff8fff943469dd03be5b4435aea"
// API_KEY ="eb657c88ffmshdbfcc54cc731649p18307djsneb64dde562f7"
    
const url = 'https://api.spoonacular.com/recipes/search';



// 	const data = {  };

// try {
//   const response = await fetch(url, {
//     method: 'GET', // or 'PUT'
//     // body: JSON.stringify(data), // data can be `string` or {object}!
//     headers: {
//       'Content-Type': 'application/json',
//       'X-RapidAPI-Key': API_KEY
//     }
//   });
//   const json = await response.json();

//   console.log('Success:', JSON.stringify(json));
// } catch (error) {
//   console.error('Error:', error);
// }

const ingredient = 'cheddar';
let requestString = "https://api.spoonacular.com/recipes/search?apiKey="+API_KEY
unirest.get(requestString)
.header("apiKey", API_KEY)
.header('Content-Type', 'application/json')
.end(result=>{
	console.log(result.body);
	return res.send({
            message: result.body
        });
})

}

module.exports = {
   recipe
};