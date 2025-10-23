const mongoose = require("mongoose");


// linkedinClone

mongoose.connect('mongodb://localhost:27017/linkedinClone').then(res=>{
    console.log("Database successfully connected");
}).catch(err=>{
    console.log(err)
})