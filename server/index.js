const express = require("express")
const dotenv = require("dotenv")
const cors = require("cors")
const path = require("path")
const chalk = require("chalk")

const { connectDB } = require("./config/config")
const { authenticate } = require("./middleware/authMiddleware")

const app = express()

dotenv.config()

const authRouter = require("./routes/Auth")
const userRouter = require("./routes/User")
const accountRouter = require("./routes/Account")
const transactionRouter = require("./routes/Transaction")
const transferRouter = require("./routes/TransferAmount")

const PORT = process.env.PORT || 8007

app.use("/images", express.static(path.join(__dirname, "images")));

app.use(express.json());

app.use(cors())
connectDB()

app.use("/api/auth", authRouter)
app.use("/api/user", authenticate, userRouter)
app.use("/api/account", authenticate, accountRouter)
app.use("/api/transaction", authenticate, transactionRouter)
app.use("/api/transfer", authenticate, transferRouter)

app.listen(PORT, () => {
    console.log(`SERVER IS RUNNING ON :${chalk.yellow(`http://localhost:${PORT}`)}`)
})