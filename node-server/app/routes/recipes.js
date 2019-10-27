const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const verify = require('./verifyToken');
const unirest = require('unirest')


const url = "https://api.spoonacular.com/"



async function get_basic_pantry_item_name(name) {
	
	let requestString = "food/products/classify?apiKey="+process.env.API_KEY


	try {
	        unirest.post(url+requestString)
			.header("apiKey", process.env.API_KEY)
			.header('Content-Type', 'application/json')
			.send(
			{
				"title": name,
				"upc": "0", 
				"plu_code": "0" 
				
			}
			)
			.end(result=>{
				console.log(result.body.breadcrumbs);
				return res.send({
			            message: result.body.breadcrumbs
			        });
			})
	} catch (err) {
	        res.status(400).send({
	            message: err
	        });
	}

 
}
// async function get_basic_pantry_item_name1(name) {
	
// 	var quote;
// 	  return new Promise(function(resolve, reject) {
// 		let requestString = "food/products/classify?apiKey="+process.env.API_KEY
// 			try {
// 			        unirest.post(url+requestString)
// 					.header("apiKey", process.env.API_KEY)
// 					.header('Content-Type', 'application/json')
// 					.send(
// 					{
// 						"title": name,
// 						"upc": "0", 
// 						"plu_code": "0" 
						
// 					}
// 					)
// 					.end(result=>{
// 						//console.log(result.body.breadcrumbs);
						
// 					          resolve(  result.body.breadcrumbs)
					        
// 					})
// 			} catch (err) {
// 			        res.status(400).send({
// 			            message: err
// 			        });
// 			}

// 	  });
 
// }

async function recipe(req, res) {
    console.log("reached")
	
	let requestString = "recipes/findByIngredients?apiKey="+process.env.API_KEY


	try {
	        unirest.get(url+requestString)
			.header("apiKey", process.env.API_KEY)
			.header('Content-Type', 'application/json')
			.query({
				"ingredients":[  "potato chips",
            "chips",
            "ingredient"],
				"number":2,
				"ranking":2
			})
			.end(result=>{
				console.log(result.body);
				return res.send({
			            message: result.body
			        });
			})
	} catch (err) {
	        res.status(400).send({
	            message: err
	        });
	}

 
}

module.exports = {
   recipe,
   get_basic_pantry_item_name, 
   // get_basic_pantry_item_name11
};