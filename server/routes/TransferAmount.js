const express = require("express")
const { getTransfers, createTransfer, updateTransfer, deleteTransfer } = require("../controllers/TransferAmount")

const router = express.Router()

router.get("/read", getTransfers)
router.post("/create", createTransfer)
router.patch("/update/:id", updateTransfer)
router.delete("/delete/:id", deleteTransfer)

module.exports = router