const User = require('../models/user');

exports.register = async (req,res) => {
    try{
        console.log(req.body);
        let {email,password, f_name} = req.body;
        let isUserExist = await User.findOne({email});
        if(isUserExist){
            res.status(400).json({error: "Already have an account with this email .Please try with other email."});
        }
        const newUser = new User({email,password,f_name});
        await newUser.save();

        return res.status(201).json({message: 'User registered successfully', success: "yes", date: newUser});

    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Server error', message:err.message});
    }
}