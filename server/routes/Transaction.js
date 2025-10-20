const express = require("express")
const { getTransactions, createTransaction, updateTransaction, deleteTransaction } = require("../controllers/Transaction")

const router = express.Router()

router.get("/read", getTransactions)
router.post("/create", createTransaction)
router.patch("/update/:id", updateTransaction)
router.delete("/delete/:id", deleteTransaction)

module.exports = router