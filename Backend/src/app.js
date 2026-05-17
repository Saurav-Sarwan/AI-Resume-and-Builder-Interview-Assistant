const express = require("express")
const cookieParser = require("cookie-parser") //middleware to read cookies from request
const cors = require("cors")

const app = express()   // initiate server

app.use(express.json()) // allows to read req.body
app.use(cookieParser()) // allows to read cookies from request
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))


/* require all the routes here */
const authRouter = require("./routes/auth.routes")
const interviewRouter = require("./routes/interview.routes")

/* using all the routes here */
app.use("/api/auth", authRouter)
app.use("/api/interview", interviewRouter)


module.exports = app