const express = require("express")
const dotenv = require("dotenv")
const cors = require("cors")
const path = require("path")
const chalk = require("chalk")

const { connectDB } = require("./config/config")
const app = express()

dotenv.config()

const authRouter = require("./routes/Auth")
const userRouter = require("./routes/User")

const PORT = process.env.PORT || 8007

app.use("/images", express.static(path.join(__dirname, "images")));

app.use(express.json());

app.use(cors())
connectDB()

app.use("/api/auth", authRouter)
app.use("/api/user", userRouter)

app.listen(PORT, () => {
    console.log(`SERVER IS RUNNING ON :${chalk.yellow(`http://localhost:${PORT}`)}`)
})