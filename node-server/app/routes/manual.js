const router = require('express').Router();
const verify = require('./verifyToken');
const User = require('../models/User');
const Item = require('../models/Item');
const unirest = require('unirest')


const {
    manualValidation
} = require('../validation');




async function manual(req, res) {
    const {
        error
    } = manualValidation(req.body);
    if (error) {
        return res.status(422).send({
            message: error.details[0].message
        });
    }

 const user = await User.findOne({
        _id: req.user._id
    })
    for (i = 0; i < user.listOfItems.length; i++) {

        console.log(user.listOfItems[i]);
        const item = await Item.findOne({
            _id: user.listOfItems[i]
        });
        // console.log(item == null);
        if (item != null && item.name == req.body.name) {
            if (req.body.flag == 1) {
                item.quantity = parseInt(item.quantity) + parseInt(req.body.quantity)
                                item.status = true;

            } else if (item.quantity == 0) {
                return res.status(400).send({
                    "message": "Item is out of stock"
                });
            } else {
                item.quantity = parseInt(item.quantity) - parseInt(req.body.quantity)
            }
            if (item.quantity <= 0) {
                item.status = false;
            }
            // console.log("Item exists")
            try {
                const savedItem = item.save();
                return res.send({
                    message: "Quantity Updated"
                });
            } catch (err) {
                return res.status(400).send({
                    message: err
                });
            }
        }
    }


    let requestString = "https://api.spoonacular.com/food/products/classify?apiKey="+process.env.API_KEY


    try {
        console.log("name")
            unirest.post(requestString)
            .header("apiKey", process.env.API_KEY)
            .header('Content-Type', 'application/json')
            .send(
            {
                "title": req.body.name,
                "upc": "0", 
                "plu_code": "0" 
                
            }
            )
            .end(result=>{
                breadList = result.body.breadcrumbs
                // console.log(breadList);
                if(breadList.indexOf("non food item") >= 0){
                    breadList = []
                }
                const newItem = new Item({
                        name: req.body.name,
                        status: true,
                        quantity: req.body.quantity,
                        userID: user._id,
                        breadcrumbs: breadList
                    });

                    const savedItem =  newItem.save();
                    user.listOfItems.push(newItem._id);
                    const savedUser =  user.save();
                    // console.log("saved item")
                    // console.log(breadcrumbsList)
                    return res.send({
                        item: newItem._id,
                        message: "Item Request received!"
                     });
                   
            })
    } catch (err) {
        console.log("caught exception")
        console.log(err)

        res.status(400).send({
            message: err
        });
        // return  err
            
    }

}






module.exports = {
   manual
};