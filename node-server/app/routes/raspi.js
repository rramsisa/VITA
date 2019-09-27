const router = require('express').Router();
const verify = require('./verifyToken');
const User = require('../models/User');


// router.get('/', verify, async (req, res) => {
//     // res.json({
//     //     posts: {
//     //         title: 'my first post',
//     //         description: 'Accessible only after login'
//     //     }
//     // })
//     // res.send(req.user);
//     const user = await User.findOne({
//         _id: req.user._id
//     })

//     res.send(user);
// });

// router.post('/pair', verify, async (req, res) => {
//     // res.json({
//     //     posts: {
//     //         title: 'my first post',
//     //         description: 'Accessible only after login'
//     //     }
//     // })
//     // res.send(req.user);
//     const user = await User.findOne({
//         _id: req.user._id
//     })

//     res.send(user);
// });

// router.post('/unpair', verify, async (req, res) => {
//     // res.json({
//     //     posts: {
//     //         title: 'my first post',
//     //         description: 'Accessible only after login'
//     //     }
//     // })
//     // res.send(req.user);
//     const user = await User.findOne({
//         _id: req.user._id
//     })

//     res.send(user);
// });

module.exports = router