const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
  googleId: {
    type: String,
    required: false // Make this optional for GitHub users
  },
  githubId: {
    type: String,
    required: false // Make this optional for Google users
  },
  displayName: {
    type: String,
    required: true
  },
  firstName: {
    type: String,
    required: false // Make this optional
  },
  lastName: {
    type: String,
    required: false // Make this optional
  },
  image: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model("User", UserSchema)
