const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const {
    registerValidation,
    loginValidation
} = require('../validation');

router.post('/register', async (req, res) => {

    // Validate key data before submission
    const {
        error
    } = registerValidation(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    // Checking if email already exists in db
    const emailExists = await User.findOne({
        email: req.body.email
    })
    if (emailExists) {
        return res.status(400).send('Email already exists')
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
            user: user._id
        });
    } catch (err) {
        res.status(400).send(err);
    }
})

router.post('/login', async (req, res) => {

    // Validate key data before submission
    const {
        error
    } = loginValidation(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    // Checking if email already exists in db
    const user = await User.findOne({
        email: req.body.email
    })
    if (!user) {
        return res.status(400).send('Email doesn\'t exist');
    }

    const validPass = await bcrypt.compare(req.body.password, user.password)

    if (!validPass) {
        return res.status(400).send('Invalid Password');
    }

    // Create and assign a token
    const token = jwt.sign({
        _id: user._id
    }, process.env.TOKEN_SECRET, {
        expiresIn: '1d'
    });

    res.header('auth-token', token).status(200).send(token);
})

module.exports = router