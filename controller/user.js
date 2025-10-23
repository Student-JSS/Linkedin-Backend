exports.register = async (req,res) => {
    try{
        console.log(req.body);
        let {email,password, f_name} = req.body;

    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Server error', message:err.message});
    }
}