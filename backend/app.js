const path = require("path")
const express = require("express")
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const cors = require("cors")
const morgan = require("morgan")

const methodOverride = require("method-override")
const passport = require("passport")
const session = require("express-session")
// const MongoStore = require("connect-mongo")
const MongoDBStore = require("connect-mongodb-session")(session)
const connectDB = require("./config/db")

// Load config
dotenv.config({path: "./config/config.env"})

// Passport config
require("./config/passport")(passport)

connectDB()

const app = express()

app.use(
  cors({
    origin: [
      "http://localhost:3000", // Para desarrollo local
      "https://fulltimeforce-blog.onrender.com" // Para producción
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
    credentials: true
  })
)


// Body parser
app.use(express.urlencoded({extended: false}))
app.use(express.json())

// Method override
app.use(
  methodOverride(function (req, res) {
    if (req.body && typeof req.body === "object" && "_method" in req.body) {
      // look in urlencoded POST bodies and delete it
      let method = req.body._method
      delete req.body._method
      return method
    }
  })
)

// Logging
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"))
}





app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
    store: new MongoDBStore({
      uri: process.env.MONGO_URI,
      collection: "mySessions"
    })
  })
)


// Passport middleware
app.use(passport.initialize())
app.use(passport.session())

// Set global var


// Routes
app.use("/", require("./routes/index"))
app.use("/auth", require("./routes/auth"))
app.use("/stories", require("./routes/stories"))

const PORT = process.env.PORT || 8080

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
)
