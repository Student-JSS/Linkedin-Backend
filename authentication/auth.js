const jwt = require('jsonwebtoken');
const User = require('../models/user');

exports.auth = async(req,res,next) => {
    try {
        const token = req.cookies.token;
        if(!token) {
            return res.status(401).json({error: 'No token , authorization denied'});
        }
        const decoded = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
        req.user = await User.findById(decoded.userId).select('-password');
        next();

    } catch(err) {
        // console.log(err);
        res.status(401).json({error: 'token is not valid'});

    }
}