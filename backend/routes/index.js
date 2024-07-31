const express = require('express')
const router = express.Router()
const { ensureAuth, ensureGuest } = require('../middleware/auth')

const Story = require('../models/Story')

// Login/Landing page
router.get("/", ensureGuest, (req, res) => {
  res.json({message: "Please log in to continue"})
})


// get all the Posts
router.get("/api/stories", ensureAuth, async (req, res) => {
  try {
    // Find posts and populate the user field
    const stories = await Story.find({}).populate("user", "displayName").lean()
    const {firstName} = req.user // Desestructuración de req.user

    console.log(stories)
    res.json({name: firstName, stories})
  } catch (err) {
    console.error(err)
    res.status(500).json({error: "Internal Server Error"})
  }
})



module.exports = router
