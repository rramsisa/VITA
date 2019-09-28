const jwt = require('jsonwebtoken');

module.exports = {
  validateToken: (req, res, next) => {
    const token = req.header('auth-token')
    if (!token) {
        return res.status(401).send('Unauthorized')
    }

    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = verified;
        next();
    } catch (err) {
        res.status(495).send('Invalid token')
    }

}
}







// const jwt = require('jsonwebtoken');

// module.exports = function (req, res, next) {
//     const token = req.header('auth-token')
//     if (!token) {
//         return res.status(401).send('Unauthorized')
//     }

//     try {
//         const verified = jwt.verify(token, process.env.TOKEN_SECRET);
//         req.user = verified;
//         next();
//     } catch (err) {
//         res.status(400).send('Invalid token')
//     }

// }