const GoogleStrategy = require("passport-google-oauth20").Strategy
const GitHubStrategy = require("passport-github2").Strategy
const mongoose = require("mongoose")
const User = require("../models/User")

module.exports = function (passport) {
  // Google Strategy
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "/auth/google/callback"
      },
      async (accessToken, refreshToken, profile, done) => {
        const newUser = {
          googleId: profile.id,
          displayName: profile.displayName,
          firstName: profile.name.givenName,
          lastName: profile.name.familyName,
          image: profile.photos[0].value
        }

        try {
          let user = await User.findOne({googleId: profile.id})
          if (user) {
            done(null, user)
          } else {
            user = await User.create(newUser)
            done(null, user)
          }
        } catch (err) {
          console.error(err)
          done(err, null)
        }
      }
    )
  )

  // GitHub Strategy
  passport.use(
    new GitHubStrategy(
      {
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: "/auth/github/callback"
      },
      async (accessToken, refreshToken, profile, done) => {
        const newUser = {
          githubId: profile.id,
          displayName: profile.displayName,
          username: profile.username,
          image: profile._json.avatar_url
        }

        try {
          let user = await User.findOne({githubId: profile.id})
          if (user) {
            done(null, user)
          } else {
            user = await User.create(newUser)
            done(null, user)
          }
        } catch (err) {
          console.error(err)
          done(err, null)
        }
      }
    )
  )

  // Serialize user to store in session
  passport.serializeUser((user, done) => {
    done(null, user.id)
  })

  // Deserialize user from session
  // Deserialize user from session
  passport.deserializeUser((id, done) => {
    User.findById(id)
      .exec()
      .then((user) => done(null, user))
      .catch((err) => done(err, null))
  })
}
