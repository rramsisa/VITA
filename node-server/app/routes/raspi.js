const router = require('express').Router();
const verify = require('./verifyToken');
const User = require('../models/User');

const {
    pairPiValidation
} = require('../validation');

async function pair (req, res) {
        
            const {
                error
            } = pairPiValidation(req.body);
            if (error) {
                return res.status(400).send({
                    message: error.details[0].message
                });
            }

            const user = await User.findOne({
                _id: req.user._id
            })

            if(user.pairedDevices.includes(req.body.device)){
            	return res.status(400).send({
                    message: 'Device already added'
                })
            }

            try {
                user.pairedDevices.push(req.body.device);
                const savedUser = await user.save();
                return res.send({
                    message: "Device Added"
                });
            } catch (err) {
                res.status(400).send({
                    message: err
                });
            }
	}

	async function unpair (req, res) {
        
            const {
                error
            } = pairPiValidation(req.body);
            if (error) {
                return res.status(400).send({
                    message: error.details[0].message
                });
            }

            const user = await User.findOne({
                _id: req.user._id
            })
            
            if(!user.pairedDevices.includes(req.body.device)){
            	return res.status(400).send({
                    message: 'Device not found'
                })
            }
            var index = user.pairedDevices.indexOf(req.body.device)
            	if (index > -1) {
					 user.pairedDevices.splice(index, 1);
				}

            try {
            	
                const savedUser = await user.save();
                return res.send({
                    message: "Device Removed"
                });
            } catch (err) {
                res.status(400).send({
                    message: err
                });
            }
}


module.exports = {
    pair,unpair
};