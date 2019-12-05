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
   
     const item = await Item.findOne({
        userID: user._id,
        name: req.body.name
    });
    // console.log(item)
    if(item != null){
        if (req.body.flag == 1) {
            item.quantity = parseInt(item.quantity) + parseInt(req.body.quantity)
            item.status = true;
        } else if (item.quantity == 0) {
            return res.status(400).send({
                "message": "Item is out of stock"
            });
        } else {
            item.quantity = parseInt(item.quantity) - parseInt(req.body.quantity)
            console.log(item.quantity)
                        console.log(req.body.quantity)

        }
        if (item.quantity <= 0) {
            item.quantity = 0;
            item.status = false;
            var date1 = new Date();
            var Difference_In_Time = date1.getTime()-item.date; 
            console.log(Difference_In_Time)
            item.lasted.push(Difference_In_Time);
        }
        // console.log("Item exists")
        try {
            const savedItem = item.save();
            return res.send({
                item: item._id,
                message: "Quantity Updated"
            });
        } catch (err) {
            return res.status(400).send({
                message: err
            });
        }
    }


    let requestString = "https://api.spoonacular.com/food/products/classify?apiKey=" + process.env.API_KEY


    try {
        unirest.post(requestString)
            .header("apiKey", process.env.API_KEY)
            .header('Content-Type', 'application/json')
            .send({
                "title": req.body.name,
                "upc": "0",
                "plu_code": "0"

            })
            .end(result => {
                breadList = [result.body.category]
                // console.log(breadList);
                if (breadList.indexOf("non food item") >= 0) {
                    breadList = []
                }
                const newItem = new Item({
                    name: req.body.name,
                    status: true,
                    quantity: req.body.quantity,
                    userID: user._id,
                    breadcrumbs: breadList
                });

                const savedItem = newItem.save();
                user.listOfItems.push(newItem._id);
                const savedUser = user.save();
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