const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    profilePic: {
      type: String,
      default:"https://www.forbesindia.com/media/celeblist2019/big/Face_280X280.jpg",
    },
  },
  {
    timestamps: true,
  }
); 

module.exports = mongoose.model('Users', UserSchema)