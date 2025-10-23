const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  googleId: {
    type: String,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
  },
  f_name: {
    type: String,
    default: "",
  },
  headline: {
    type: String,
    default: "",
  },
  curr_company: {
    type: String,
    default: "",
  },
  curr_location: {
    type: String,
    default: "",
  },
  profile_pic: {
    type: String,
    default:
      "https://static.vecteezy.com/system/resources/thumbnails/020/765/399/small_2x/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg",
  },
  cover_pic: {
    type: String,
    default: "https://flowbite.com/docs/images/examples/image-3@2x.jpg",
  },

  about: {
    type: String,
    default: "",
  },
  skills: {
    type: [String],
    default: [],
  },
  resume: {
    type: String,
  },

  experience: [
    {
      designation: {
        type: String,
        default: "",
      },
      company_name: {
        type: String,
        default: "",
      },
      duration: {
        type: String,
        default: "",
      },
      location: {
        type: String,
        default: "",
      },
    },
  ],
  friends: [
         {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user',
         },
      ],

      pending_friends: [
         {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user',
         },
      ],
},{timestamps:true});

const userModal = mongoose.model("user", UserSchema);
module.exports = userModal;
