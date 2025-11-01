const User = require('../models/user');
const bcryptjs = require('bcryptjs');
const { OAuth2Client } = require('google-auth-library'); 
const jwt = require('jsonwebtoken');


const cookieOptions = {
    httpOnly: true,
    secure: false,
    sameSite: 'lax',
};


const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

exports.loginThroughGmail = async (req,res) => {
    try{
        const { token } = req.body;
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID,
        });
        const payload = ticket.getPayload();
        const { sub, email, name, picture } = payload;
        let userExist = await User.findOne({ email});
        if(!userExist){
            //register ne user
            userExist = await User.create({
                googleId: sub,
                email: email,
                f_name: name,
                profile_pic: picture,
            });
        }
        let jwttoken = jwt.sign({userId: userExist._id}, process.env.JWT_PRIVATE_KEY);
            res.cookie('token', jwttoken, cookieOptions);
        return res.status(200).json({user: userExist});


    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Server error', message:err.message});
    }
}

exports.register = async (req,res) => {
    try{
        console.log(req.body);
        let {email,password, f_name} = req.body;
        let isUserExist = await User.findOne({email});
        if(isUserExist){
            return res.status(400).json({error: "Already have an account with this email .Please try with other email."});
        }

        const hashedPassword = await bcryptjs.hash(password, 10);
        // password = hashedPassword;
        console.log(hashedPassword);
        const newUser = new User({email,password: hashedPassword,f_name});
        await newUser.save();

        return res.status(201).json({message: 'User registered successfully', success: "yes", date: newUser});

    }catch(err){ 
        console.log(err);
        res.status(500).json({error: 'Server error', message:err.message});
    }
}

exports.login =async (req,res) => {
    try{
        let {email,password} = req.body;
        const userExist = await User.findOne({email});
        console.log(userExist);

        if(userExist && await bcryptjs.compare(password,userExist.password)){
            let token = jwt.sign({userId: userExist._id}, process.env.JWT_PRIVATE_KEY);
            res.cookie('token', token, cookieOptions);

            return res.json({message: "Login successful", success: "yes", user: userExist});


        }else{
            return res.status(400).json({error: "Invalid credentials"});
        }

    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Server error', message:err.message});

    }
}

exports.updateUser = async (req,res) => {
    try{
        const {user} = req.body;
        const isExist = await User.findById(req.user._id);
        if(!isExist){
            return res.status(404).json({error: 'User does not exist'});
        }

        const updateData = await User.findByIdAndUpdate(isExist._id, user);
        // console.log(updateData);

        const userData = await User.findById(req.user._id);
        res.status(200).json({message: 'User updated successfully', user: userData});
    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Server error', message:err.message});
    }   
}  

exports.getProfileById = async (req,res) => {
    try{
        const { id} = req.params;
        const isExist = await User.findById(id);
        if(!isExist){
            return res.status(400).json({error: "No such user found"});

        }
        return res.status(200).json({
            message: 'User fetched successfully',
            user: isExist,

        });
    }catch{
        console.log(err);
        res.status(500).json({error: 'Server error', message:err.message});
    }
}

exports.logout = async (req,res) => {
        res.clearCookie('token', cookieOptions).json({message: 'Logged out successfully'});
}