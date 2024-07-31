const express = require('express')
const router = express.Router()
const { ensureAuth } = require('../middleware/auth')

const Story = require('../models/Story')

//Process Posts form
router.post("/", ensureAuth, async (req, res) => {
  try {
    req.body.user = req.user.id
    await Story.create(req.body)
    res.status(201).json({message: "Story created successfully"}) // o cualquier otra respuesta adecuada
  } catch (err) {
    console.error(err)
    res.status(500).json({error: "An error occurred while creating the story"})
  }
})


// Show single post
router.get("/:id", ensureAuth, async (req, res) => {
  try {
    const story = await Story.findById(req.params.id).populate("user", "displayName").lean();

    if (!story) {
      return res.status(404).json({error: "Story not found"});
    }
    res.json({story});
  } catch (err) {
    console.error(err);
    res.status(500).json({error: "Internal Server Error"});
  }
});


// Delete single post
router.delete("/:id", ensureAuth, async (req, res) => {
  try {
    const story = await Story.findById(req.params.id).lean()
    console.log("story to delete", story)
    if (!story) {
      return res.status(404).json({error: "Story not found"})
    }
    await Story.deleteOne({_id: req.params.id})

    res.json({message: "Story deleted successfully"})
  } catch (err) {
    console.error(err)
    res.status(500).json({error: "Internal Server Error"})
  }
})


// Update post
router.put("/stories/:id", ensureAuth, async (req, res) => {
  try {
    const {title, body} = req.body
    const story = await Story.findOne({_id: req.params.id})
    console.log("story", story)

    if (!story) {
      return res.status(404).json({message: "Story not found"})
    }
    story.title = title
    story.body = body
    await story.save()

    res.json({message: "Story updated successfully"})
  } catch (err) {
    console.error(err)
    res.status(500).json({message: "Server error"})
  }
})



// @desc    User stories
// @route   GET /stories/user/:userId
// router.get('/user/:userId', ensureAuth, async (req, res) => {
//   try {
//     const stories = await Story.find({
//       user: req.params.userId,
//       status: 'public',
//     })
//       .populate('user')
//       .lean()

//     res.render('stories/index', {
//       stories,
//     })
//   } catch (err) {
//     console.error(err)
//     res.render('error/500')
//   }
// })

//@desc Search stories by title
//@route GET /stories/search/:query



module.exports = router
