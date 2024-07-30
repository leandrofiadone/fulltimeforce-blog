const express = require("express")
const passport = require("passport")
const router = express.Router()
require("dotenv").config() // Asegúrate de incluir esta línea

// Definir la base URL, usando un valor predeterminado si no está definido en .env
const baseUrl = process.env.BASE_URL || "http://localhost:3000"
// La ruta específica siempre será /home
const homePath = "/home"
const redirectUrl = `${baseUrl}${homePath}`

// @desc    Auth with Google
// @route   GET /auth/google
router.get("/google", passport.authenticate("google", {scope: ["profile"]}))

// @desc    Google auth callback
// @route   GET /auth/google/callback
router.get(
  "/google/callback",
  passport.authenticate("google", {failureRedirect: "/"}),
  (req, res) => {
    res.redirect(redirectUrl) // Siempre redirige a /home
  }
)

// @desc    Auth with GitHub
// @route   GET /auth/github
router.get("/github", passport.authenticate("github", {scope: ["profile"]}))

// @desc    GitHub auth callback
// @route   GET /auth/github/callback
router.get(
  "/github/callback",
  passport.authenticate("github", {failureRedirect: "/"}),
  (req, res) => {
    res.redirect(redirectUrl) // Siempre redirige a /home
  }
)

// @desc    Check auth status
// @route   GET /auth/status
router.get("/status", (req, res) => {
  if (req.isAuthenticated()) {
    res.json({isAuthenticated: true})
  } else {
    res.json({isAuthenticated: false})
  }
})

// @desc    Logout user
// @route   GET /auth/logout
router.get("/logout", (req, res, next) => {
  req.logout((error) => {
    if (error) {
      return next(error)
    }
    res.redirect("/")
  })
})

module.exports = router
