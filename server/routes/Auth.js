const express = require("express")
const { loginToTheSystem } = require("../controllers/Auth")

const router = express.Router()

router.post("/login", loginToTheSystem)

module.exports = router