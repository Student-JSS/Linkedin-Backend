const express = require('express');
const router = express.Router();
const UserController = require('../controller/user');
const Authentication = require('../authentication/auth');

route.post('/register',UserController.register);
route.post('/login',UserController.login);
route.post('/google',UserController.loginThroughGmail);

router.get('/self', Authentication.auth,(req,res) => {
    return res.status(200).json({
        user: req.user,
    })
    // console.log(req.user);
});




module.exports = router;