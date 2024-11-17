// models/user.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,  // Added to ensure unique email addresses for each user
    trim: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  contacts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Contact",  // Links contacts to a user
    },
  ],
  token: {
    type: String,
  },
}, {timestamps: true}); // Added timestamps for creation and update dates

module.exports = mongoose.model("User", userSchema);
