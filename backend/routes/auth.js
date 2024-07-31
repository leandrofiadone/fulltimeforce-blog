const express = require("express")
const passport = require("passport")
const router = express.Router()
require("dotenv").config() 


const baseUrl = process.env.BASE_URL || "http://localhost:3000"

const homePath = "/home"
const redirectUrl = `${baseUrl}${homePath}`


// GET /auth/google
router.get("/google", passport.authenticate("google", {scope: ["profile"]}))


// GET /auth/google/callback
router.get(
  "/google/callback",
  passport.authenticate("google", {failureRedirect: "/"}),
  (req, res) => {
    res.redirect(redirectUrl) // to /home
  }
)

// Auth with GitHub
// GET /auth/github
router.get("/github", passport.authenticate("github", {scope: ["profile"]}))

// GitHub auth callback
//  GET /auth/github/callback
router.get(
  "/github/callback",
  passport.authenticate("github", {failureRedirect: "/"}),
  (req, res) => {
    res.redirect(redirectUrl) // to /home
  }
)

// Check auth status
// GET /auth/status
router.get("/status", (req, res) => {
  if (req.isAuthenticated()) {
    res.json({isAuthenticated: true})
  } else {
    res.json({isAuthenticated: false})
  }
})

// Logout user
// GET /auth/logout
router.get("/logout", (req, res, next) => {
  console.log("Logout initiated")
      req.session.destroy((err) => {
      if (err) {
        console.error("Session destroy error:", err)
        return next(err)
      }
      console.log("Session destroyed successfully")
      res.clearCookie("connect.sid")
      res.redirect("/")
    })
})




module.exports = router
