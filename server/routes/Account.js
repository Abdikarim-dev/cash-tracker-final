const express = require("express")
const { getAccounts, createAccount, updateAccount, deleteAccount } = require("../controllers/Account")

const router = express.Router()

router.get("/read", getAccounts)
router.post("/create", createAccount)
router.patch("/update/:id", updateAccount)
router.delete("/delete/:id", deleteAccount)

module.exports = router