const express = require('express')
const router = express.Router()
const { ensureAuth, ensureGuest } = require('../middleware/auth')

const Story = require('../models/Story')

const User = require('../models/User'); // 
// Login/Landing page
router.get("/", ensureGuest, (req, res) => {
  res.json({message: "Please log in to continue"})
})


// GET /stories/user/:userId
// router.get("/user/:userId", ensureAuth, async (req, res) => {
//   try {
//     // Busca el usuario por su ID
//     const user = await User.findById(req.params.userId).lean()
// console.log(user)
//     if (!user) {
//       // Si no se encuentra el usuario, responde con un error 404
//       return res.status(404).json({message: "Usuario no encontrado"})
//     }

//     // Devuelve los datos del usuario como JSON
//     res.json(user)
//   } catch (err) {
//     console.error(err)
//     // Responde con un error 500 en caso de un error del servidor
//     res.status(500).json({message: "Error del servidor"})
//   }
// })

// get all the Posts
router.get("/api/stories", async (req, res) => {
  try {
    // Find posts and populate the user field
    const stories = await Story.find({}).populate("user", "displayName").lean()

    // Use optional chaining and logical OR to handle the case where req.user might be undefined
    const firstName = req.user?.firstName || "Guest" // Default to "Guest" if req.user or req.user.firstName is undefined

    console.log(stories)
    console.log(firstName)

    res.json({name: firstName, stories})
  } catch (err) {
    console.error(err)
    res.status(500).json({error: "Internal Server Error"})
  }
})




module.exports = router
