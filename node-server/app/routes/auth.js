const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const verify = require('./verifyToken');


const {
    registerValidation,
    loginValidation, 
    changePasswordValidation
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
}) //end register post

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
}) // end login


router.post('/changepassword', verify, async (req, res) => {

    // Validate key data before submission
    const {
        error
    } = changePasswordValidation(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }
  

    
     const cur_user = await User.findOne({
        _id: req.user._id
    })

    if(cur_user.email != req.body.email){
        return res.status(400).send('Email not associated with this account')
    }

    const validPass = await bcrypt.compare(req.body.password, cur_user.password)

    if (!validPass) {
        return res.status(400).send(req.body.password + " " + cur_user.password+ " " +'Invalid Password');
    }

    console.log(req.body.newPassword);
    console.log(await bcrypt.compare( req.body.newPassword, cur_user.password))

    const validPass1 = await bcrypt.compare( req.body.newPassword, cur_user.password)

    if (validPass1) {
        return res.status(400).send(req.body.newPassword+ " " + cur_user.password+ " " +'New password is same as old password');
    }


    // HASH the password
    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(req.body.newPassword, salt);
    try {
            
            await User.update({
                password: hashPassword
            }, {
                    where: {
                        _id: cur_user._id
                    }
                })
            return res.send({ message: 'password updated' });
        }
        catch (err) {
            res.status(400).send(err);
    }



}) //end change password post



module.exports = router