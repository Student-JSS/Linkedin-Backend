const express = require('express');
const router = express.Router();
const UserController = require('../controller/user');
const Authentication = require('../authentication/auth');

router.post('/register',UserController.register);
router.post('/login',UserController.login);
router.post('/google',UserController.loginThroughGmail);

router.put('/update', Authentication.auth,UserController.updateUser);
router.get('/user/:id', UserController.getUserById);
router.post('/logout', Authentication.auth,UserController.logout);

router.get('/self', Authentication.auth,(req,res) => {
    try{
    return res.status(200).json({
        message: 'User details fetched successfully',
        user: req.user,
    });
}catch(err){
    console.log(err);
    res.status(500).json({error: 'Server error', message:err.message});
}
    // console.log(req.user);
});




module.exports = router;