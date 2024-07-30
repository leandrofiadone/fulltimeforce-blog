const express = require('express')
const router = express.Router()
const { ensureAuth } = require('../middleware/auth')

const Story = require('../models/Story')

// @desc    Show add page
// @route   GET /stories/add
// router.get('/add', ensureAuth, (req, res) => {
//   res.render('stories/add')
// })

// @desc    Process add form
// @route   POST /stories
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


// @desc    Show all stories
// @route   GET /stories
router.get("/", async (req, res) => {
  try {
    const stories = await Story.find({status: "public"})
      .populate("user")
      .sort({createdAt: "desc"})
      .lean()

    res.json({stories})
  } catch (err) {
    console.error(err)
    res.status(500).json({error: "Internal Server Error"})
  }
})


// @desc    Show single story
// @route   GET /stories/:id
router.get("/:id", ensureAuth, async (req, res) => {
  try {
    const story = await Story.findById(req.params.id).populate("user").lean()

    console.log(story)

    if (!story) {
      return res.status(404).json({error: "Story not found"})
    }
    res.json({story})
  } catch (err) {
    console.error(err)
    res.status(500).json({error: "Internal Server Error"})
  }
})


// @desc    Delete story
// @route   DELETE /stories/:id
router.delete("/:id", ensureAuth, async (req, res) => {
  try {
    const story = await Story.findById(req.params.id).lean()
    console.log('story to delete',story)
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




// @desc    Show edit page
// @route   GET /stories/edit/:id
// router.get('/edit/:id', ensureAuth, async (req, res) => {
//   try {
//     const story = await Story.findOne({
//       _id: req.params.id,
//     }).lean()

//     if (!story) {
//       return res.render('error/404')
//     }

//     if (story.user != req.user.id) {
//       res.redirect('/stories')
//     } else {
//       res.render('stories/edit', {
//         story,
//       })
//     }
//   } catch (err) {
//     console.error(err)
//     return res.render('error/500')
//   }
// })

// @desc    Update story
// @route   PUT /stories/:id
// router.put('/:id', ensureAuth, async (req, res) => {
//   try {
//     let story = await Story.findById(req.params.id).lean()

//     if (!story) {
//       return res.render('error/404')
//     }

//     if (story.user != req.user.id) {
//       res.redirect('/stories')
//     } else {
//       story = await Story.findOneAndUpdate({ _id: req.params.id }, req.body, {
//         new: true,
//         runValidators: true,
//       })

//       res.redirect('/dashboard')
//     }
//   } catch (err) {
//     console.error(err)
//     return res.render('error/500')
//   }
// })



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
