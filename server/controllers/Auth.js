const { Op } = require("sequelize");
const bcrypt = require("bcrypt");
const Users = require("../models/User");

const jwt = require("jsonwebtoken")

const loginToTheSystem = async (req, res) => {
    const { identifier, password } = req.body;

    // identifier:username || identifier:phone

    const existingUser = await Users.findOne({
        where: {
            [Op.or]: [{ username: identifier }, { phone: identifier }]
        }
    })

    if (!existingUser) return res.status(400).json({ success: false, message: "Username or Phone doesn't exist" });

    const passwordCorrect = await bcrypt.compare(password, existingUser.password)

    if (!passwordCorrect) return res.status(400).json({
        success: false,
        message: "Password incorrect, please try again"
    });
 
    // Creating token

    // Payload,expirationTime,SIGNATURE (JSON WEB TOKEN)

    const tokenPayload = { id: existingUser.id, role: existingUser.role }

    const expirationTime = 5 * 24 * 60 * 60;  // 5 DAYS IN SECONDS

    const token = jwt.sign(tokenPayload, process.env.JWT_SECRET, {
        expiresIn: expirationTime // 5 DAYS
    })

    existingUser.password = undefined

    res.status(200).json({
        success: true,
        message: "User Logged in successfully",
        user: existingUser,
        token
    })

}

module.exports = {
    loginToTheSystem
}