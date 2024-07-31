const express = require('express')
const router = express.Router()
const { ensureAuth, ensureGuest } = require('../middleware/auth')

const Story = require('../models/Story')

// @desc    Login/Landing page
// @route   GET /
router.get("/", ensureGuest, (req, res) => {
  res.json({message: "Please log in to continue"})
})

// @desc    Dashboard
// @route   GET /dashboard

router.get("/api/stories", ensureAuth, async (req, res) => {
  try {
    // Find stories and populate the user field
    const stories = await Story.find({}).populate("user", "displayName").lean()
    const {firstName} = req.user // Desestructuración de req.user

    console.log(stories)
    res.json({name: firstName, stories})
  } catch (err) {
    console.error(err)
    res.status(500).json({error: "Internal Server Error"})
  }
})



// router.get('/dashboard', ensureAuth, async (req, res) => {
//   try {
//     const stories = await Story.find({ user: req.user.id }).lean()
//     console.log(stories)
//     res.render('dashboard', {
//       name: req.user.firstName,
//       stories,
//     })
//   } catch (err) {
//     console.error(err)
//     res.render('error/500')
//   }
// })

module.exports = router
