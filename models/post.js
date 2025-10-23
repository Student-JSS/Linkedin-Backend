const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
    
      user: {
         type: mongoose.Schema.Types.ObjectId,
         ref: 'user',
      },
      desc: {
         type: String,
      },
      imageLink: {
         type: String,
         default: '',
      },
      likes: [
         {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user',
         },
      ],
      comments: {
         type: Number,
         default: 0,
      },
},{timestamps:true});

const PostModal = mongoose.model("post", PostSchema);
module.exports = PostModal;