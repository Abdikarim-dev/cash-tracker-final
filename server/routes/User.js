const express = require("express")
const { createUser, getUsers, updateUser, deleteUser } = require("../controllers/User")
const { upload } = require("../config/imageUpload")

const router = express.Router()

router.get("/read", getUsers)
router.post("/create",upload.single("image"), createUser)
router.patch("/update/:id",upload.single("image"), updateUser)
router.delete("/delete/:id", deleteUser)

module.exports = router