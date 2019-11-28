const User = require('../models/User');
const Item = require('../models/Item');
const unirest = require('unirest')


//refresh list of my items' names
async function refreshList(req, res) {
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
            if(user.toGetList.includes(item.name)){
                continue;

            }
            if(item.status == false){
                console.log(item.name)
                user.toGetList.push(item.name)
            }
            else {
                var total = 0;
                for(var i = 0; i < item.lasted.length; i++){
                    total = total + item.lasted[i]
                }
                var avg = total / item.lasted.length;
                var date1 = new Date();
                if(date1.getTime() - item.date > avg ){
                    console.log(item.name)
                    user.toGetList.push(item.name)
                }
            }  
        }
        const savedUser = await user.save();
        return res.send({
            message: "list refreshed"
        });

    } catch (err) {
        res.status(400).send({
            message: err
        })
    }
}
//add element to list -- requires name
async function addToList(req, res) {
     try {
        const user = await User.findOne({
            _id: req.user._id
        })
        // const values = Object.values(user.listOfItems)
        if(!user.toGetList.includes(req.body.name)){
            console.log(req.body.name)
            user.toGetList.push(req.body.name)

        }
       
        const savedUser = await user.save();
        return res.send({
            message: "added to list to get"
        });

    } catch (err) {
        res.status(400).send({
            message: err
        })
    }
}
//remove element from list -- requires name
async function removeFromList(req, res) {
     try {
        const user = await User.findOne({
            _id: req.user._id
        })
        // const values = Object.values(user.listOfItems)
        if(user.toGetList.includes(req.body.name)){
            console.log(req.body.name)
            user.toGetList.splice(user.toGetList.indexOf(req.body.name), 1)
        }
       
        const savedUser = await user.save();
        return res.send({
            message: "removed from list to get"
        });

    } catch (err) {
        res.status(400).send({
            message: err
        })
    }
}
//get list
async function getList(req, res) {
     try {
        const user = await User.findOne({
            _id: req.user._id
        })
        // const values = Object.values(user.listOfItems)
        
        return res.send({
            list: user.toGetList
        });

    } catch (err) {
        res.status(400).send({
            message: err
        })
    }
}

//clear list
async function clearList(req, res) {
     try {
        const user = await User.findOne({
            _id: req.user._id
        })
        // const values = Object.values(user.listOfItems)
        user.toGetList = [];
         const savedUser = await user.save();
        return res.send({
            message: "list cleared"
        });
        

    } catch (err) {
        res.status(400).send({
            message: err
        })
    }
}



module.exports = {
    refreshList,
    addToList, 
    removeFromList, 
    getList, 
    clearList
};