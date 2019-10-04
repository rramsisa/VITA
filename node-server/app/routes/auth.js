const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const verify = require('./verifyToken');

const {
    registerValidation,
    loginValidation,
    changePasswordValidation,
    deleteUserValidation
} = require('../validation');

async function register(req, res) {
    const {
        error
    } = registerValidation(req.body);
    if (error) {

        return res.status(422).send({

            message: error.details[0].message
        });
    }

    // Checking if email already exists in db
    const emailExists = await User.findOne({
        email: req.body.email
    })
    if (emailExists) {
        return res.status(409).send({
            message: 'Email already exists'
        })
    }

    // HASH the password
    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    // Create a new user
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashPassword
    });
    try {
        const savedUser = await user.save();
        res.send({
            user: user._id,
            message: "User registered!"
        });
    } catch (err) {
        res.status(400).send({
            message: err
        });
    }
}

async function login(req, res) {
    // Validate key data before submission
    const {
        error
    } = loginValidation(req.body);
    if (error) {
        return res.status(422).send({
            message: error.details[0].message
        });
    }

    // Checking if email already exists in db
    const user = await User.findOne({
        email: req.body.email
    })
    if (!user) {
        return res.status(404).send({
            message: 'Email doesn\'t exist'
        });
    }

    const validPass = await bcrypt.compare(req.body.password, user.password)

    if (!validPass) {
        return res.status(403).send({
            message: 'Invalid Password'
        });
    }

    try {
        // Create and assign a token
        const token = jwt.sign({
            _id: user._id
        }, process.env.TOKEN_SECRET, {
            expiresIn: '1d'
        });

        return res.header('auth-token', token).status(200).send({
            "token": token,
            message: "Logged In!"
        });
    } catch (err) {
        res.status(400).send({
            message: err
        });
    }
}

async function changePassword(req, res) {
    // Validate key data before submission
    const {
        error
    } = changePasswordValidation(req.body);
    if (error) {
        return res.status(422).send({
            message: error.details[0].message
        });
    }

    const user = await User.findOne({
        _id: req.user._id
    })

    if (user.email != req.body.email) {
        return res.status(403).send({
            message: 'Email not associated with this account'
        })
    }

    const validPass = await bcrypt.compare(req.body.password, user.password)

    if (!validPass) {
        return res.status(403).send({
            message: "Invalid Password"
        });
    }

    const validPass1 = await bcrypt.compare(req.body.newPassword, user.password)

    if (validPass1) {
        return res.status(422).send({
            message: "New password is same as old password"
        });
    }

    // HASH the password
    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(req.body.newPassword, salt);

    try {
        user.password = hashPassword;
        const savedUser = await user.save();
        return res.send({
            message: "Password Updated"
        });
    } catch (err) {
        res.status(400).send({
            message: err
        });
    }
}

async function deleteUser(req, res) {
    // Validate key data before submission
    const {
        error
    } = deleteUserValidation(req.body);
    if (error) {
        return res.status(422).send({
            message: error.details[0].message
        });
    }
    const user = await User.findOne({
        _id: req.user._id
    })

    if (user.email != req.body.email) {
        return res.status(403).send({
            message: 'Email not associated with this account'
        })
    }

    const validPass = await bcrypt.compare(req.body.password, user.password)

    if (!validPass) {
        return res.status(403).send({
            message: "Invalid Password"
        });
    }
    try {
        const savedUser = await user.delete();
        return res.send({
            message: "User Deleted"
        });
    } catch (err) {
        res.status(400).send({
            message: err
        });
    }
}

async function getUsers(req, res) {
    try {
        const listOfUsers = await User.find();
        return res.send(listOfUsers);
    } catch (err) {
        res.status(400).send({
            message: err
        })
    }
}

module.exports = {
    login,
    register,
    deleteUser,
    changePassword,
    getUsers
};