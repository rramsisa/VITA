const User = require('../models/User');
const Item = require('../models/Item');
const unirest = require('unirest')

//get list of my items' object
async function getList(req, res) {
     try {
        const user = await User.findOne({
            _id: req.user._id
        })
        const values = Object.values(user.listOfItems)

        itemInfo = []
        for (var property in values) {
            const item = await Item.findOne({
                _id: values[property]
            })
            if(item.status == false){
                itemInfo.push(item)
            }
            else {
                var total = 0;
                for(var i = 0; i < item.lasted.length; i++){
                    total = total + item.lasted[i]
                }
                var avg = total / item.lasted.length;
                var date1 = new Date();
                if(date1.getTime() - item.date > avg ){
                    itemInfo.push(item)
                }
            } 

        }
        return res.send(itemInfo);

    } catch (err) {
        res.status(400).send({
            message: err
        })
    }
}

module.exports = {
    getList
};